import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  standalone: {
    networkPassphrase: "Standalone Network ; February 2017",
    contractId: "CCF37GMJONVW6ABZBHUQ4C4VMJ3PSFKQC5YUFQMDWZODT54Q2TE5KBJC",
  }
} as const

export const Errors = {
  /**
   * The contract failed to transfer XLM to the user
   */
  1: {message:"FailedToTransferToUser"},
  /**
   * The user failed to transfer XLM to the contract
   */
  2: {message:"FailedToTransferFromUser"},
  /**
   * The contract has no balance to transfer to the user
   */
  3: {message:"NoBalanceToTransfer"},
  /**
   * The proof verification failed
   */
  4: {message:"ProofVerificationFailed"},
  /**
   * The score does not meet the requirement
   */
  5: {message:"ScoreTooLow"},
  /**
   * The verification key is not set
   */
  6: {message:"VkNotSet"}
}

export interface Client {
  /**
   * Construct and simulate a set_vk transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Set the verification key (VK) for the zcore_zk circuit
   */
  set_vk: ({vk_json}: {vk_json: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a verify_score_proof transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Verify a ZK proof for credit scoring and return the score if valid
   * Returns the score (u32) if verification succeeds and score meets requirement
   */
  verify_score_proof: ({user, proof_blob}: {user: string, proof_blob: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u32>>>

  /**
   * Construct and simulate a min_requirement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get the current minimum requirement
   */
  min_requirement: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a set_min_requirement transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Set a new minimum requirement. Only callable by admin.
   */
  set_min_requirement: ({requirement}: {requirement: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a prize_pool transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get the prize pool balance
   */
  prize_pool: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a add_funds transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Add more funds to the contract, in XLM
   */
  add_funds: ({funder, amount}: {funder: string, amount: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Upgrade the contract to new wasm. Only callable by admin.
   */
  upgrade: ({new_wasm_hash}: {new_wasm_hash: Buffer}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Get current admin
   */
  admin: (options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Option<string>>>

  /**
   * Construct and simulate a set_admin transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   * Set a new admin. Only callable by admin.
   */
  set_admin: ({admin}: {admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
        /** Constructor/Initialization Args for the contract's `__constructor` method */
        {admin, min_requirement}: {admin: string, min_requirement: u32},
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy({admin, min_requirement}, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABgAAAC9UaGUgY29udHJhY3QgZmFpbGVkIHRvIHRyYW5zZmVyIFhMTSB0byB0aGUgdXNlcgAAAAAWRmFpbGVkVG9UcmFuc2ZlclRvVXNlcgAAAAAAAQAAAC9UaGUgdXNlciBmYWlsZWQgdG8gdHJhbnNmZXIgWExNIHRvIHRoZSBjb250cmFjdAAAAAAYRmFpbGVkVG9UcmFuc2ZlckZyb21Vc2VyAAAAAgAAADNUaGUgY29udHJhY3QgaGFzIG5vIGJhbGFuY2UgdG8gdHJhbnNmZXIgdG8gdGhlIHVzZXIAAAAAE05vQmFsYW5jZVRvVHJhbnNmZXIAAAAAAwAAAB1UaGUgcHJvb2YgdmVyaWZpY2F0aW9uIGZhaWxlZAAAAAAAABdQcm9vZlZlcmlmaWNhdGlvbkZhaWxlZAAAAAAEAAAAJ1RoZSBzY29yZSBkb2VzIG5vdCBtZWV0IHRoZSByZXF1aXJlbWVudAAAAAALU2NvcmVUb29Mb3cAAAAABQAAAB9UaGUgdmVyaWZpY2F0aW9uIGtleSBpcyBub3Qgc2V0AAAAAAhWa05vdFNldAAAAAY=",
        "AAAAAAAAAExDb25zdHJ1Y3RvciB0byBpbml0aWFsaXplIHRoZSBjb250cmFjdCB3aXRoIGFuIGFkbWluIGFuZCBtaW5pbXVtIHJlcXVpcmVtZW50AAAADV9fY29uc3RydWN0b3IAAAAAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAAD21pbl9yZXF1aXJlbWVudAAAAAAEAAAAAA==",
        "AAAAAAAAADZTZXQgdGhlIHZlcmlmaWNhdGlvbiBrZXkgKFZLKSBmb3IgdGhlIHpjb3JlX3prIGNpcmN1aXQAAAAAAAZzZXRfdmsAAAAAAAEAAAAAAAAAB3ZrX2pzb24AAAAADgAAAAA=",
        "AAAAAAAAAI9WZXJpZnkgYSBaSyBwcm9vZiBmb3IgY3JlZGl0IHNjb3JpbmcgYW5kIHJldHVybiB0aGUgc2NvcmUgaWYgdmFsaWQKUmV0dXJucyB0aGUgc2NvcmUgKHUzMikgaWYgdmVyaWZpY2F0aW9uIHN1Y2NlZWRzIGFuZCBzY29yZSBtZWV0cyByZXF1aXJlbWVudAAAAAASdmVyaWZ5X3Njb3JlX3Byb29mAAAAAAACAAAAAAAAAAR1c2VyAAAAEwAAAAAAAAAKcHJvb2ZfYmxvYgAAAAAADgAAAAEAAAPpAAAABAAAAAM=",
        "AAAAAAAAACNHZXQgdGhlIGN1cnJlbnQgbWluaW11bSByZXF1aXJlbWVudAAAAAAPbWluX3JlcXVpcmVtZW50AAAAAAAAAAABAAAABA==",
        "AAAAAAAAADZTZXQgYSBuZXcgbWluaW11bSByZXF1aXJlbWVudC4gT25seSBjYWxsYWJsZSBieSBhZG1pbi4AAAAAABNzZXRfbWluX3JlcXVpcmVtZW50AAAAAAEAAAAAAAAAC3JlcXVpcmVtZW50AAAAAAQAAAAA",
        "AAAAAAAAABpHZXQgdGhlIHByaXplIHBvb2wgYmFsYW5jZQAAAAAACnByaXplX3Bvb2wAAAAAAAAAAAABAAAACw==",
        "AAAAAAAAACZBZGQgbW9yZSBmdW5kcyB0byB0aGUgY29udHJhY3QsIGluIFhMTQAAAAAACWFkZF9mdW5kcwAAAAAAAAIAAAAAAAAABmZ1bmRlcgAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAAGAAAAAA==",
        "AAAAAAAAADlVcGdyYWRlIHRoZSBjb250cmFjdCB0byBuZXcgd2FzbS4gT25seSBjYWxsYWJsZSBieSBhZG1pbi4AAAAAAAAHdXBncmFkZQAAAAABAAAAAAAAAA1uZXdfd2FzbV9oYXNoAAAAAAAD7gAAACAAAAAA",
        "AAAAAAAAABFHZXQgY3VycmVudCBhZG1pbgAAAAAAAAVhZG1pbgAAAAAAAAAAAAABAAAD6AAAABM=",
        "AAAAAAAAAChTZXQgYSBuZXcgYWRtaW4uIE9ubHkgY2FsbGFibGUgYnkgYWRtaW4uAAAACXNldF9hZG1pbgAAAAAAAAEAAAAAAAAABWFkbWluAAAAAAAAEwAAAAA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    set_vk: this.txFromJSON<null>,
        verify_score_proof: this.txFromJSON<Result<u32>>,
        min_requirement: this.txFromJSON<u32>,
        set_min_requirement: this.txFromJSON<null>,
        prize_pool: this.txFromJSON<i128>,
        add_funds: this.txFromJSON<null>,
        upgrade: this.txFromJSON<null>,
        admin: this.txFromJSON<Option<string>>,
        set_admin: this.txFromJSON<null>
  }
}