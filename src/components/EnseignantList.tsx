import React, { useState } from 'react';
import { Trash2, MoreVertical, Pencil } from 'lucide-react';

interface EnseignantListProps {
  enseignants: Enseignant[];
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function EnseignantList({ enseignants, onDelete, onEdit }: EnseignantListProps) {
  const [showActions, setShowActions] = useState<string | null>(null);

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
                Matières
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enseignants.map((enseignant) => (
              <tr key={enseignant.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{enseignant.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{enseignant.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {enseignant.matieres.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => setShowActions(showActions === enseignant.id ? null : enseignant.id)}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    
                    {showActions === enseignant.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onEdit(enseignant.id);
                              setShowActions(null);
                            }}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            Modifier
                          </button>
                          <button
                            onClick={() => {
                              onDelete(enseignant.id);
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}