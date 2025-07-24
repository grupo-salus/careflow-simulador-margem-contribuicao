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
  const custoTotalPorSessao = custoTotalInsumos + procedure.custoProfissionalPorSessao;
  
  return (
    <div
      onClick={() => onClick(procedure)}
      className={`p-3 sm:p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? 'border-careflow-primary bg-careflow-primary bg-opacity-5 shadow-md'
          : 'border-careflow-gray-200 bg-white hover:border-careflow-gray-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <h3 className={`font-semibold text-xs sm:text-sm ${
          isSelected ? 'text-careflow-primary' : 'text-careflow-gray-900'
        } break-words flex-1 min-w-0`}>
          {procedure.nome}
        </h3>
        {isSelected && (
          <div className="w-2 h-2 bg-careflow-primary rounded-full flex-shrink-0 ml-2"></div>
        )}
      </div>
      
      <div className="space-y-1.5 sm:space-y-2 text-xs text-careflow-gray-600">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <DollarSign className="w-3 h-3 flex-shrink-0" />
          <span className="break-words">Preço sugerido: {formatCurrency(procedure.precoSugerido)}</span>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span>{procedure.numeroSessoes} sessões</span>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span>{procedure.tempoSessaoMin} min/sessão</span>
        </div>
      </div>
      
      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-careflow-gray-100">
        <div className="text-xs text-careflow-gray-500">
          <span className="font-medium">Custo por sessão:</span> {formatCurrency(custoTotalPorSessao)}
        </div>
      </div>
    </div>
  );
} 