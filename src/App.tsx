import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock, Target, Percent } from 'lucide-react';
import { ProcedureSelector } from './components/ProcedureSelector';
import { SimulationForm } from './components/SimulationForm';
import { ResultCard } from './components/ResultCard';
import { calcularMargemContribuicao, formatCurrency, formatPercentage } from './services/marginCalculator';
import { Procedure } from './types';
import proceduresData from './data/procedures.json';

function App() {
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);
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
        tempoSessaoMin: selectedProcedure.tempoSessaoMin
      });
    } catch (error) {
      console.error('Erro no cálculo:', error);
      return null;
    }
  }, [selectedProcedure, precoSessao, numeroSessoes]);

  const hasValidSimulation = simulationResult !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img 
                src="https://careflowsb.wetoksoft.com.br/images/careflow.png" 
                alt="Careflow Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-careflow-gray-900">Simulador de Margem de Contribuição</h1>
                <p className="text-sm text-careflow-gray-600">Careflow - Gestão Estética</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6">
              <ProcedureSelector
                procedures={procedures}
                selectedProcedure={selectedProcedure}
                onProcedureSelect={setSelectedProcedure}
              />
            </div>
            
            <SimulationForm
              selectedProcedure={selectedProcedure}
              precoSessao={precoSessao}
              numeroSessoes={numeroSessoes}
              onPrecoSessaoChange={setPrecoSessao}
              onNumeroSessoesChange={setNumeroSessoes}
              custoVariavelPorSessao={simulationResult?.custoVariavelPorSessao || 0}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2">
            {hasValidSimulation ? (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="icon-box-blue">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-careflow-gray-900">Resultados da Simulação</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <ResultCard
                    title="Margem de Contribuição"
                    value={formatCurrency(simulationResult.margemContribuicao)}
                    subtitle={`${formatPercentage(simulationResult.margemPercentual)} da receita`}
                    icon={Target}
                    variant="blue"
                    trend="up"
                  />
                  
                  <ResultCard
                    title="Receita Total"
                    value={formatCurrency(simulationResult.receitaTotal)}
                    subtitle={`${formatCurrency(precoSessao)} × ${numeroSessoes} sessões`}
                    icon={DollarSign}
                    variant="green"
                  />
                  
                  <ResultCard
                    title="Margem por Sessão"
                    value={formatCurrency(simulationResult.margemPorSessao)}
                    subtitle="Lucro líquido unitário"
                    icon={Percent}
                    variant="purple"
                  />
                  
                  <ResultCard
                    title="Lucro por Hora"
                    value={formatCurrency(simulationResult.lucroPorHora)}
                    subtitle={`${simulationResult.tempoTotalHoras.toFixed(1)}h de trabalho total`}
                    icon={Clock}
                    variant="orange"
                  />
                  
                  <div className="sm:col-span-2 lg:col-span-2">
                    <div className="bg-white rounded-lg border border-careflow-gray-200 shadow-card p-6">
                      <h3 className="text-lg font-semibold text-careflow-gray-900 mb-4">Resumo Executivo</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-careflow-gray-600">Custo Total Variável:</span>
                          <p className="font-semibold text-red-600">{formatCurrency(simulationResult.custoTotalVariavel)}</p>
                        </div>
                        <div>
                          <span className="text-careflow-gray-600">Margem %:</span>
                          <p className="font-semibold text-green-600">{formatPercentage(simulationResult.margemPercentual)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg border-2 border-dashed border-careflow-gray-300 p-12 text-center">
                <Calculator className="w-16 h-16 text-careflow-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-careflow-gray-900 mb-2">Aguardando Simulação</h3>
                <p className="text-careflow-gray-600">
                  Selecione um procedimento e preencha os valores para ver os resultados da margem de contribuição.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;