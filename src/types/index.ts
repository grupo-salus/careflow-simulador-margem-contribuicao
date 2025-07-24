export interface Insumo {
  nome: string;
  valor: number;
}

export interface Procedure {
  id: string;
  nome: string;
  precoSugerido: number;
  numeroSessoes: number;
  tempoSessaoMin: number;
  insumos: Insumo[];
}

export interface SimulationInput {
  precoSessao: number;
  numeroSessoes: number;
  insumos: Insumo[];
  tempoSessaoMin: number;
}

export interface SimulationResult {
  receitaTotal: number;
  custoTotalVariavel: number;
  margemContribuicao: number;
  margemPercentual: number;
  margemPorSessao: number;
  tempoTotalHoras: number;
  lucroPorHora: number;
  custoVariavelPorSessao: number;
}