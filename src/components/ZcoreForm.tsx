import React, { useState, useRef } from 'react';
import { Button, Text, Input, Checkbox, Select } from '@stellar/design-system';
import { useWallet } from '../hooks/useWallet';
import { useWalletBalance } from '../hooks/useWalletBalance';
import { NoirService } from '../services/NoirService';
import { StellarContractService, ZCORE_SCORING_CONTRACT_ID } from '../services/StellarContractService';
import { Contract } from '@stellar/stellar-sdk/contract';
import { Address } from '@stellar/stellar-sdk';
import { Networks } from '@stellar/stellar-sdk';
import { Buffer } from 'buffer';
import { keccak_256 } from '@noble/hashes/sha3.js';

interface FormDataInput {
  // Datos personales (hasheados)
  nombre_completo: string;
  dni: string;
  email: string;
  
  // Verificaciones
  email_verificado: boolean;
  telefono_verificado: boolean;
  dni_verificado: boolean;
  
  // Situación laboral
  tiene_empleo: boolean;
  tipo_empleo: number; // 0=ninguno, 1=medio_tiempo, 2=independiente_menos_2, 3=independiente_mas_2, 4=tiempo_completo_privado, 5=tiempo_completo_publico
  ingresos_mensuales_usd: number;
  antiguedad_trabajo_meses: number;
  
  // Situación financiera
  tiene_cuenta_bancaria: boolean;
  antiguedad_cuenta_bancaria_meses: number;
  tiene_tarjeta_credito: boolean;
  usa_tarjeta_responsablemente: boolean;
  tiene_cuenta_ahorro: boolean;
  tuvo_prestamos: boolean;
  cantidad_prestamos_pagados: number;
  prestamos_a_tiempo: boolean;
  credito_actual_al_dia: boolean;
  tiene_deudas: boolean;
  ratio_deuda_ingreso: number; // Multiplicado por 100 (ej: 30 = 0.3)
  
  // País y completitud
  pais_tier: number; // 1=tier1, 2=tier2, 3=tier3, 4=tier4
  campos_vacios: number;
  
  // Horizon score
  horizon_score: number;
  
  // Requirement
  requirement: number;
}

const EMPTY_FORM: FormDataInput = {
  nombre_completo: '',
  dni: '',
  email: '',
  email_verificado: false,
  telefono_verificado: false,
  dni_verificado: false,
  tiene_empleo: false,
  tipo_empleo: 0,
  ingresos_mensuales_usd: 0,
  antiguedad_trabajo_meses: 0,
  tiene_cuenta_bancaria: false,
  antiguedad_cuenta_bancaria_meses: 0,
  tiene_tarjeta_credito: false,
  usa_tarjeta_responsablemente: false,
  tiene_cuenta_ahorro: false,
  tuvo_prestamos: false,
  cantidad_prestamos_pagados: 0,
  prestamos_a_tiempo: false,
  credito_actual_al_dia: false,
  tiene_deudas: false,
  ratio_deuda_ingreso: 0,
  pais_tier: 2,
  campos_vacios: 0,
  horizon_score: 0,
  requirement: 300,
};

/**
 * Hash a string to a Field element (32 bytes, big-endian)
 */
function strToField(str: string): string {
  const hash = keccak_256(new TextEncoder().encode(str));
  // Convert to big-endian hex string (64 chars)
  return '0x' + Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('');
}

