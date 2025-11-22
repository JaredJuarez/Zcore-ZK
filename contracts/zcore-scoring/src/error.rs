#[soroban_sdk::contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    /// The contract failed to transfer XLM to the user
    FailedToTransferToUser = 1,
    /// The user failed to transfer XLM to the contract
    FailedToTransferFromUser = 2,
    /// The contract has no balance to transfer to the user
    NoBalanceToTransfer = 3,
    /// The proof verification failed
    ProofVerificationFailed = 4,
    /// The score does not meet the requirement
    ScoreTooLow = 5,
    /// The verification key is not set
    VkNotSet = 6,
}

