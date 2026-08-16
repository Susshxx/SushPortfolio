import { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { getAllProjects, addProject, updateProject, deleteProject } from '../../lib/projectService';

type Project = {
  id?: string;
  eyebrow?: string;
  title: string;
  description: string;
  tech: string[];
  link?: { label: string; href: string; icon: 'external' | 'github' };
  note?: string;
  imageUrl?: string;
  order?: number;
};

export function ProjectsTab() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingProject({
      title: '',
      description: '',
      tech: [],
    });
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject({ ...project });
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      await loadProjects();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;
    try {
      if (editingProject.id) {
        await updateProject(editingProject.id, editingProject);
      } else {
        await addProject(editingProject);
      }
      await loadProjects();
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  if (showForm && editingProject) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{editingProject.id ? 'Edit' : 'Add'} Project</h2>
          <button onClick={() => { setShowForm(false); setEditingProject(null); }} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={editingProject.title}
              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies (comma-separated) *</label>
            <input
              type="text"
              value={editingProject.tech.join(', ')}
              onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value.split(',').map(t => t.trim()) })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Eyebrow</label>
            <input
              type="text"
              value={editingProject.eyebrow || ''}
              onChange={(e) => setEditingProject({ ...editingProject, eyebrow: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link URL</label>
            <input
              type="url"
              value={editingProject.link?.href || ''}
              onChange={(e) => setEditingProject({ 
                ...editingProject, 
                link: e.target.value ? { label: editingProject.link?.label || 'Live Demo', href: e.target.value, icon: editingProject.link?.icon || 'external' } : undefined 
              })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              type="url"
              value={editingProject.imageUrl || ''}
              onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Display Order (lower number = shown first)</label>
            <input
              type="number"
              value={editingProject.order || ''}
              onChange={(e) => setEditingProject({ ...editingProject, order: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
              <SaveIcon className="h-4 w-4 inline mr-2" />
              Save
            </button>
            <button onClick={() => { setShowForm(false); setEditingProject(null); }} className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
          <PlusIcon className="h-4 w-4 inline mr-2" />
          Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No projects yet</div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <div className="flex gap-2 mt-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs bg-gray-100 px-2 py-1 rounded">{t}</span>
                  ))}
                </div>
                {project.order !== undefined && (
                  <span className="text-xs text-gray-500 mt-2 block">Order: {project.order}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <EditIcon className="h-4 w-4 text-blue-600" />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <TrashIcon className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