export const ZcoreForm: React.FC = () => {
  const { address, signTransaction } = useWallet();
  const { updateBalance } = useWalletBalance();
  const [formData, setFormData] = useState<FormDataInput>(EMPTY_FORM);
  const [output, setOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const noirService = useRef(new NoirService());

  const updateField = <K extends keyof FormDataInput>(
    field: K,
    value: FormDataInput[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateProof = async () => {
    if (!address || !signTransaction) {
      setOutput('Error: Please connect your wallet first.');
      return;
    }

    const walletSignTransaction = async (xdr: string) => {
      const signed = await signTransaction(xdr);
      return {
        signedTxXdr: signed.signedTxXdr,
        signerAddress: signed.signerAddress ?? address,
      };
    };

    setIsGenerating(true);
    setOutput('Generating proof...\n');

    try {
      // Hash sensitive data
      const nombre_completo_hash = strToField(formData.nombre_completo);
      const dni_hash = strToField(formData.dni);
      const email_hash = strToField(formData.email);

      // Prepare circuit inputs
      const circuitInputs = {
        form: {
          form_data: {
            nombre_completo_hash,
            dni_hash,
            email_hash,
            email_verificado: formData.email_verificado,
            telefono_verificado: formData.telefono_verificado,
            dni_verificado: formData.dni_verificado,
            tiene_empleo: formData.tiene_empleo,
            tipo_empleo: formData.tipo_empleo,
            ingresos_mensuales_usd: formData.ingresos_mensuales_usd,
            antiguedad_trabajo_meses: formData.antiguedad_trabajo_meses,
            tiene_cuenta_bancaria: formData.tiene_cuenta_bancaria,
            antiguedad_cuenta_bancaria_meses: formData.antiguedad_cuenta_bancaria_meses,
            tiene_tarjeta_credito: formData.tiene_tarjeta_credito,
            usa_tarjeta_responsablemente: formData.usa_tarjeta_responsablemente,
            tiene_cuenta_ahorro: formData.tiene_cuenta_ahorro,
            tuvo_prestamos: formData.tuvo_prestamos,
            cantidad_prestamos_pagados: formData.cantidad_prestamos_pagados,
            prestamos_a_tiempo: formData.prestamos_a_tiempo,
            credito_actual_al_dia: formData.credito_actual_al_dia,
            tiene_deudas: formData.tiene_deudas,
            ratio_deuda_ingreso: formData.ratio_deuda_ingreso,
            pais_tier: formData.pais_tier,
            campos_vacios: formData.campos_vacios,
          },
          horizon_score: formData.horizon_score,
        },
        requirement: formData.requirement,
      };

      // Generate proof
      const proofResult = await noirService.current.generateProof('zcore_zk', circuitInputs);

      let outputText = `
✓ Proof generated successfully!

Proof ID: ${proofResult.proofId}
Proof Size: ${proofResult.proof.length} bytes
Public Inputs: ${proofResult.publicInputs.length} bytes
VK Size: ${proofResult.vkJson.length} bytes
Time: ${proofResult.proofTime}s

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STELLAR VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();

      // Verify on Stellar
      try {
        // Load VK JSON as string (the contract expects the JSON array format)
        const vkResponse = await fetch('/circuits/vk_fields.json');
        const vkJsonArray = await vkResponse.json();
        const vkJsonString = JSON.stringify(vkJsonArray);
        const vkBuffer = Buffer.from(vkJsonString, 'utf-8');
        const proofBuffer = StellarContractService.toBuffer(proofResult.proofBlob);

        // Create contract instance using Soroban SDK
        const contract = new Contract({
          contractId: ZCORE_SCORING_CONTRACT_ID,
          networkPassphrase: Networks.STANDALONE,
          rpcUrl: 'http://localhost:8000/soroban/rpc',
        });

        contract.options.publicKey = address;

        // Call verify_score_proof
        // The contract expects: user (Address), proof_blob (Bytes)
        const tx = await contract.call('verify_score_proof', {
          user: Address.fromString(address),
          proof_blob: proofBuffer,
        });

        const result = await tx.signAndSend({ signTransaction: walletSignTransaction });
        const txData = StellarContractService.extractTransactionData(result);

        // Refresh wallet balance
        setTimeout(() => {
          updateBalance();
        }, 2000);

        outputText += `\n\n✓ Contract Verification Successful!

Transaction Hash: ${txData.txHash}
Fee: ${txData.fee ? StellarContractService.formatStroopsToXlm(txData.fee) : 'N/A'} XLM

Your score proof has been verified on-chain!`;

      } catch (contractError: any) {
        setTimeout(() => {
          updateBalance();
        }, 2000);

        outputText += `\n\n✗ Contract Verification Failed

Error: ${contractError.message}

The proof was generated successfully, but the contract rejected it.
This could mean:
- The score is below the minimum requirement
- The VK is not configured in the contract
- There was a network issue`;
      }

      setOutput(outputText);
    } catch (error: any) {
      setOutput(`❌ Proof Generation Failed

Error: ${error.message}

${error.stack || ''}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Text as="h2" size="lg" style={{ marginBottom: '1rem' }}>
        Zcore Credit Scoring Form
      </Text>
      <Text as="p" size="md" style={{ marginBottom: '2rem', color: '#666' }}>
        Fill out the form below to generate a zero-knowledge proof of your credit score.
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Datos Personales */}
        <div>
          <Text as="h3" size="md" style={{ marginBottom: '1rem' }}>
            Personal Information
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Input
              label="Full Name"
              value={formData.nombre_completo}
              onChange={(e) => updateField('nombre_completo', e.target.value)}
              placeholder="John Doe"
            />
            <Input
              label="DNI/ID"
              value={formData.dni}
              onChange={(e) => updateField('dni', e.target.value)}
              placeholder="12345678"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="john@example.com"
            />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Checkbox
                label="Email Verified"
                checked={formData.email_verificado}
                onChange={(checked) => updateField('email_verificado', checked)}
              />
              <Checkbox
                label="Phone Verified"
                checked={formData.telefono_verificado}
                onChange={(checked) => updateField('telefono_verificado', checked)}
              />
              <Checkbox
                label="DNI Verified"
                checked={formData.dni_verificado}
                onChange={(checked) => updateField('dni_verificado', checked)}
              />
            </div>
          </div>
        </div>

        {/* Situación Laboral */}
        <div>
          <Text as="h3" size="md" style={{ marginBottom: '1rem' }}>
            Employment Information
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Checkbox
              label="Has Employment"
              checked={formData.tiene_empleo}
              onChange={(checked) => updateField('tiene_empleo', checked)}
            />
            {formData.tiene_empleo && (
              <>
                <Select
                  label="Employment Type"
                  value={formData.tipo_empleo.toString()}
                  onChange={(e) => updateField('tipo_empleo', parseInt(e.target.value))}
                >
                  <option value="0">None</option>
                  <option value="1">Part-time</option>
                  <option value="2">Self-employed (&lt;2 years)</option>
                  <option value="3">Self-employed (&gt;2 years)</option>
                  <option value="4">Full-time (private)</option>
                  <option value="5">Full-time (public)</option>
                </Select>
                <Input
                  label="Monthly Income (USD)"
                  type="number"
                  value={formData.ingresos_mensuales_usd}
                  onChange={(e) => updateField('ingresos_mensuales_usd', parseInt(e.target.value) || 0)}
                />
                <Input
                  label="Job Tenure (months)"
                  type="number"
                  value={formData.antiguedad_trabajo_meses}
                  onChange={(e) => updateField('antiguedad_trabajo_meses', parseInt(e.target.value) || 0)}
                />
              </>
            )}
          </div>
        </div>

        {/* Situación Financiera */}
        <div>
          <Text as="h3" size="md" style={{ marginBottom: '1rem' }}>
            Financial Information
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Checkbox
              label="Has Bank Account"
              checked={formData.tiene_cuenta_bancaria}
              onChange={(checked) => updateField('tiene_cuenta_bancaria', checked)}
            />
            {formData.tiene_cuenta_bancaria && (
              <Input
                label="Bank Account Age (months)"
                type="number"
                value={formData.antiguedad_cuenta_bancaria_meses}
                onChange={(e) => updateField('antiguedad_cuenta_bancaria_meses', parseInt(e.target.value) || 0)}
              />
            )}
            <Checkbox
              label="Has Credit Card"
              checked={formData.tiene_tarjeta_credito}
              onChange={(checked) => updateField('tiene_tarjeta_credito', checked)}
            />
            {formData.tiene_tarjeta_credito && (
              <Checkbox
                label="Uses Credit Card Responsibly"
                checked={formData.usa_tarjeta_responsablemente}
                onChange={(checked) => updateField('usa_tarjeta_responsablemente', checked)}
              />
            )}
            <Checkbox
              label="Has Savings Account"
              checked={formData.tiene_cuenta_ahorro}
              onChange={(checked) => updateField('tiene_cuenta_ahorro', checked)}
            />
            <Checkbox
              label="Had Loans"
              checked={formData.tuvo_prestamos}
              onChange={(checked) => updateField('tuvo_prestamos', checked)}
            />
            {formData.tuvo_prestamos && (
              <>
                <Input
                  label="Paid Loans Count"
                  type="number"
                  value={formData.cantidad_prestamos_pagados}
                  onChange={(e) => updateField('cantidad_prestamos_pagados', parseInt(e.target.value) || 0)}
                />
                <Checkbox
                  label="Loans Paid on Time"
                  checked={formData.prestamos_a_tiempo}
                  onChange={(checked) => updateField('prestamos_a_tiempo', checked)}
                />
                <Checkbox
                  label="Current Credit Up to Date"
                  checked={formData.credito_actual_al_dia}
                  onChange={(checked) => updateField('credito_actual_al_dia', checked)}
                />
              </>
            )}
            <Checkbox
              label="Has Debts"
              checked={formData.tiene_deudas}
              onChange={(checked) => updateField('tiene_deudas', checked)}
            />
            {formData.tiene_deudas && (
              <Input
                label="Debt-to-Income Ratio (×100, e.g., 30 for 0.3)"
                type="number"
                value={formData.ratio_deuda_ingreso}
                onChange={(e) => updateField('ratio_deuda_ingreso', parseInt(e.target.value) || 0)}
              />
            )}
          </div>
        </div>

        {/* País y Otros */}
        <div>
          <Text as="h3" size="md" style={{ marginBottom: '1rem' }}>
            Additional Information
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Select
              label="Country Tier"
              value={formData.pais_tier.toString()}
              onChange={(e) => updateField('pais_tier', parseInt(e.target.value))}
            >
              <option value="1">Tier 1 (Best)</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
              <option value="4">Tier 4 (Worst)</option>
            </Select>
            <Input
              label="Empty Fields Count"
              type="number"
              value={formData.campos_vacios}
              onChange={(e) => updateField('campos_vacios', parseInt(e.target.value) || 0)}
            />
            <Input
              label="Horizon Score"
              type="number"
              value={formData.horizon_score}
              onChange={(e) => updateField('horizon_score', parseInt(e.target.value) || 0)}
            />
            <Input
              label="Minimum Requirement"
              type="number"
              value={formData.requirement}
              onChange={(e) => updateField('requirement', parseInt(e.target.value) || 300)}
            />
          </div>
        </div>

        {/* Botón de Generar */}
        <Button
          onClick={generateProof}
          disabled={isGenerating || !address}
          isLoading={isGenerating}
        >
          {isGenerating ? 'Generating Proof...' : 'Generate ZK Proof'}
        </Button>

        {/* Output */}
        {output && (
          <div
            style={{
              padding: '1rem',
              backgroundColor: '#f5f5f5',
              borderRadius: '4px',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              fontSize: '0.875rem',
            }}
          >
            {output}
          </div>
        )}
      </div>
    </div>
  );
};

