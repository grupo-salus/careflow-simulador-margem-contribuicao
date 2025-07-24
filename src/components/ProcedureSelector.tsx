import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Procedure } from '../types';

interface ProcedureSelectorProps {
  procedures: Procedure[];
  selectedProcedure: Procedure | null;
  onProcedureSelect: (procedure: Procedure | null) => void;
}

export function ProcedureSelector({ procedures, selectedProcedure, onProcedureSelect }: ProcedureSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Selecione o Procedimento
      </label>
      <div className="relative">
        <select
          value={selectedProcedure?.id || ''}
          onChange={(e) => {
            const procedure = procedures.find(p => p.id === e.target.value) || null;
            onProcedureSelect(procedure);
          }}
          className="w-full px-4 py-3 bg-white border border-careflow-gray-300 rounded-lg focus:ring-2 focus:ring-careflow-primary focus:border-careflow-primary transition-all duration-200 appearance-none cursor-pointer hover:border-careflow-gray-400"
        >
          <option value="">Escolha um procedimento...</option>
          {procedures.map((procedure) => (
            <option key={procedure.id} value={procedure.id}>
              {procedure.nome}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-careflow-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
}