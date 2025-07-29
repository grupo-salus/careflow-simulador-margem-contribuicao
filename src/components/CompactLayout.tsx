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
    <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Single Row - 4 Columns Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Column 1 - Procedure Selection */}
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-4 sm:p-6 h-[500px] sm:h-[600px] flex flex-col">
          <h3 className="text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem] font-semibold text-careflow-gray-900 mb-3 sm:mb-4 flex-shrink-0">
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
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-4 sm:p-6 h-[500px] sm:h-[600px] flex flex-col">
          <h3 className="text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem] font-semibold text-careflow-gray-900 mb-3 sm:mb-4 flex-shrink-0">
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
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-4 sm:p-6 h-[500px] sm:h-[600px] flex flex-col">
          <h3 className="text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem] font-semibold text-careflow-gray-900 mb-3 sm:mb-4 flex-shrink-0">
            Breakdown de Custos
          </h3>
          <div className="flex-1 overflow-y-auto min-h-0 pr-3">
            {selectedProcedure ? (
              <div className="space-y-2 sm:space-y-3 text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
                {/* Custo Profissional */}
                <div className="flex justify-between items-start py-1.5 sm:py-2 border-b border-careflow-gray-100">
                  <span className="font-medium text-careflow-primary break-words flex-1 min-w-0 pr-4">
                    Custo profissional
                  </span>
                  <span className="font-semibold text-careflow-primary flex-shrink-0">
                    {formatCurrency(
                      selectedProcedure.custoProfissionalPorSessao
                    )}
                  </span>
                </div>

                {/* Insumos */}
                {selectedProcedure.insumos.map((insumo, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start py-1.5 sm:py-2 border-b border-careflow-gray-100 last:border-b-0"
                  >
                    <span className="text-careflow-gray-600 break-words flex-1 min-w-0 pr-4">
                      {insumo.nome}
                    </span>
                    <span className="font-medium text-careflow-gray-900 flex-shrink-0">
                      {formatCurrency(insumo.valor)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="bg-careflow-gray-50 border-2 border-dashed border-careflow-gray-300 rounded-lg p-4 sm:p-6 text-center w-full max-w-xs mx-auto">
                  <p className="text-careflow-gray-500 text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
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
                <span className="compact-footer-label text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
                  Total sessão:
                </span>
                <span className="compact-footer-value text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
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
        <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-4 sm:p-6 h-[500px] sm:h-[600px] flex flex-col">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-shrink-0">
            <h3 className="text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem] font-semibold text-careflow-gray-900">
              Resultados
            </h3>
          </div>

          <div className="flex-1 min-h-0">
            {hasValidSimulation ? (
              <div className="space-y-2 sm:space-y-3 text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
                {/* Custo Total por Sessão */}
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-careflow-gray-50 rounded">
                  <div className="hidden 2xl:flex icon-box-red w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.5rem] xl:h-[2.5rem] items-center justify-center flex-shrink-0">
                    <Package className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem] lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.25rem] xl:h-[1.25rem]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-careflow-gray-900">
                        Custo/Sessão
                      </div>
                      <div className="font-bold text-careflow-gray-900">
                        {formatCurrency(
                          simulationResult.custoVariavelPorSessao
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Receita Total */}
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-careflow-gray-50 rounded">
                  <div className="hidden 2xl:flex icon-box-green w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.5rem] xl:h-[2.5rem] items-center justify-center flex-shrink-0">
                    <DollarSign className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem] lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.25rem] xl:h-[1.25rem]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-careflow-gray-900">
                        Receita Total
                      </div>
                      <div className="font-bold text-careflow-gray-900">
                        {formatCurrency(simulationResult.receitaTotal)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custo Total Variável */}
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-careflow-gray-50 rounded">
                  <div className="hidden 2xl:flex icon-box-orange-dark w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.5rem] xl:h-[2.5rem] items-center justify-center flex-shrink-0">
                    <TrendingDown className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem] lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.25rem] xl:h-[1.25rem]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-careflow-gray-900">
                        Custo Total Variável
                      </div>
                      <div className="font-bold text-careflow-gray-900">
                        {formatCurrency(simulationResult.custoTotalVariavel)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Margem de Contribuição */}
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-careflow-gray-50 rounded">
                  <div className="hidden 2xl:flex icon-box-blue w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.5rem] xl:h-[2.5rem] items-center justify-center flex-shrink-0">
                    <Target className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem] lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.25rem] xl:h-[1.25rem]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
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
                </div>

                {/* Margem por Sessão */}
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-careflow-gray-50 rounded">
                  <div className="hidden 2xl:flex icon-box-purple w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.5rem] xl:h-[2.5rem] items-center justify-center flex-shrink-0">
                    <Percent className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem] lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.25rem] xl:h-[1.25rem]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
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
                </div>

                {/* Margem de Contribuição % */}
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-careflow-gray-50 rounded">
                  <div className="hidden 2xl:flex icon-box-green w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.5rem] xl:h-[2.5rem] items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem] lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.25rem] xl:h-[1.25rem]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
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
                </div>

                {/* Lucro por Hora */}
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-careflow-gray-50 rounded">
                  <div className="hidden 2xl:flex icon-box-orange w-[2rem] h-[2rem] sm:w-[2.5rem] sm:h-[2.5rem] lg:w-[2.25rem] lg:h-[2.25rem] xl:w-[2.5rem] xl:h-[2.5rem] items-center justify-center flex-shrink-0">
                    <Clock className="w-[1rem] h-[1rem] sm:w-[1.25rem] sm:h-[1.25rem] lg:w-[1.125rem] lg:h-[1.125rem] xl:w-[1.25rem] xl:h-[1.25rem]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-medium text-careflow-gray-900">
                        {simulationResult.lucroPorHora >= 0
                          ? "Lucro/Hora"
                          : "Prejuízo/Hora"}
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`font-bold ${
                            simulationResult.lucroPorHora >= 0
                              ? "text-careflow-gray-900"
                              : "text-red-600"
                          }`}
                        >
                          {formatCurrency(simulationResult.lucroPorHora)}
                        </div>
                        <div className="text-[0.75rem] text-careflow-gray-600">
                          {simulationResult.tempoTotalHoras.toFixed(1)}h
                        </div>
                      </div>
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
