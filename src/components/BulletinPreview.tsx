import React from 'react';
import { X } from 'lucide-react';

interface BulletinPreviewProps {
  etudiant: Etudiant;
  cours: Cours[];
  notes: Note[];
  enseignants: Enseignant[];
  onClose: () => void;
}

export function BulletinPreview({ etudiant, cours, notes, enseignants, onClose }: BulletinPreviewProps) {
  const etudiantNotes = notes.filter(note => note.etudiantId === etudiant.id);
  
  const getEnseignantNom = (enseignantId: string) => {
    const enseignant = enseignants.find(e => e.id === enseignantId);
    return enseignant ? `${enseignant.prenom} ${enseignant.nom}` : 'Non assigné';
  };

  const calculerMoyenne = (semestre: 1 | 2) => {
    const semestreNotes = etudiantNotes.filter(note => note.semestre === semestre);
    if (semestreNotes.length === 0) return 0;

    let totalPoints = 0;
    let totalCoefficients = 0;

    semestreNotes.forEach(note => {
      const coursInfo = cours.find(c => c.id === note.coursId);
      if (coursInfo) {
        totalPoints += note.valeur * coursInfo.coefficient;
        totalCoefficients += coursInfo.coefficient;
      }
    });

    return totalCoefficients > 0 ? +(totalPoints / totalCoefficients).toFixed(2) : 0;
  };

  const moyenne1 = calculerMoyenne(1);
  const moyenne2 = calculerMoyenne(2);
  const moyenneAnnuelle = +((moyenne1 + moyenne2) / 2).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-8" id="bulletin-content">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold text-green-700">Institut Biblique IBACY</h2>
            <p className="text-gray-600">Bulletin de notes - Année académique 2024-2025</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Informations de l'étudiant</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Nom et Prénoms:</p>
              <p className="font-medium">{etudiant.prenom} {etudiant.nom}</p>
            </div>
            <div>
              <p className="text-gray-600">Classe:</p>
              <p className="font-medium">{etudiant.classe}ème année</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Relevé de notes</h3>
          
          {[1, 2].map((semestre) => (
            <div key={semestre} className="mb-6">
              <h4 className="text-lg font-medium mb-3">{semestre === 1 ? 'Premier' : 'Deuxième'} semestre</h4>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Matière</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Enseignant</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Coefficient</th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Note/20</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {etudiantNotes
                    .filter(note => note.semestre === semestre)
                    .map((note) => {
                      const coursInfo = cours.find(c => c.id === note.coursId);
                      return (
                        <tr key={note.id}>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900">{coursInfo?.nom}</div>
                              <div className="text-sm text-gray-500">{coursInfo?.matiereNom}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {coursInfo && getEnseignantNom(coursInfo.enseignantId)}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-gray-500">
                            {coursInfo?.coefficient}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className="font-medium">{note.valeur}</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right font-medium">
                      Moyenne du semestre:
                    </td>
                    <td className="px-6 py-4 text-center font-bold">
                      {semestre === 1 ? moyenne1 : moyenne2}/20
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ))}

          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h4 className="text-lg font-semibold text-green-700 mb-2">Résultats annuels</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Moyenne 1er semestre</p>
                <p className="text-xl font-bold text-gray-900">{moyenne1}/20</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Moyenne 2ème semestre</p>
                <p className="text-xl font-bold text-gray-900">{moyenne2}/20</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Moyenne annuelle</p>
                <p className="text-xl font-bold text-green-700">{moyenneAnnuelle}/20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}