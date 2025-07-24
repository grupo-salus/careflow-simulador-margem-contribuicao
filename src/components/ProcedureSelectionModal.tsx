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

  // Filtrar procedimentos baseado no termo de busca
  const filteredProcedures = useMemo(() => {
    if (!searchTerm.trim()) return procedures;

    return procedures.filter((procedure) =>
      procedure.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [procedures, searchTerm]);

  // Calcular paginação
  const totalPages = Math.ceil(filteredProcedures.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProcedures = filteredProcedures.slice(startIndex, endIndex);

  // Resetar página quando mudar a busca
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
      <div className="space-y-6">
        {/* Busca */}
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar procedimentos..."
          className="mb-4"
        />

        {/* Resultados da busca */}
        <div className="text-sm text-careflow-gray-600 mb-4">
          {filteredProcedures.length === procedures.length
            ? `${procedures.length} procedimentos disponíveis`
            : `${filteredProcedures.length} de ${procedures.length} procedimentos encontrados`}
        </div>

        {/* Tabela de procedimentos */}
        {currentProcedures.length > 0 ? (
          <div className="overflow-x-auto">
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
                    custoTotalInsumos + procedure.custoProfissionalPorSessao;
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
                        {formatCurrency(procedure.custoProfissionalPorSessao)}
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
        ) : (
          <div className="text-center py-12">
            <div className="text-careflow-gray-400 mb-2">
              <svg
                className="w-12 h-12 mx-auto"
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
            <p className="text-careflow-gray-600">
              {searchTerm
                ? "Nenhum procedimento encontrado para sua busca."
                : "Nenhum procedimento disponível."}
            </p>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="border-t border-careflow-gray-200 pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredProcedures.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}
