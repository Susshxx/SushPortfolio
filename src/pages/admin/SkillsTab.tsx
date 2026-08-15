import { useState, useEffect } from 'react';
import { PlusIcon, EditIcon, TrashIcon, SaveIcon, XIcon } from 'lucide-react';
import { getAllSkills, addSkill, updateSkill, deleteSkill, type SkillGroup } from '../../lib/skillService';

export function SkillsTab() {
  const [skills, setSkills] = useState<SkillGroup[]>([]);
  const [editingSkill, setEditingSkill] = useState<SkillGroup | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await getAllSkills();
      setSkills(data);
    } catch (error) {
      console.error('Failed to load skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSkill({
      title: '',
      items: [],
      color: 'bg-blue-200',
      order: skills.length,
    });
    setShowForm(true);
  };

  const handleEdit = (skill: SkillGroup) => {
    setEditingSkill({ ...skill });
    setShowForm(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id || !confirm('Delete this skill group?')) return;
    try {
      await deleteSkill(id);
      await loadSkills();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleSave = async () => {
    if (!editingSkill) return;
    try {
      if (editingSkill.id) {
        await updateSkill(editingSkill.id, editingSkill);
      } else {
        await addSkill(editingSkill);
      }
      await loadSkills();
      setShowForm(false);
      setEditingSkill(null);
    } catch (error) {
      console.error('Failed to save:', error);
    }
  };

  if (showForm && editingSkill) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{editingSkill.id ? 'Edit' : 'Add'} Skill Group</h2>
          <button onClick={() => { setShowForm(false); setEditingSkill(null); }} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              value={editingSkill.title}
              onChange={(e) => setEditingSkill({ ...editingSkill, title: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills (comma-separated) *</label>
            <input
              type="text"
              value={editingSkill.items.join(', ')}
              onChange={(e) => setEditingSkill({ ...editingSkill, items: e.target.value.split(',').map(t => t.trim()) })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color *</label>
            <select
              value={editingSkill.color}
              onChange={(e) => setEditingSkill({ ...editingSkill, color: e.target.value })}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-pointer"
            >
              <option value="bg-yellow-200">Yellow</option>
              <option value="bg-pink-200">Pink</option>
              <option value="bg-blue-200">Blue</option>
              <option value="bg-green-200">Green</option>
              <option value="bg-purple-200">Purple</option>
              <option value="bg-orange-200">Orange</option>
              <option value="bg-teal-200">Teal</option>
              <option value="bg-indigo-200">Indigo</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button onClick={handleSave} className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer">
              <SaveIcon className="h-4 w-4 inline mr-2" />
              Save
            </button>
            <button onClick={() => { setShowForm(false); setEditingSkill(null); }} className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer">
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
        <h2 className="text-2xl font-semibold">Skills</h2>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
          <PlusIcon className="h-4 w-4 inline mr-2" />
          Add Skill Group
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : skills.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No skills yet</div>
      ) : (
        <div className="grid gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{skill.title}</h3>
                <div className="flex gap-2 mt-2">
                  {skill.items.map((item) => (
                    <span key={item} className="text-xs bg-gray-100 px-2 py-1 rounded">{item}</span>
                  ))}
                </div>
                <span className={`inline-block mt-2 px-3 py-1 rounded text-xs ${skill.color}`}>
                  {skill.color}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(skill)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                  <EditIcon className="h-4 w-4 text-blue-600" />
                </button>
                <button onClick={() => handleDelete(skill.id)} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
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
