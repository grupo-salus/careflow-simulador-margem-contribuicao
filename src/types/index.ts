export interface Insumo {
  nome: string;
  valor: number;
}

export interface Procedure {
  id: number;
  nome: string;
  precoSugerido: number;
  numeroSessoes: number;
  tempoSessaoMin: number;
  custoProfissionalPorSessao: number;
  insumos: Insumo[];
}

export interface SimulationInput {
  precoSessao: number;
  numeroSessoes: number;
  insumos: Insumo[];
  tempoSessaoMin: number;
  custoProfissionalPorSessao: number;
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
