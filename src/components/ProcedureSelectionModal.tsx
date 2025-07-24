import React, { useState, useMemo } from "react";
import { Procedure } from "../types";
import { Modal } from "./Modal";
import { SearchInput } from "./SearchInput";
import { Pagination } from "./Pagination";
import { formatCurrency } from "../services/marginCalculator";

interface ProcedureSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  procedures: Procedure[];
  selectedProcedure: Procedure | null;
  onProcedureSelect: (procedure: Procedure) => void;
}

export function ProcedureSelectionModal({
  isOpen,
  onClose,
  procedures,
  selectedProcedure,
  onProcedureSelect,
}: ProcedureSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProcedures = useMemo(() => {
    let filtered = procedures;

    if (searchTerm.trim()) {
      filtered = procedures.filter((procedure) =>
        procedure.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  }, [procedures, searchTerm]);

  const totalPages = Math.ceil(filteredProcedures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProcedures = filteredProcedures.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleProcedureSelect = (procedure: Procedure) => {
    onProcedureSelect(procedure);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Selecionar Procedimento"
      size="lg"
    >
      <div className="h-full flex flex-col">
        {/* Cabeçalho com a Busca (conteúdo fixo) */}
        <div className="mb-4 flex-shrink-0">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar procedimentos..."
            className="mb-4"
          />
          <div className="text-xs sm:text-sm text-careflow-gray-600">
            {filteredProcedures.length === procedures.length
              ? `${procedures.length} procedimentos disponíveis`
              : `${filteredProcedures.length} de ${procedures.length} procedimentos encontrados`}
          </div>
        </div>

        {/* Conteúdo principal scrollável */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {currentProcedures.length > 0 ? (
            <div className="overflow-x-auto">
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-careflow-gray-50 border-b border-careflow-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-careflow-gray-700 text-sm">
                        Procedimento
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-careflow-gray-700 text-sm">
                        Preço Sugerido
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-careflow-gray-700 text-sm">
                        Sessões
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-careflow-gray-700 text-sm">
                        Tempo/Sessão
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-careflow-gray-700 text-sm">
                        Custo Profissional
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-careflow-gray-700 text-sm">
                        Custo/Sessão
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-careflow-gray-700 text-sm">
                        Ação
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProcedures.map((procedure) => {
                      const custoTotalInsumos = procedure.insumos.reduce(
                        (total, insumo) => total + insumo.valor,
                        0
                      );
                      const custoTotalPorSessao =
                        custoTotalInsumos +
                        procedure.custoProfissionalPorSessao;
                      const isSelected = selectedProcedure?.id === procedure.id;

                      return (
                        <tr
                          key={procedure.id}
                          className={`border-b border-careflow-gray-100 hover:bg-careflow-gray-50 transition-colors ${
                            isSelected ? "bg-careflow-primary bg-opacity-5" : ""
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div>
                              <div
                                className={`font-medium text-sm ${
                                  isSelected
                                    ? "text-careflow-primary"
                                    : "text-careflow-gray-900"
                                }`}
                              >
                                {procedure.nome}
                              </div>
                              {isSelected && (
                                <div className="text-xs text-careflow-primary font-medium mt-1">
                                  ✓ Selecionado
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-careflow-gray-700">
                            {formatCurrency(procedure.precoSugerido)}
                          </td>
                          <td className="py-3 px-4 text-sm text-careflow-gray-700">
                            {procedure.numeroSessoes}
                          </td>
                          <td className="py-3 px-4 text-sm text-careflow-gray-700">
                            {procedure.tempoSessaoMin} min
                          </td>
                          <td className="py-3 px-4 text-sm text-careflow-gray-700">
                            {formatCurrency(
                              procedure.custoProfissionalPorSessao
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-careflow-gray-700">
                            {formatCurrency(custoTotalPorSessao)}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleProcedureSelect(procedure)}
                              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                isSelected
                                  ? "bg-careflow-primary text-white"
                                  : "bg-careflow-gray-100 text-careflow-gray-700 hover:bg-careflow-gray-200"
                              }`}
                            >
                              {isSelected ? "Selecionado" : "Selecionar"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-3">
                {currentProcedures.map((procedure) => {
                  const custoTotalInsumos = procedure.insumos.reduce(
                    (total, insumo) => total + insumo.valor,
                    0
                  );
                  const custoTotalPorSessao =
                    custoTotalInsumos + procedure.custoProfissionalPorSessao;
                  const isSelected = selectedProcedure?.id === procedure.id;

                  return (
                    <div
                      key={procedure.id}
                      className={`border border-careflow-gray-200 rounded-lg p-4 ${
                        isSelected
                          ? "bg-careflow-primary bg-opacity-5 border-careflow-primary"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3
                            className={`font-medium text-sm ${
                              isSelected
                                ? "text-careflow-primary"
                                : "text-careflow-gray-900"
                            } break-words`}
                          >
                            {procedure.nome}
                          </h3>
                          {isSelected && (
                            <div className="text-xs text-careflow-primary font-medium mt-1">
                              ✓ Selecionado
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => handleProcedureSelect(procedure)}
                          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex-shrink-0 ml-2 ${
                            isSelected
                              ? "bg-careflow-primary text-white"
                              : "bg-careflow-gray-100 text-careflow-gray-700 hover:bg-careflow-gray-200"
                          }`}
                        >
                          {isSelected ? "Selecionado" : "Selecionar"}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-careflow-gray-600">Preço:</span>
                          <div className="font-medium text-careflow-gray-900">
                            {formatCurrency(procedure.precoSugerido)}
                          </div>
                        </div>
                        <div>
                          <span className="text-careflow-gray-600">
                            Sessões:
                          </span>
                          <div className="font-medium text-careflow-gray-900">
                            {procedure.numeroSessoes}
                          </div>
                        </div>
                        <div>
                          <span className="text-careflow-gray-600">Tempo:</span>
                          <div className="font-medium text-careflow-gray-900">
                            {procedure.tempoSessaoMin} min
                          </div>
                        </div>
                        <div>
                          <span className="text-careflow-gray-600">
                            Custo/Sessão:
                          </span>
                          <div className="font-medium text-careflow-gray-900">
                            {formatCurrency(custoTotalPorSessao)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 sm:py-12">
              <div className="text-careflow-gray-400 mb-2">
                <svg
                  className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <p className="text-careflow-gray-600 text-sm sm:text-base">
                {searchTerm
                  ? "Nenhum procedimento encontrado para sua busca."
                  : "Nenhum procedimento disponível."}
              </p>
            </div>
          )}
        </div>

        {/* Rodapé com a Paginação (conteúdo fixo) */}
        <div className="border-t border-careflow-gray-200 pt-4 mt-auto flex-shrink-0">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredProcedures.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </Modal>
  );
}
