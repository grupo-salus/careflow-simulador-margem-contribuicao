import React, { useState, useMemo, useEffect, useRef } from 'react';
import { List } from 'lucide-react';
import { Procedure } from '../types';
import { SearchInput } from './SearchInput';
import { ProcedureSelectionModal } from './ProcedureSelectionModal';

interface ProcedureSelectorProps {
  procedures: Procedure[];
  selectedProcedure: Procedure | null;
  onProcedureSelect: (procedure: Procedure | null) => void;
}

export function ProcedureSelector({ procedures, selectedProcedure, onProcedureSelect }: ProcedureSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filtrar procedimentos baseado no termo de busca
  const filteredProcedures = useMemo(() => {
    if (!searchTerm.trim()) return procedures.slice(0, 5); // Mostrar apenas os primeiros 5 quando não há busca
    
    return procedures.filter(procedure =>
      procedure.nome.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8); // Limitar a 8 resultados no dropdown
  }, [procedures, searchTerm]);

  // Mostrar dropdown quando há busca ou quando o campo está focado
  useEffect(() => {
    if (searchTerm.trim()) {
      setShowDropdown(true);
    } else if (showDropdown && !searchTerm.trim()) {
      setShowDropdown(false);
    }
  }, [searchTerm, showDropdown]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProcedureSelect = (procedure: Procedure) => {
    onProcedureSelect(procedure);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleModalSelect = (procedure: Procedure) => {
    onProcedureSelect(procedure);
    setIsModalOpen(false);
  };

  const handleSearchFocus = () => {
    setShowDropdown(true);
  };

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-lg font-semibold text-careflow-gray-900 mb-6">
        Selecione o Procedimento
      </h3>
      
      <div className="flex-1 space-y-2">
        {/* Campo de busca */}
        <div className="relative" ref={searchRef}>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            onFocus={handleSearchFocus}
            placeholder="Buscar procedimentos..."
            className="mb-0"
          />
          
          {/* Dropdown de resultados */}
          {showDropdown && searchTerm.trim() && filteredProcedures.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-careflow-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredProcedures.map((procedure) => (
                <div
                  key={procedure.id}
                  onClick={() => handleProcedureSelect(procedure)}
                  className="px-4 py-3 hover:bg-careflow-gray-50 cursor-pointer border-b border-careflow-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-careflow-gray-900">{procedure.nome}</div>
                  <div className="text-sm text-careflow-gray-600">
                    {procedure.numeroSessoes} sessões • {procedure.tempoSessaoMin} min
                  </div>
                </div>
              ))}
              
              {procedures.length > filteredProcedures.length && (
                <div className="px-4 py-3 bg-careflow-gray-50 border-t border-careflow-gray-200">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-careflow-primary hover:text-careflow-primary-dark font-medium text-sm"
                  >
                    Ver todos os procedimentos ({procedures.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botão para abrir modal */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-careflow-gray-50 border border-careflow-gray-300 rounded-lg hover:bg-careflow-gray-100 transition-colors text-careflow-gray-700"
        >
          <List className="w-4 h-4" />
          Ver todos os procedimentos
        </button>

        {/* Procedimento selecionado */}
        {selectedProcedure && (
          <div className="mt-4 p-4 bg-careflow-primary bg-opacity-5 border border-careflow-primary border-opacity-20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-careflow-gray-900">{selectedProcedure.nome}</h4>
                <p className="text-sm text-careflow-gray-600">
                  {selectedProcedure.numeroSessoes} sessões • {selectedProcedure.tempoSessaoMin} min/sessão
                </p>
              </div>
              <button
                onClick={() => onProcedureSelect(null)}
                className="p-1.5 text-careflow-error hover:text-white hover:bg-careflow-error rounded-full transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de seleção */}
      <ProcedureSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        procedures={procedures}
        selectedProcedure={selectedProcedure}
        onProcedureSelect={handleModalSelect}
      />
    </div>
  );
}