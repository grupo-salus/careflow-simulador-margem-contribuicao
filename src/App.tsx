import React, { useState, useMemo } from "react";
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
import { ProcedureSelector } from "./components/ProcedureSelector";
import { SimulationForm } from "./components/SimulationForm";
import { ResultCard } from "./components/ResultCard";
import {
  calcularMargemContribuicao,
  formatCurrency,
  formatPercentage,
} from "./services/marginCalculator";
import { Procedure } from "./types";
import proceduresData from "./data/procedures.json";

function App() {
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(
    null
  );
  const [precoSessao, setPrecoSessao] = useState(0);
  const [numeroSessoes, setNumeroSessoes] = useState(0);

  const procedures: Procedure[] = proceduresData;

  // Sincronizar valores quando um procedimento é selecionado
  React.useEffect(() => {
    if (selectedProcedure) {
      setPrecoSessao(selectedProcedure.precoSugerido);
      setNumeroSessoes(selectedProcedure.numeroSessoes);
    }
  }, [selectedProcedure]);

  const simulationResult = useMemo(() => {
    if (!selectedProcedure || precoSessao <= 0 || numeroSessoes <= 0) {
      return null;
    }

    try {
      return calcularMargemContribuicao({
        precoSessao,
        numeroSessoes,
        insumos: selectedProcedure.insumos,
        tempoSessaoMin: selectedProcedure.tempoSessaoMin,
        custoProfissionalPorSessao:
          selectedProcedure.custoProfissionalPorSessao,
      });
    } catch (error) {
      console.error("Erro no cálculo:", error);
      return null;
    }
  }, [selectedProcedure, precoSessao, numeroSessoes]);

  const hasValidSimulation = simulationResult !== null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-careflow-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-careflow-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* CareFlow Logo */}
              <img
                src="https://careflowsb.wetoksoft.com.br/images/careflow.png"
                alt="Careflow Logo"
                className="h-8 w-auto"
              />

              {/* Simulator Section */}
              <div className="flex items-center gap-3 ml-6 pl-6 border-l border-careflow-gray-200">
                <div className="bg-gradient-to-r from-careflow-purple to-careflow-pink rounded-full p-2">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-medium text-careflow-gray-900">
                  Simulador de Margem de Contribuição
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden py-4">
            <div className="flex items-center justify-center">
              <img
                src="https://careflowsb.wetoksoft.com.br/images/careflow.png"
                alt="Careflow Logo"
                className="h-8 w-auto"
              />
            </div>
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-careflow-purple to-careflow-pink rounded-full p-2">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-careflow-gray-900">
                  Simulador de Margem de Contribuição
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Top Section - Input Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Left Column - Procedure Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-4 sm:p-6 h-[300px] sm:h-96">
              <ProcedureSelector
                procedures={procedures}
                selectedProcedure={selectedProcedure}
                onProcedureSelect={setSelectedProcedure}
              />
            </div>
          </div>

          {/* Middle Column - Simulation Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-4 sm:p-6 h-[300px] sm:h-96">
              <SimulationForm
                selectedProcedure={selectedProcedure}
                precoSessao={precoSessao}
                numeroSessoes={numeroSessoes}
                onPrecoSessaoChange={setPrecoSessao}
                onNumeroSessoesChange={setNumeroSessoes}
              />
            </div>
          </div>

          {/* Right Column - Cost Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-4 sm:p-6 h-[300px] sm:h-96 flex flex-col">
              <h3 className="text-lg font-semibold text-careflow-gray-900 mb-4 sm:mb-6">
                Breakdown de Custos
              </h3>
              {selectedProcedure ? (
                <>
                  <div className="flex-1 overflow-y-auto mb-4">
                    <div className="space-y-3 pr-3">
                      {/* Custo Profissional - Primeiro com destaque sutil */}
                      <div className="flex justify-between items-center py-2 border-b border-careflow-gray-100">
                        <span className="text-sm font-medium text-careflow-primary">
                          Custo profissional
                        </span>
                        <span className="text-sm font-semibold text-careflow-primary">
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
                          <span className="text-sm text-careflow-gray-600">
                            {insumo.nome}
                          </span>
                          <span className="text-sm font-medium text-careflow-gray-900">
                            {formatCurrency(insumo.valor)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-careflow-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-careflow-gray-900 text-sm sm:text-base">
                        Custo total sessão (R$):
                      </span>
                      <span className="font-bold text-careflow-primary text-sm sm:text-base">
                        {formatCurrency(
                          selectedProcedure.insumos.reduce(
                            (total, insumo) => total + insumo.valor,
                            0
                          ) + selectedProcedure.custoProfissionalPorSessao
                        )}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="bg-careflow-gray-50 border-2 border-dashed border-careflow-gray-300 rounded-lg p-6 sm:p-8 text-center w-full max-w-xs mx-auto">
                    <p className="text-careflow-gray-500 text-base sm:text-lg">
                      Selecione um procedimento
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Section - Results */}
        <div className="w-full">
          {hasValidSimulation ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="bg-gradient-to-r from-careflow-purple to-careflow-pink p-2 sm:p-3 rounded-lg">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-careflow-gray-900">
                  Resultados da Simulação
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <ResultCard
                  title="Custo Total por Sessão"
                  value={formatCurrency(
                    simulationResult.custoVariavelPorSessao
                  )}
                  subtitle="Insumos + Profissional"
                  icon={Package}
                  variant="red"
                />

                <ResultCard
                  title="Receita Total"
                  value={formatCurrency(simulationResult.receitaTotal)}
                  subtitle={`${formatCurrency(
                    precoSessao
                  )} × ${numeroSessoes} sessões`}
                  icon={DollarSign}
                  variant="green"
                />

                <ResultCard
                  title="Custo Total Variável"
                  value={formatCurrency(simulationResult.custoTotalVariavel)}
                  subtitle={`${formatCurrency(
                    simulationResult.custoVariavelPorSessao
                  )} × ${numeroSessoes} sessões`}
                  icon={TrendingDown}
                  variant="orange-dark"
                />

                <ResultCard
                  title="Margem de Contribuição"
                  value={formatCurrency(simulationResult.margemContribuicao)}
                  subtitle="Lucro total do procedimento"
                  icon={Target}
                  variant="blue"
                  trend="up"
                />

                <ResultCard
                  title="Margem por Sessão"
                  value={formatCurrency(simulationResult.margemPorSessao)}
                  subtitle="Lucro líquido unitário"
                  icon={Percent}
                  variant="purple"
                />

                <ResultCard
                  title="Margem de Contribuição %"
                  value={formatPercentage(simulationResult.margemPercentual)}
                  subtitle="Percentual de lucro por sessão"
                  icon={TrendingUp}
                  variant="green"
                />

                <ResultCard
                  title="Lucro por Hora"
                  value={formatCurrency(simulationResult.lucroPorHora)}
                  subtitle={`${simulationResult.tempoTotalHoras.toFixed(
                    1
                  )}h de trabalho total`}
                  icon={Clock}
                  variant="orange"
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border-2 border-dashed border-careflow-gray-300 p-6 sm:p-12 text-center">
              <div className="bg-gradient-to-r from-careflow-purple to-careflow-pink p-3 sm:p-4 rounded-full w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 flex items-center justify-center">
                <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-careflow-gray-900 mb-2">
                Aguardando Simulação
              </h3>
              <p className="text-careflow-gray-600 text-sm sm:text-base">
                Selecione um procedimento e preencha os valores para ver os
                resultados da margem de contribuição.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
