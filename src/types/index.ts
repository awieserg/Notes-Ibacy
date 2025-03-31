export interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  classe: string;
  dateNaissance: string;
}

export interface Enseignant {
  id: string;
  nom: string;
  prenom: string;
  matieres: string[];
}

export interface Cours {
  id: string;
  nom: string;
  description: string;
  matiereNom: string;
  coefficient: number;
  heures?: number;
  enseignantId: string;
}

export interface Note {
  id: string;
  etudiantId: string;
  coursId: string;
  valeur: number;
  semestre: 1 | 2;
  appreciation?: string;
}