import { SimulationInput, SimulationResult } from '../types';

export function calcularMargemContribuicao(input: SimulationInput): SimulationResult {
  const { precoSessao, numeroSessoes, insumos, tempoSessaoMin } = input;
  
  // Validação básica
  if (precoSessao <= 0 || numeroSessoes <= 0 || tempoSessaoMin <= 0) {
    throw new Error('Todos os valores devem ser maiores que zero');
  }

  // Cálculo do custo variável por sessão
  const custoVariavelPorSessao = insumos.reduce((total, insumo) => total + insumo.valor, 0);
  
  // Cálculos principais
  const receitaTotal = precoSessao * numeroSessoes;
  const custoTotalVariavel = custoVariavelPorSessao * numeroSessoes;
  const margemContribuicao = receitaTotal - custoTotalVariavel;
  const margemPercentual = receitaTotal > 0 ? (margemContribuicao / receitaTotal) * 100 : 0;
  const margemPorSessao = numeroSessoes > 0 ? margemContribuicao / numeroSessoes : 0;
  const tempoTotalHoras = (numeroSessoes * tempoSessaoMin) / 60;
  const lucroPorHora = tempoTotalHoras > 0 ? margemContribuicao / tempoTotalHoras : 0;

  return {
    receitaTotal,
    custoTotalVariavel,
    margemContribuicao,
    margemPercentual,
    margemPorSessao,
    tempoTotalHoras,
    lucroPorHora,
    custoVariavelPorSessao
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(value / 100);
}