// Temporary wrapper for zcore_scoring contract
// TODO: Generate proper bindings with: soroban contract bindings ts --id CBGM4OE76JRIFNCTCA4FAR5M7P6C3GIGVRO4PWUXSRUFUXP2FLWMRQKE
// Once bindings are generated, this should import from 'zcore_scoring' package like ultrahonk_soroban_contract.ts

import { rpcUrl } from './util';
import { Address, Operation, TransactionBuilder, xdr } from '@stellar/stellar-sdk';
import { Server } from '@stellar/stellar-sdk/rpc';
import { Buffer } from 'buffer';

export const ZCORE_SCORING_CONTRACT_ID = 'CBGM4OE76JRIFNCTCA4FAR5M7P6C3GIGVRO4PWUXSRUFUXP2FLWMRQKE';

// Simple wrapper that uses Operation.invokeContractFunction directly
// This avoids needing ContractSpec until proper bindings are generated
class ZcoreScoringClient {
  public readonly options: {
    contractId: string;
    networkPassphrase: string;
    rpcUrl: string;
    allowHttp: boolean;
    publicKey?: string;
  };

  constructor(options: {
    contractId: string;
    networkPassphrase: string;
    rpcUrl: string;
    allowHttp: boolean;
    publicKey?: string;
  }) {
    this.options = options;
  }

  // Add a method to call verify_score_proof
  async verify_score_proof({
    user,
    proof_blob,
  }: {
    user: string | Address;
    proof_blob: Buffer | Uint8Array;
  }): Promise<{
    transaction: any;
    simulation: any;
    signAndSend: (args: { signTransaction: (xdr: string) => Promise<{ signedTxXdr: string; signerAddress?: string }> }) => Promise<{
      hash: string;
      response: any;
      getTransactionResponse: () => any;
    }>;
  }> {
    const userAddress = typeof user === 'string' ? Address.fromString(user) : user;
    const proofBuffer = Buffer.isBuffer(proof_blob) ? proof_blob : Buffer.from(proof_blob);
    
    // Convert to ScVal for contract invocation
    const userScVal = xdr.ScVal.scvAddress(userAddress.toScAddress());
    const proofScVal = xdr.ScVal.scvBytes(proofBuffer);
    
    const server = new Server(this.options.rpcUrl, { allowHttp: this.options.allowHttp });
    const sourceKey = this.options.publicKey || userAddress.toString();
    const sourceAccount = await server.getAccount(sourceKey);
    
    const contract = new Address(this.options.contractId);
    
    // Build the transaction
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: '100',
      networkPassphrase: this.options.networkPassphrase,
    })
      .addOperation(
        Operation.invokeContractFunction({
          contract: contract.toString(),
          function: 'verify_score_proof',
          args: [userScVal, proofScVal],
        })
      )
      .setTimeout(30)
      .build();
    
    // Simulate the transaction
    const simulation = await server.simulateTransaction(transaction);
    
    // Return an AssembledTransaction-like object
    return {
      transaction,
      simulation,
      signAndSend: async ({ signTransaction }: { signTransaction: (xdr: string) => Promise<{ signedTxXdr: string; signerAddress?: string }> }) => {
        // Prepare the transaction (only takes transaction, not simulation)
        const prepared = await server.prepareTransaction(transaction);
        
        // Sign
        const signed = await signTransaction(prepared.toXDR());
        
        // Parse the signed transaction back to Transaction object
        const signedTx = TransactionBuilder.fromXDR(
          signed.signedTxXdr,
          this.options.networkPassphrase
        );
        
        // Send
        const result = await server.sendTransaction(signedTx);
        
        return {
          hash: result.hash,
          response: result,
          getTransactionResponse: () => result,
        };
      },
    };
  }
}

export default new ZcoreScoringClient({
  contractId: ZCORE_SCORING_CONTRACT_ID,
  networkPassphrase: 'Standalone Network ; February 2017',
  rpcUrl,
  allowHttp: true,
  publicKey: undefined,
});

