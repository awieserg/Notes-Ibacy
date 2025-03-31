import React, { useState } from 'react';
import { Trash2, MoreVertical, Pencil, GraduationCap } from 'lucide-react';

interface EtudiantListProps {
  etudiants: Etudiant[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  onSelectEtudiant: (id: string | null) => void;
}

export function EtudiantList({ etudiants, onDelete, onEdit, onSelectEtudiant }: EtudiantListProps) {
  const [showActions, setShowActions] = useState<string | null>(null);
  const [selectedEtudiant, setSelectedEtudiant] = useState<string | null>(null);

  const handleSelectEtudiant = (id: string) => {
    const newSelectedId = selectedEtudiant === id ? null : id;
    setSelectedEtudiant(newSelectedId);
    onSelectEtudiant(newSelectedId);
  };

  return (
    <div className="mt-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de naissance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {etudiants.map((etudiant) => (
              <tr 
                key={etudiant.id} 
                className={`hover:bg-gray-50 ${selectedEtudiant === etudiant.id ? 'bg-green-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">{etudiant.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{etudiant.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{etudiant.classe}ème année</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(etudiant.dateNaissance).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleSelectEtudiant(etudiant.id)}
                      className={`relative group flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
                        selectedEtudiant === etudiant.id
                          ? 'bg-green-600 text-white shadow-lg scale-105'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      <GraduationCap className={`w-5 h-5 ${
                        selectedEtudiant === etudiant.id ? 'animate-bounce' : ''
                      }`} />
                      <span className={`ml-2 font-medium ${
                        selectedEtudiant === etudiant.id ? '' : 'group-hover:underline'
                      }`}>
                        Notes
                      </span>
                      {selectedEtudiant !== etudiant.id && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                      )}
                    </button>
                    <div className="relative">
                      <button
                        onClick={() => setShowActions(showActions === etudiant.id ? null : etudiant.id)}
                        className="p-2 rounded-md hover:bg-gray-100"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-500" />
                      </button>
                      
                      {showActions === etudiant.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => {
                                onEdit(etudiant.id);
                                setShowActions(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              <Pencil className="w-4 h-4 mr-2" />
                              Modifier
                            </button>
                            <button
                              onClick={() => {
                                onDelete(etudiant.id);
                                setShowActions(null);
                              }}
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}