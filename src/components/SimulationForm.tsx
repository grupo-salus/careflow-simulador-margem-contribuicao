import React from "react";
import { Procedure } from "../types";
import { InputField } from "./InputField";

interface SimulationFormProps {
  selectedProcedure: Procedure | null;
  precoSessao: number;
  numeroSessoes: number;
  onPrecoSessaoChange: (value: number) => void;
  onNumeroSessoesChange: (value: number) => void;
}

export function SimulationForm({
  selectedProcedure,
  precoSessao,
  numeroSessoes,
  onPrecoSessaoChange,
  onNumeroSessoesChange,
}: SimulationFormProps) {
  if (!selectedProcedure) {
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-careflow-gray-50 border-2 border-dashed border-careflow-gray-300 rounded-lg p-6 text-center w-full max-w-xs mx-auto">
            <p className="text-careflow-gray-500 text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
              Selecione um procedimento
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-4">
          <InputField
            label="Preço por Sessão"
            value={precoSessao}
            onChange={onPrecoSessaoChange}
            placeholder="Ex: 120,00"
            prefix="R$"
            type="currency"
            step={0.01}
          />

          <InputField
            label="Número de Sessões"
            value={numeroSessoes}
            onChange={onNumeroSessoesChange}
            placeholder="Ex: 8"
            suffix="sessões"
            type="number"
            min={1}
          />
        </div>
      </div>

      <div className="compact-footer">
        <div className="compact-footer-content">
          <span className="compact-footer-label text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
            Tempo por sessão:
          </span>
          <span className="compact-footer-value text-[0.75rem] sm:text-[0.875rem] lg:text-[0.8125rem] xl:text-[0.875rem]">
            {selectedProcedure.tempoSessaoMin} minutos
          </span>
        </div>
      </div>
    </div>
  );
}
