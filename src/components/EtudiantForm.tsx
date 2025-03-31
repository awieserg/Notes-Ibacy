import React, { useState } from 'react';
import { Save } from 'lucide-react';

interface EtudiantFormProps {
  onSubmit: (etudiant: Omit<Etudiant, "id">) => void;
  initialData?: Etudiant;
}

export function EtudiantForm({ onSubmit, initialData }: EtudiantFormProps) {
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    prenom: initialData?.prenom || '',
    classe: initialData?.classe || '1',
    dateNaissance: initialData?.dateNaissance || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({ nom: '', prenom: '', classe: '1', dateNaissance: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom
          </label>
          <input
            type="text"
            id="nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="classe" className="block text-sm font-medium text-gray-700">
            Classe
          </label>
          <select
            id="classe"
            value={formData.classe}
            onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="1">1ère année</option>
            <option value="2">2ème année</option>
            <option value="3">3ème année</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">
            Date de naissance
          </label>
          <input
            type="date"
            id="dateNaissance"
            value={formData.dateNaissance}
            onChange={(e) => setFormData({ ...formData, dateNaissance: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <Save className="w-4 h-4 mr-2" />
          {initialData ? 'Mettre à jour' : 'Enregistrer'}
        </button>
      </div>
    </form>
  );
}