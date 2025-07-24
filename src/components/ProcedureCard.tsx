import React from 'react';
import { Clock, DollarSign, Calendar } from 'lucide-react';
import { Procedure } from '../types';
import { formatCurrency } from '../services/marginCalculator';

interface ProcedureCardProps {
  procedure: Procedure;
  isSelected: boolean;
  onClick: (procedure: Procedure) => void;
}

export function ProcedureCard({ procedure, isSelected, onClick }: ProcedureCardProps) {
  const custoTotalInsumos = procedure.insumos.reduce((total, insumo) => total + insumo.valor, 0);
  
  return (
    <div
      onClick={() => onClick(procedure)}
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-careflow-primary bg-careflow-primary bg-opacity-5 shadow-md'
          : 'border-careflow-gray-200 bg-white hover:border-careflow-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`font-semibold text-sm ${
          isSelected ? 'text-careflow-primary' : 'text-careflow-gray-900'
        }`}>
          {procedure.nome}
        </h3>
        {isSelected && (
          <div className="w-2 h-2 bg-careflow-primary rounded-full"></div>
        )}
      </div>
      
      <div className="space-y-2 text-xs text-careflow-gray-600">
        <div className="flex items-center gap-2">
          <DollarSign className="w-3 h-3" />
          <span>Preço sugerido: {formatCurrency(procedure.precoSugerido)}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          <span>{procedure.numeroSessoes} sessões</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <span>{procedure.tempoSessaoMin} min/sessão</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-careflow-gray-100">
        <div className="text-xs text-careflow-gray-500">
          <span className="font-medium">Custo por sessão:</span> {formatCurrency(custoTotalInsumos)}
        </div>
      </div>
    </div>
  );
} 