import React from 'react';
import { Package } from 'lucide-react';
import { Insumo } from '../types';
import { formatCurrency } from '../services/marginCalculator';

interface CostBreakdownProps {
  insumos: Insumo[];
  custoTotalPorSessao: number;
}

export function CostBreakdown({ insumos, custoTotalPorSessao }: CostBreakdownProps) {
  if (insumos.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-careflow-gray-100 rounded-lg">
          <Package className="w-5 h-5 text-careflow-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-careflow-gray-900">Breakdown de Custos</h3>
      </div>
      
      <div className="space-y-3">
        {insumos.map((insumo, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-careflow-gray-100 last:border-0">
            <span className="text-sm text-careflow-gray-700">{insumo.nome}</span>
            <span className="text-sm font-medium text-careflow-gray-900">
              {formatCurrency(insumo.valor)}
            </span>
          </div>
        ))}
        
        <div className="flex justify-between items-center pt-3 border-t-2 border-careflow-gray-200">
          <span className="text-base font-semibold text-careflow-gray-900">Custo Total por Sessão</span>
          <span className="text-base font-bold text-careflow-primary">
            {formatCurrency(custoTotalPorSessao)}
          </span>
        </div>
      </div>
    </div>
  );
}