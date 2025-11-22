#![no_std]
extern crate alloc;

use alloc::vec::Vec as StdVec;
use soroban_sdk::{contract, contractimpl, symbol_short, Address, Bytes, BytesN, Env, Symbol};

mod ultrahonk_contract {
    soroban_sdk::contractimport!(file = "ultrahonk_soroban_contract.wasm");
}

mod error;
mod xlm;

use error::Error;

#[contract]
pub struct ZcoreScoring;

pub const VK_KEY: &Symbol = &symbol_short!("VK");
pub const ADMIN_KEY: &Symbol = &symbol_short!("ADMIN");
pub const MIN_REQUIREMENT_KEY: &Symbol = &symbol_short!("MIN_REQ");

pub const ULTRAHONK_CONTRACT_ADDRESS: &str = "CCKXLUP4O42ZHHXQF5HBQR3IIQNKJEIZURL6FRKRZIZ7MTSLDJJZXBSM";

#[contractimpl]
impl ZcoreScoring {
    /// Constructor to initialize the contract with an admin and minimum requirement
    pub fn __constructor(env: &Env, admin: Address, min_requirement: u32) {
        // Require auth from the admin
        admin.require_auth();
        
        // This is for testing purposes. Ensures that the XLM contract set up for unit testing and local network
        xlm::register(env, &admin);
        
        // Send the contract an amount of XLM to play with
        xlm::token_client(env).transfer(
            &admin,
            env.current_contract_address(),
            &xlm::to_stroops(10),
        );
        
        // Set the admin in storage
        Self::set_admin(env, admin);
        
        // Set minimum requirement
        env.storage().instance().set(MIN_REQUIREMENT_KEY, &min_requirement);
    }

    /// Set the verification key (VK) for the zcore_zk circuit
    pub fn set_vk(env: Env, vk_json: Bytes) {
        Self::require_admin(&env);
        env.storage().instance().set(VK_KEY, &vk_json);
    }

    /// Verify a ZK proof for credit scoring and return the score if valid
    /// Returns the score (u32) if verification succeeds and score meets requirement
    pub fn verify_score_proof(
        env: Env,
        user: Address,
        proof_blob: Bytes,
    ) -> Result<u32, Error> {
        // Require authentication from the user
        user.require_auth();
        
        // Take a fee before doing anything
        let xlm_client = xlm::token_client(&env);
        let contract_address = env.current_contract_address();
        
        let _ = xlm_client
            .try_transfer(&user, &contract_address, &xlm::to_stroops(1))
            .map_err(|_| Error::FailedToTransferFromUser)?;

        // Get the verification key
        let vk_json = env
            .storage()
            .instance()
            .get(VK_KEY)
            .ok_or(Error::VkNotSet)?;

        // Verify the proof using the UltraHonk contract
        let ultrahonk_contract_address = Address::from_str(&env, ULTRAHONK_CONTRACT_ADDRESS);
        let ultrahonk_client = ultrahonk_contract::Client::new(&env, &ultrahonk_contract_address);

        match ultrahonk_client.try_verify_proof(&vk_json, &proof_blob) {
            Ok(Ok(_)) => {
                // Proof is valid, extract the score from public inputs
                // The score is the return value from the circuit (public output)
                // We need to extract it from the proof_blob
                let score = Self::extract_score_from_proof(&proof_blob)?;
                
                // Check if score meets minimum requirement
                let min_requirement: u32 = env
                    .storage()
                    .instance()
                    .get(MIN_REQUIREMENT_KEY)
                    .unwrap_or(0);
                
                if score < min_requirement {
                    return Err(Error::ScoreTooLow);
                }
                
                // Transfer the prize pool to the user if score is valid
                let balance = xlm_client.balance(&contract_address);
                if balance > 0 {
                    let _ = xlm_client
                        .try_transfer(&contract_address, &user, &balance)
                        .map_err(|_| Error::FailedToTransferToUser)?;
                }
                
                Ok(score)
            }
            _ => Err(Error::ProofVerificationFailed),
        }
    }

    /// Extract the score from the proof blob
    /// The proof blob format: u32_be(total_fields) || public_inputs || proof
    /// Public inputs: [requirement (u16 as 32-byte field), score (u16 as 32-byte field)]
    /// The score is the return value (public output) from the circuit
    fn extract_score_from_proof(proof_blob: &Bytes) -> Result<u32, Error> {
        // Convert Bytes to vector for easier access
        let proof_vec: StdVec<u8> = proof_blob.to_alloc_vec();
        
        // The proof blob structure:
        // - First 4 bytes: total_fields (u32 big-endian)
        // - Next 32 bytes: requirement (u16 encoded as Field - 32 bytes, big-endian)
        // - Next 32 bytes: score/return value (u16 encoded as Field - 32 bytes, big-endian)
        // - Remaining bytes: proof
        
        // Minimum size: 4 (header) + 32 (requirement) + 32 (score) = 68 bytes
        if proof_vec.len() < 68 {
            return Err(Error::ProofVerificationFailed);
        }
        
        // Extract the score from the second public input (bytes 36-67)
        // The score is a u16 stored in the last 2 bytes of the 32-byte field (big-endian)
        let score_field_start = 36; // 4 (header) + 32 (requirement field)
        let score_field_end = score_field_start + 32;
        
        if proof_vec.len() < score_field_end {
            return Err(Error::ProofVerificationFailed);
        }
        
        // Extract the last 2 bytes of the 32-byte field (where the u16 is stored)
        let score_u16 = u16::from_be_bytes([
            proof_vec[score_field_end - 2],
            proof_vec[score_field_end - 1],
        ]);
        
        // Convert u16 to u32 for Soroban compatibility
        Ok(score_u16 as u32)
    }

    /// Get the current minimum requirement
    pub fn min_requirement(env: &Env) -> u32 {
        env.storage()
            .instance()
            .get(MIN_REQUIREMENT_KEY)
            .unwrap_or(0)
    }

    /// Set a new minimum requirement. Only callable by admin.
    pub fn set_min_requirement(env: &Env, requirement: u32) {
        Self::require_admin(env);
        env.storage().instance().set(MIN_REQUIREMENT_KEY, &requirement);
    }

    /// Get the prize pool balance
    pub fn prize_pool(env: &Env) -> i128 {
        let xlm_client = xlm::token_client(&env);
        let contract_address = env.current_contract_address();
        xlm_client.balance(&contract_address)
    }

    /// Add more funds to the contract, in XLM
    pub fn add_funds(env: &Env, funder: Address, amount: u64) {
        funder.require_auth();
        let contract_address = env.current_contract_address();
        xlm::token_client(env).transfer(&funder, &contract_address, &xlm::to_stroops(amount));
    }

    /// Upgrade the contract to new wasm. Only callable by admin.
    pub fn upgrade(env: &Env, new_wasm_hash: BytesN<32>) {
        Self::require_admin(env);
        env.deployer().update_current_contract_wasm(new_wasm_hash);
    }

    /// Get current admin
    pub fn admin(env: &Env) -> Option<Address> {
        env.storage().instance().get(ADMIN_KEY)
    }

    /// Set a new admin. Only callable by admin.
    pub fn set_admin(env: &Env, admin: Address) {
        // Check if admin is already set
        if env.storage().instance().has(ADMIN_KEY) {
            panic!("admin already set");
        }
        env.storage().instance().set(ADMIN_KEY, &admin);
    }

    /// Private helper function to require auth from the admin
    fn require_admin(env: &Env) {
        let admin = Self::admin(env).expect("admin not set");
        admin.require_auth();
    }
}

