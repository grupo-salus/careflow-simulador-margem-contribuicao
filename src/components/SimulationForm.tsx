import React from 'react';
import { Procedure } from '../types';
import { InputField } from './InputField';
import { CostBreakdown } from './CostBreakdown';

interface SimulationFormProps {
  selectedProcedure: Procedure | null;
  precoSessao: number;
  numeroSessoes: number;
  onPrecoSessaoChange: (value: number) => void;
  onNumeroSessoesChange: (value: number) => void;
  custoVariavelPorSessao: number;
}

export function SimulationForm({
  selectedProcedure,
  precoSessao,
  numeroSessoes,
  onPrecoSessaoChange,
  onNumeroSessoesChange,
  custoVariavelPorSessao
}: SimulationFormProps) {
  if (!selectedProcedure) {
    return (
      <div className="bg-careflow-gray-50 border-2 border-dashed border-careflow-gray-300 rounded-lg p-8 text-center">
        <p className="text-careflow-gray-500 text-lg">
          Selecione um procedimento para começar a simulação
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6">
        <h3 className="text-lg font-semibold text-careflow-gray-900 mb-6">Parâmetros da Simulação</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Preço por Sessão"
            value={precoSessao}
            onChange={onPrecoSessaoChange}
            placeholder="Ex: 120,00"
            prefix="R$"
            type="currency"
            step={0.01}
          />
          
          <InputField
            label="Número de Sessões"
            value={numeroSessoes}
            onChange={onNumeroSessoesChange}
            placeholder="Ex: 8"
            suffix="sessões"
            type="number"
            min={1}
          />
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Tempo por sessão:</strong> {selectedProcedure.tempoSessaoMin} minutos
          </p>
        </div>
      </div>

      <CostBreakdown 
        insumos={selectedProcedure.insumos}
        custoTotalPorSessao={custoVariavelPorSessao}
      />
    </div>
  );
}