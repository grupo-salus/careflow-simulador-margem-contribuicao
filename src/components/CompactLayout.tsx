import React from "react";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  Percent,
  Package,
  TrendingDown,
} from "lucide-react";
import { ProcedureSelector } from "./ProcedureSelector";
import { SimulationForm } from "./SimulationForm";
import { Procedure } from "../types";
import { formatCurrency, formatPercentage } from "../services/marginCalculator";

interface CompactLayoutProps {
  procedures: Procedure[];
  selectedProcedure: Procedure | null;
  precoSessao: number;
  numeroSessoes: number;
  simulationResult: any;
  onProcedureSelect: (procedure: Procedure | null) => void;
  onPrecoSessaoChange: (value: number) => void;
  onNumeroSessoesChange: (value: number) => void;
}

export const CompactLayout: React.FC<CompactLayoutProps> = ({
  procedures,
  selectedProcedure,
  precoSessao,
  numeroSessoes,
  simulationResult,
  onProcedureSelect,
  onPrecoSessaoChange,
  onNumeroSessoesChange,
}) => {
  const hasValidSimulation = simulationResult !== null;

  return (
    <div className="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 py-6">
      {/* Single Row - 4 Columns Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Column 1 - Procedure Selection */}
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6 h-[600px] flex flex-col">
          <h3 className="text-sm font-semibold text-careflow-gray-900 mb-4 flex-shrink-0">
            Selecione o Procedimento
          </h3>
          <div className="flex-1 overflow-y-auto min-h-0">
            <ProcedureSelector
              procedures={procedures}
              selectedProcedure={selectedProcedure}
              onProcedureSelect={onProcedureSelect}
            />
          </div>
        </div>

        {/* Column 2 - Simulation Parameters */}
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6 h-[600px] flex flex-col">
          <h3 className="text-sm font-semibold text-careflow-gray-900 mb-4 flex-shrink-0">
            Parâmetros da Simulação
          </h3>
          <div className="flex-1 overflow-y-auto min-h-0">
            <SimulationForm
              selectedProcedure={selectedProcedure}
              precoSessao={precoSessao}
              numeroSessoes={numeroSessoes}
              onPrecoSessaoChange={onPrecoSessaoChange}
              onNumeroSessoesChange={onNumeroSessoesChange}
            />
          </div>
        </div>

        {/* Column 3 - Cost Breakdown */}
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6 h-[600px] flex flex-col">
          <h3 className="text-sm font-semibold text-careflow-gray-900 mb-4 flex-shrink-0">
            Breakdown de Custos
          </h3>
          <div className="flex-1 overflow-y-auto min-h-0">
            {selectedProcedure ? (
              <div className="space-y-3 text-sm">
                {/* Custo Profissional */}
                <div className="flex justify-between items-center py-2 border-b border-careflow-gray-100">
                  <span className="font-medium text-careflow-primary">
                    Custo profissional
                  </span>
                  <span className="font-semibold text-careflow-primary">
                    {formatCurrency(
                      selectedProcedure.custoProfissionalPorSessao
                    )}
                  </span>
                </div>

                {/* Insumos */}
                {selectedProcedure.insumos.map((insumo, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-careflow-gray-100 last:border-b-0"
                  >
                    <span className="text-careflow-gray-600 truncate">
                      {insumo.nome}
                    </span>
                    <span className="font-medium text-careflow-gray-900">
                      {formatCurrency(insumo.valor)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="bg-careflow-gray-50 border-2 border-dashed border-careflow-gray-300 rounded-lg p-6 text-center w-full max-w-xs mx-auto">
                  <p className="text-careflow-gray-500 text-sm">
                    Selecione um procedimento
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Total no rodapé */}
          {selectedProcedure && (
            <div className="compact-footer">
              <div className="compact-footer-content">
                <span className="compact-footer-label">Total sessão:</span>
                <span className="compact-footer-value">
                  {formatCurrency(
                    selectedProcedure.insumos.reduce(
                      (total, insumo) => total + insumo.valor,
                      0
                    ) + selectedProcedure.custoProfissionalPorSessao
                  )}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Column 4 - Simulation Results */}
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6 h-[600px] flex flex-col">
          <div className="flex items-center gap-3 mb-4 flex-shrink-0">
            <h3 className="text-sm font-semibold text-careflow-gray-900">
              Resultados
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto min-h-0">
            {hasValidSimulation ? (
              <div className="space-y-3 text-sm">
                {/* Custo Total por Sessão */}
                <div className="flex items-center gap-3 p-3 bg-careflow-gray-50 rounded">
                  <div className="icon-box-red w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-careflow-gray-900">
                      Custo/Sessão
                    </div>
                    <div className="font-bold text-careflow-gray-900">
                      {formatCurrency(simulationResult.custoVariavelPorSessao)}
                    </div>
                  </div>
                </div>

                {/* Receita Total */}
                <div className="flex items-center gap-3 p-3 bg-careflow-gray-50 rounded">
                  <div className="icon-box-green w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-careflow-gray-900">
                      Receita Total
                    </div>
                    <div className="font-bold text-careflow-gray-900">
                      {formatCurrency(simulationResult.receitaTotal)}
                    </div>
                  </div>
                </div>

                {/* Margem de Contribuição */}
                <div className="flex items-center gap-3 p-3 bg-careflow-gray-50 rounded">
                  <div className="icon-box-blue w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-careflow-gray-900">
                      Margem Total
                    </div>
                    <div
                      className={`font-bold ${
                        simulationResult.margemContribuicao >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(simulationResult.margemContribuicao)}
                    </div>
                  </div>
                </div>

                {/* Margem por Sessão */}
                <div className="flex items-center gap-3 p-3 bg-careflow-gray-50 rounded">
                  <div className="icon-box-purple w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-careflow-gray-900">
                      Margem/Sessão
                    </div>
                    <div
                      className={`font-bold ${
                        simulationResult.margemPorSessao >= 0
                          ? "text-careflow-gray-900"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(simulationResult.margemPorSessao)}
                    </div>
                  </div>
                </div>

                {/* Margem de Contribuição % */}
                <div className="flex items-center gap-3 p-3 bg-careflow-gray-50 rounded">
                  <div className="icon-box-green w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-careflow-gray-900">
                      Margem %
                    </div>
                    <div
                      className={`font-bold ${
                        simulationResult.margemPercentual >= 0
                          ? "text-careflow-gray-900"
                          : "text-red-600"
                      }`}
                    >
                      {formatPercentage(simulationResult.margemPercentual)}
                    </div>
                  </div>
                </div>

                {/* Lucro por Hora */}
                <div className="flex items-center gap-3 p-3 bg-careflow-gray-50 rounded">
                  <div className="icon-box-orange w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-careflow-gray-900">
                      {simulationResult.lucroPorHora >= 0
                        ? "Lucro/Hora"
                        : "Prejuízo/Hora"}
                    </div>
                    <div
                      className={`font-bold ${
                        simulationResult.lucroPorHora >= 0
                          ? "text-careflow-gray-900"
                          : "text-red-600"
                      }`}
                    >
                      {formatCurrency(simulationResult.lucroPorHora)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="bg-careflow-gray-50 border-2 border-dashed border-careflow-gray-300 rounded-lg p-6 text-center w-full max-w-xs mx-auto">
                  <p className="text-careflow-gray-500 text-sm">
                    Aguardando simulação
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
