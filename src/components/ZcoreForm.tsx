import React, { useState, useRef } from 'react';
import { Button, Text, Input } from '@stellar/design-system';
import { useWallet } from '../hooks/useWallet';
import { useWalletBalance } from '../hooks/useWalletBalance';
import { NoirService } from '../services/NoirService';
import { StellarContractService, zcoreScoringClient } from '../services/StellarContractService';
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
  return '0x' + Array.from(hash).map((b) => (b as number).toString(16).padStart(2, '0')).join('');
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
    setFormData((prev: FormDataInput) => ({ ...prev, [field]: value }));
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
        const proofBuffer = StellarContractService.toBuffer(proofResult.proofBlob);

        // Use the zcore scoring contract client
        zcoreScoringClient.options.publicKey = address;

        // Call verify_score_proof using the contract's method
        // The contract expects: user (Address), proof_blob (Bytes)
        const tx = await zcoreScoringClient.verify_score_proof({
          user: address,
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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
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
              id="nombre-completo"
              label="Full Name"
              fieldSize="md"
              value={formData.nombre_completo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('nombre_completo', e.target.value)}
              placeholder="John Doe"
            />
            <Input
              id="dni"
              label="DNI/ID"
              fieldSize="md"
              value={formData.dni}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('dni', e.target.value)}
              placeholder="12345678"
            />
            <Input
              id="email"
              label="Email"
              fieldSize="md"
              type="email"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('email', e.target.value)}
              placeholder="john@example.com"
            />
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.email_verificado}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('email_verificado', e.target.checked)}
                />
                <Text as="span" size="sm">Email Verified</Text>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.telefono_verificado}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('telefono_verificado', e.target.checked)}
                />
                <Text as="span" size="sm">Phone Verified</Text>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.dni_verificado}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('dni_verificado', e.target.checked)}
                />
                <Text as="span" size="sm">DNI Verified</Text>
              </label>
            </div>
          </div>
        </div>

        {/* Situación Laboral */}
        <div>
          <Text as="h3" size="md" style={{ marginBottom: '1rem' }}>
            Employment Information
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.tiene_empleo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('tiene_empleo', e.target.checked)}
              />
              <Text as="span" size="sm">Has Employment</Text>
            </label>
            {formData.tiene_empleo && (
              <>
                <div>
                  <Text as="span" size="sm" style={{ display: 'block', marginBottom: '0.5rem' }}>
                    Employment Type
                  </Text>
                  <select
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={formData.tipo_empleo.toString()}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('tipo_empleo', parseInt(e.target.value))}
                  >
                    <option value="0">None</option>
                    <option value="1">Part-time</option>
                    <option value="2">Self-employed (&lt;2 years)</option>
                    <option value="3">Self-employed (&gt;2 years)</option>
                    <option value="4">Full-time (private)</option>
                    <option value="5">Full-time (public)</option>
                  </select>
                </div>
                <Input
                  id="ingresos-mensuales"
                  label="Monthly Income (USD)"
                  fieldSize="md"
                  type="number"
                  value={formData.ingresos_mensuales_usd.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('ingresos_mensuales_usd', parseInt(e.target.value) || 0)}
                />
                <Input
                  id="antiguedad-trabajo"
                  label="Job Tenure (months)"
                  fieldSize="md"
                  type="number"
                  value={formData.antiguedad_trabajo_meses.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('antiguedad_trabajo_meses', parseInt(e.target.value) || 0)}
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
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.tiene_cuenta_bancaria}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('tiene_cuenta_bancaria', e.target.checked)}
              />
              <Text as="span" size="sm">Has Bank Account</Text>
            </label>
            {formData.tiene_cuenta_bancaria && (
              <Input
                id="antiguedad-cuenta-bancaria"
                label="Bank Account Age (months)"
                fieldSize="md"
                type="number"
                value={formData.antiguedad_cuenta_bancaria_meses.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('antiguedad_cuenta_bancaria_meses', parseInt(e.target.value) || 0)}
              />
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.tiene_tarjeta_credito}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('tiene_tarjeta_credito', e.target.checked)}
              />
              <Text as="span" size="sm">Has Credit Card</Text>
            </label>
            {formData.tiene_tarjeta_credito && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.usa_tarjeta_responsablemente}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('usa_tarjeta_responsablemente', e.target.checked)}
                />
                <Text as="span" size="sm">Uses Credit Card Responsibly</Text>
              </label>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.tiene_cuenta_ahorro}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('tiene_cuenta_ahorro', e.target.checked)}
              />
              <Text as="span" size="sm">Has Savings Account</Text>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.tuvo_prestamos}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('tuvo_prestamos', e.target.checked)}
              />
              <Text as="span" size="sm">Had Loans</Text>
            </label>
            {formData.tuvo_prestamos && (
              <>
                <Input
                  id="cantidad-prestamos"
                  label="Paid Loans Count"
                  fieldSize="md"
                  type="number"
                  value={formData.cantidad_prestamos_pagados.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('cantidad_prestamos_pagados', parseInt(e.target.value) || 0)}
                />
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.prestamos_a_tiempo}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('prestamos_a_tiempo', e.target.checked)}
                  />
                  <Text as="span" size="sm">Loans Paid on Time</Text>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.credito_actual_al_dia}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('credito_actual_al_dia', e.target.checked)}
                  />
                  <Text as="span" size="sm">Current Credit Up to Date</Text>
                </label>
              </>
            )}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.tiene_deudas}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('tiene_deudas', e.target.checked)}
              />
              <Text as="span" size="sm">Has Debts</Text>
            </label>
            {formData.tiene_deudas && (
              <Input
                id="ratio-deuda-ingreso"
                label="Debt-to-Income Ratio (×100, e.g., 30 for 0.3)"
                fieldSize="md"
                type="number"
                value={formData.ratio_deuda_ingreso.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('ratio_deuda_ingreso', parseInt(e.target.value) || 0)}
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
            <div>
              <Text as="span" size="sm" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Country Tier
              </Text>
              <select
                style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
                value={formData.pais_tier.toString()}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateField('pais_tier', parseInt(e.target.value))}
              >
                <option value="1">Tier 1 (Best)</option>
                <option value="2">Tier 2</option>
                <option value="3">Tier 3</option>
                <option value="4">Tier 4 (Worst)</option>
              </select>
            </div>
            <Input
              id="campos-vacios"
              label="Empty Fields Count"
              fieldSize="md"
              type="number"
              value={formData.campos_vacios.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('campos_vacios', parseInt(e.target.value) || 0)}
            />
            <Input
              id="horizon-score"
              label="Horizon Score"
              fieldSize="md"
              type="number"
              value={formData.horizon_score.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('horizon_score', parseInt(e.target.value) || 0)}
            />
            <Input
              id="requirement"
              label="Minimum Requirement"
              fieldSize="md"
              type="number"
              value={formData.requirement.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateField('requirement', parseInt(e.target.value) || 300)}
            />
          </div>
        </div>

        {/* Botón de Generar */}
        <Button
          onClick={generateProof}
          disabled={isGenerating || !address}
          isLoading={isGenerating}
          variant="primary"
          size="md"
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