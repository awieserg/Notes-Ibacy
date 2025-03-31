import React, { useState } from 'react';
import { School, Users, BookOpen, GraduationCap, Menu, X, Plus, Settings, User } from 'lucide-react';
import { EtudiantForm } from './components/EtudiantForm';
import { EtudiantList } from './components/EtudiantList';
import { EnseignantForm } from './components/EnseignantForm';
import { EnseignantList } from './components/EnseignantList';
import { CoursForm } from './components/CoursForm';
import { CoursList } from './components/CoursList';
import { BulletinList } from './components/BulletinList';
import { NotesTable } from './components/NotesTable';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [activeTab, setActiveTab] = useState('etudiants');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<{ id: string; type: 'etudiant' | 'enseignant' | 'cours' } | null>(null);
  const [etudiants, setEtudiants] = useLocalStorage<Etudiant[]>('etudiants', []);
  const [enseignants, setEnseignants] = useLocalStorage<Enseignant[]>('enseignants', []);
  const [cours, setCours] = useLocalStorage<Cours[]>('cours', []);
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedEtudiantId, setSelectedEtudiantId] = useState<string | null>(null);

  const handleAddEtudiant = (newEtudiant: Omit<Etudiant, "id">) => {
    if (editingItem?.type === 'etudiant') {
      setEtudiants(etudiants.map(e => e.id === editingItem.id ? { ...newEtudiant, id: editingItem.id } : e));
      setEditingItem(null);
    } else {
      const etudiant = {
        ...newEtudiant,
        id: crypto.randomUUID(),
      };
      setEtudiants([...etudiants, etudiant]);
    }
    setShowForm(false);
  };

  const handleAddEnseignant = (newEnseignant: Omit<Enseignant, "id">) => {
    if (editingItem?.type === 'enseignant') {
      setEnseignants(enseignants.map(e => e.id === editingItem.id ? { ...newEnseignant, id: editingItem.id } : e));
      setEditingItem(null);
    } else {
      const enseignant = {
        ...newEnseignant,
        id: crypto.randomUUID(),
      };
      setEnseignants([...enseignants, enseignant]);
    }
    setShowForm(false);
  };

  const handleAddCours = (newCours: Omit<Cours, "id">) => {
    if (editingItem?.type === 'cours') {
      setCours(cours.map(c => c.id === editingItem.id ? { ...newCours, id: editingItem.id } : c));
      setEditingItem(null);
    } else {
      const cours = {
        ...newCours,
        id: crypto.randomUUID(),
      };
      setCours(prevCours => [...prevCours, cours]);
    }
    setShowForm(false);
  };

  const handleAddNote = (newNote: Omit<Note, "id">) => {
    const note = {
      ...newNote,
      id: crypto.randomUUID(),
    };
    setNotes(prevNotes => [...prevNotes, note]);
  };

  const handleUpdateNote = (id: string, updatedNote: Omit<Note, "id">) => {
    setNotes(notes.map(note => note.id === id ? { ...updatedNote, id } : note));
  };

  const handleEdit = (id: string, type: 'etudiant' | 'enseignant' | 'cours') => {
    setEditingItem({ id, type });
    setShowForm(true);
  };

  const handleDeleteEtudiant = (id: string) => {
    setEtudiants(etudiants.filter(e => e.id !== id));
    setNotes(notes.filter(n => n.etudiantId !== id));
  };

  const handleDeleteEnseignant = (id: string) => {
    setEnseignants(enseignants.filter(e => e.id !== id));
  };

  const handleDeleteCours = (id: string) => {
    setCours(cours.filter(c => c.id !== id));
    setNotes(notes.filter(n => n.coursId !== id));
  };

  const getInitialData = () => {
    if (!editingItem) return undefined;
    
    switch (editingItem.type) {
      case 'etudiant':
        return etudiants.find(e => e.id === editingItem.id);
      case 'enseignant':
        return enseignants.find(e => e.id === editingItem.id);
      case 'cours':
        return cours.find(c => c.id === editingItem.id);
      default:
        return undefined;
    }
  };

  const navigationItems = [
    { id: 'etudiants', label: 'Étudiants', icon: Users },
    { id: 'enseignants', label: 'Enseignants', icon: School },
    { id: 'cours', label: 'Cours', icon: BookOpen },
    { id: 'bulletins', label: 'Bulletins', icon: GraduationCap },
  ];

  const selectedEtudiant = selectedEtudiantId ? etudiants.find(e => e.id === selectedEtudiantId) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <header className="bg-green-700 text-white shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="px-4 py-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-green-600 transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="ml-4">
            <h1 className="text-2xl font-bold">Gestion IBACY</h1>
            <p className="text-sm text-green-100">Institut Biblique de l'Alliance Chrétienne de Yamoussoukro</p>
          </div>
        </div>
      </header>

      {/* Barre latérale */}
      <aside className={`fixed left-0 top-[73px] bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="p-4 h-full flex flex-col">
          <ul className="space-y-2 flex-grow">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id !== 'etudiants') {
                        setSelectedEtudiantId(null);
                      }
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-50 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
          
          {/* Boutons du bas */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            <button
              onClick={() => setActiveTab('utilisateur')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'utilisateur'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <User className="w-5 h-5 mr-3" />
              Utilisateur
            </button>
            <button
              onClick={() => setActiveTab('parametres')}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                activeTab === 'parametres'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <Settings className="w-5 h-5 mr-3" />
              Paramètres
            </button>
          </div>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className={`pt-[73px] transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeTab === 'etudiants' && !selectedEtudiantId && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Gestion des Étudiants</h2>
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setShowForm(!showForm);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un étudiant
                  </button>
                </div>
                
                {showForm && (
                  <div className="mb-6">
                    <EtudiantForm 
                      onSubmit={handleAddEtudiant}
                      initialData={editingItem?.type === 'etudiant' ? getInitialData() as Etudiant : undefined}
                    />
                  </div>
                )}

                <EtudiantList 
                  etudiants={etudiants}
                  onDelete={handleDeleteEtudiant}
                  onEdit={(id) => handleEdit(id, 'etudiant')}
                  onSelectEtudiant={setSelectedEtudiantId}
                />
              </div>
            )}

            {activeTab === 'etudiants' && selectedEtudiantId && selectedEtudiant && (
              <div>
                <button
                  onClick={() => setSelectedEtudiantId(null)}
                  className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center"
                >
                  ← Retour à la liste
                </button>
                <NotesTable
                  etudiant={selectedEtudiant}
                  cours={cours}
                  notes={notes}
                  onAddNote={handleAddNote}
                  onUpdateNote={handleUpdateNote}
                />
              </div>
            )}

            {activeTab === 'enseignants' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Gestion des Enseignants</h2>
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setShowForm(!showForm);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un enseignant
                  </button>
                </div>

                {showForm && (
                  <div className="mb-6">
                    <EnseignantForm 
                      onSubmit={handleAddEnseignant}
                      initialData={editingItem?.type === 'enseignant' ? getInitialData() as Enseignant : undefined}
                    />
                  </div>
                )}

                <EnseignantList
                  enseignants={enseignants}
                  onDelete={handleDeleteEnseignant}
                  onEdit={(id) => handleEdit(id, 'enseignant')}
                />
              </div>
            )}

            {activeTab === 'cours' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Gestion des Cours</h2>
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setShowForm(!showForm);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un cours
                  </button>
                </div>

                {showForm && (
                  <div className="mb-6">
                    <CoursForm 
                      onSubmit={handleAddCours}
                      enseignants={enseignants}
                      cours={cours}
                      initialData={editingItem?.type === 'cours' ? getInitialData() as Cours : undefined}
                    />
                  </div>
                )}

                <CoursList
                  cours={cours}
                  enseignants={enseignants}
                  onDelete={handleDeleteCours}
                  onEdit={(id) => handleEdit(id, 'cours')}
                />
              </div>
            )}

            {activeTab === 'bulletins' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Édition des Bulletins</h2>
                </div>
                <BulletinList 
                  etudiants={etudiants}
                  cours={cours}
                  enseignants={enseignants}
                  notes={notes}
                />
              </div>
            )}

            {activeTab === 'utilisateur' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Profil Utilisateur</h2>
                <p className="text-gray-600">
                  Gérez votre profil et vos préférences utilisateur.
                </p>
              </div>
            )}

            {activeTab === 'parametres' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Paramètres</h2>
                <p className="text-gray-600">
                  Configurez les paramètres de l'application.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;