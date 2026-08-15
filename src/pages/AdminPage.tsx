import { useState, useEffect } from 'react';
import { ArrowLeftIcon, DatabaseIcon } from 'lucide-react';
import { ProjectsTab } from './admin/ProjectsTab';
import { SkillsTab } from './admin/SkillsTab';
import { EducationTab } from './admin/EducationTab';
import { ApiKeysTab } from './admin/ApiKeysTab';
import { getAllProjects, addProject } from '../lib/projectService';
import { getAllSkills, addSkill } from '../lib/skillService';
import { getAllEducation, addEducation } from '../lib/educationService';
import { SEED_PROJECTS, SEED_SKILLS, SEED_EDUCATION } from '../lib/seedData';

const ADMIN_PASSWORD = 'Sushhora';
const AUTH_STORAGE_KEY = 'admin_authenticated';

type Tab = 'projects' | 'skills' | 'education' | 'apiKeys';

export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('projects');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Check if user was previously authenticated
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (storedAuth === 'true') {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword('');
      setError('');
      localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    } else {
      setError('Incorrect password');
    }
  };

  const handleSeedData = async () => {
    if (!confirm('This will add sample data to your database. Any existing data will remain. Continue?')) return;
    
    try {
      setLoading(true);
      setError('');
      
      // Check if data already exists
      const existingProjects = await getAllProjects();
      const existingSkills = await getAllSkills();
      const existingEducation = await getAllEducation();
      
      let count = 0;
      
      // Seed projects if empty
      if (existingProjects.length === 0) {
        for (const project of SEED_PROJECTS) {
          await addProject(project);
          count++;
        }
      }
      
      // Seed skills if empty
      if (existingSkills.length === 0) {
        for (const [index, skill] of SEED_SKILLS.entries()) {
          await addSkill({ ...skill, order: index });
          count++;
        }
      }
      
      // Seed education if empty
      if (existingEducation.length === 0) {
        for (const [index, edu] of SEED_EDUCATION.entries()) {
          await addEducation({ ...edu, order: index });
          count++;
        }
      }
      
      if (count > 0) {
        setSuccess(`Successfully seeded ${count} items!`);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setSuccess('Database already has data!');
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      setError('Failed to seed data: ' + (err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4 cursor-default">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Enter your password to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 cursor-text focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleBackToHome}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Back to Home
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 cursor-default">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackToHome}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Portfolio
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleSeedData}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 cursor-pointer disabled:opacity-50"
            >
              <DatabaseIcon className="h-5 w-5" />
              Seed Database
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {(['projects', 'skills', 'education', 'apiKeys'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab === 'apiKeys' ? 'API Keys' : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        </div>
      )}

      {success && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {success}
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'education' && <EducationTab />}
        {activeTab === 'apiKeys' && <ApiKeysTab />}
      </div>
    </div>
  );
}
