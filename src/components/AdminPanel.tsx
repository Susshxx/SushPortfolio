import { useState, useEffect } from 'react';
import { XIcon, PlusIcon, EditIcon, TrashIcon, SaveIcon } from 'lucide-react';

const ADMIN_PASSWORD = 'Sushhora';

type Project = {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  tech: string[];
  link?: { label: string; href: string; icon: 'external' | 'github' };
  note?: string;
  liveUrl?: string;
  imageUrl?: string;
};

type AdminPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isOpen && authenticated) {
      loadProjects();
    }
  }, [isOpen, authenticated]);

  const loadProjects = () => {
    const stored = localStorage.getItem('portfolio_projects');
    if (stored) {
      setProjects(JSON.parse(stored));
    }
  };

  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const handleAddNew = () => {
    setEditingProject({
      id: Date.now().toString(),
      title: '',
      description: '',
      tech: [],
      eyebrow: '',
      note: '',
      liveUrl: '',
      imageUrl: '',
    });
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      saveProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleSave = () => {
    if (!editingProject) return;

    const existing = projects.find((p) => p.id === editingProject.id);
    if (existing) {
      saveProjects(projects.map((p) => (p.id === editingProject.id ? editingProject : p)));
    } else {
      saveProjects([...projects, editingProject]);
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 overflow-y-auto cursor-default">
      <div className={`relative w-full my-auto rounded-xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col cursor-default ${
        authenticated ? 'max-w-4xl' : 'max-w-md'
      }`}>
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white p-6 z-10">
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100 cursor-pointer"
            aria-label="Close admin panel"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 cursor-default">
          {!authenticated ? (
            <form onSubmit={handleLogin} className="mx-auto max-w-md space-y-4">
              <div>
                <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Admin Password
                </label>
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 cursor-text"
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 cursor-pointer"
              >
                Login
              </button>
            </form>
          ) : showForm && editingProject ? (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">
                {projects.find((p) => p.id === editingProject.id) ? 'Edit Project' : 'Add New Project'}
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eyebrow (Optional)</label>
                <input
                  type="text"
                  value={editingProject.eyebrow || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, eyebrow: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  placeholder="Featured Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  placeholder="Project Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  rows={3}
                  placeholder="Project description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma-separated) *</label>
                <input
                  type="text"
                  value={editingProject.tech.join(', ')}
                  onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(t => t.trim()) })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                <input
                  type="url"
                  value={editingProject.link?.href || ''}
                  onChange={(e) => setEditingProject({ 
                    ...editingProject, 
                    link: e.target.value ? { 
                      label: editingProject.link?.label || 'Live Demo', 
                      href: e.target.value, 
                      icon: editingProject.link?.icon || 'external' 
                    } : undefined 
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  placeholder="https://example.com"
                />
                <p className="text-xs text-gray-500 mt-1">URL for the "Live Demo" or "GitHub" button</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Label</label>
                <input
                  type="text"
                  value={editingProject.link?.label || ''}
                  onChange={(e) => setEditingProject({ 
                    ...editingProject, 
                    link: editingProject.link ? { ...editingProject.link, label: e.target.value } : undefined 
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  placeholder="Live Demo"
                />
                <p className="text-xs text-gray-500 mt-1">Button text (e.g., "Live Demo", "View Project")</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Type</label>
                <select
                  value={editingProject.link?.icon || 'external'}
                  onChange={(e) => setEditingProject({ 
                    ...editingProject, 
                    link: editingProject.link ? { ...editingProject.link, icon: e.target.value as 'external' | 'github' } : undefined 
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-pointer"
                >
                  <option value="external">External Link</option>
                  <option value="github">GitHub</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Icon to display next to the button</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Image URL</label>
                <input
                  type="url"
                  value={editingProject.imageUrl || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  placeholder="https://example.com/project-image.png"
                />
                <p className="text-xs text-gray-500 mt-1">Image/logo to display in the project card</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                <input
                  type="text"
                  value={editingProject.note || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, note: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 cursor-text"
                  placeholder="Personal Project"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 cursor-pointer"
                >
                  <SaveIcon className="h-4 w-4" />
                  Save Project
                </button>
                <button
                  onClick={handleCancel}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold">Manage Projects</h3>
                <button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 cursor-pointer"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add New Project
                </button>
              </div>

              <div className="space-y-4">
                {projects.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No custom projects yet. Add your first project!</p>
                ) : (
                  projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {project.eyebrow && (
                            <p className="text-xs text-blue-600 font-medium mb-1">{project.eyebrow}</p>
                          )}
                          <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {project.tech.map((t) => (
                              <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(project)}
                            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                            aria-label="Edit project"
                          >
                            <EditIcon className="h-4 w-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                            aria-label="Delete project"
                          >
                            <TrashIcon className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
