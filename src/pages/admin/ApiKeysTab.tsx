import { useState, useEffect } from 'react';
import { PlusIcon, CopyIcon, TrashIcon, EyeIcon, EyeOffIcon, CheckIcon } from 'lucide-react';
import { createApiKey, getAllApiKeys, deleteApiKey, type ApiKey } from '../../lib/apiKeyService';

export function ApiKeysTab() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      setLoading(true);
      const keys = await getAllApiKeys();
      setApiKeys(keys);
    } catch (error) {
      console.error('Failed to load API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    // Check if there's already an active API key
    if (apiKeys.some(k => k.isActive)) {
      alert('Only one API key is allowed at a time. Please delete the existing key before generating a new one.');
      return;
    }

    try {
      setLoading(true);
      const newKey = await createApiKey(newKeyName);
      setApiKeys([newKey, ...apiKeys]);
      setNewKeyName('');
      setShowCreateForm(false);
      // Auto-show the new key
      setVisibleKeys(new Set([newKey.id || '']));
    } catch (error) {
      console.error('Failed to create API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return;
    
    try {
      setLoading(true);
      await deleteApiKey(id);
      setApiKeys(apiKeys.filter(k => k.id !== id));
    } catch (error) {
      console.error('Failed to delete API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  const maskKey = (key: string) => {
    return key.slice(0, 8) + '...' + key.slice(-4);
  };

  if (showCreateForm) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Generate New API Key</h2>
          <button 
            onClick={() => { setShowCreateForm(false); setNewKeyName(''); }} 
            className="p-2 hover:bg-gray-100 rounded cursor-pointer"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleCreateKey} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Key Name *</label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 cursor-text"
              placeholder="e.g., Mobile App, External Dashboard"
              required
              autoFocus
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> This API key will have full admin access to manage projects, skills, and education. 
              Keep it secure and never share it publicly.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Generating...' : 'Generate Key'}
            </button>
            <button 
              type="button"
              onClick={() => { setShowCreateForm(false); setNewKeyName(''); }} 
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">API Keys</h2>
          <p className="text-sm text-gray-600 mt-1">Generate API keys to manage your portfolio from external applications</p>
        </div>
        <button 
          onClick={() => setShowCreateForm(true)} 
          disabled={apiKeys.some(k => k.isActive)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon className="h-4 w-4 inline mr-2" />
          Generate API Key
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : apiKeys.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg mb-2">No API keys generated yet</p>
          <p className="text-sm">Generate an API key to enable external management of your portfolio</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {apiKeys.map((apiKey) => (
            <div key={apiKey.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{apiKey.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      apiKey.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {apiKey.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-gray-100 px-3 py-2 rounded text-sm font-mono">
                      {visibleKeys.has(apiKey.id || '') ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id || '')}
                      className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                      title={visibleKeys.has(apiKey.id || '') ? 'Hide key' : 'Show key'}
                    >
                      {visibleKeys.has(apiKey.id || '') ? (
                        <EyeOffIcon className="h-4 w-4 text-gray-600" />
                      ) : (
                        <EyeIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopyKey(apiKey.key)}
                      className="p-1 hover:bg-gray-200 rounded cursor-pointer"
                      title="Copy key"
                    >
                      {copiedKey === apiKey.key ? (
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      ) : (
                        <CopyIcon className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                  </div>

                  <div className="text-xs text-gray-500">
                    <p>Created: {apiKey.createdAt?.toDate()?.toLocaleDateString()}</p>
                    {apiKey.lastUsed && (
                      <p>Last used: {apiKey.lastUsed.toDate().toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-2">
                    {apiKey.permissions.map(perm => (
                      <span key={perm} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteKey(apiKey.id!)}
                  className="p-2 hover:bg-red-100 rounded cursor-pointer"
                  title="Delete key"
                >
                  <TrashIcon className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">How to use API Keys</h4>
        <p className="text-sm text-blue-800 mb-2">
          Include the API key in the Authorization header of your HTTP requests:
        </p>
        <code className="block bg-blue-100 px-3 py-2 rounded text-sm">
          Authorization: Bearer YOUR_API_KEY
        </code>
      </div>
    </div>
  );
}
