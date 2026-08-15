import { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { getAllEducation, addEducation, updateEducation, deleteEducation, type Education } from '../../lib/educationService';

export function EducationTab() {
  const [education, setEducation] = useState<Education[]>([]);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEducation();
  }, []);

  const loadEducation = async () => {
    try {
      setLoading(true);
      const data = await getAllEducation();
      setEducation(data);
    } catch (error) {
      console.error('Failed to load education:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingEducation({
      degree: '',
      school: '',
      period: '',
      description: '',
      order: education.length,
    });
    setShowForm(true);
  };

  const handleEdit = (edu: Education) => {
    setEditingEducation({ ...edu });
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Delete this education entry?')) return;
    try {
      await deleteEducation(id);
      await loadEducation();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSave = async () => {
    if (!editingEducation) return;
    try {
      if (editingEducation.id) {
        await updateEducation(editingEducation.id, editingEducation);
      } else {
        await addEducation(editingEducation);
      }
      await loadEducation();
      setShowForm(false);
      setEditingEducation(null);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  if (showForm && editingEducation) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{editingEducation.id ? 'Edit' : 'Add'} Education</h2>
          <button onClick={() => { setShowForm(false); setEditingEducation(null); }} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Degree *</label>
            <input
              type="text"
              value={editingEducation.degree}
              onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">School/Institution *</label>
            <input
              type="text"
              value={editingEducation.school}
              onChange={(e) => setEditingEducation({ ...editingEducation, school: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Period *</label>
            <input
              type="text"
              value={editingEducation.period}
              onChange={(e) => setEditingEducation({ ...editingEducation, period: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              placeholder="2023 – Present"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              value={editingEducation.description}
              onChange={(e) => setEditingEducation({ ...editingEducation, description: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              rows={3}
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
              <SaveIcon className="h-4 w-4 inline mr-2" />
              Save
            </button>
            <button onClick={() => { setShowForm(false); setEditingEducation(null); }} className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
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
        <h2 className="text-2xl font-semibold">Education</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
          <PlusIcon className="h-4 w-4 inline mr-2" />
          Add Education
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : education.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No education entries yet</div>
      ) : (
        <div className="grid gap-4">
          {education.map((edu) => (
            <div key={edu.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{edu.degree}</h3>
                <p className="text-sm text-blue-600 mt-1">{edu.school}</p>
                <p className="text-xs text-gray-500 mt-1">{edu.period}</p>
                <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(edu)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <EditIcon className="h-4 w-4 text-blue-600" />
                </button>
                <button onClick={() => handleDelete(edu.id)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
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
