import React, { useState } from 'react';
import { RuleEngineEditor } from '../components/admin/RuleEngineEditor';
import { AuditLogViewer } from '../components/admin/AuditLogViewer';
import { UserManager } from '../components/admin/UserManager';
import { NotificationSender } from '../components/admin/NotificationSender';

export const AdminPanel = () => {
  const [tab, setTab] = useState('notifications');
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@example.com', role: 'admin' },
    { id: 2, email: 'user1@example.com', role: 'user' },
  ]);

  const [logs, setLogs] = useState([
    { timestamp: '2024-04-20 10:30:00', user: 'admin@example.com', action: 'LOGIN', resource: 'Auth', status: 'success' },
    { timestamp: '2024-04-20 10:25:00', user: 'user1@example.com', action: 'CREATE', resource: 'Customer', status: 'success' },
  ]);

  const handleAddUser = (userData) => {
    const newUser = { id: users.length + 1, ...userData };
    setUsers([...users, newUser]);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleSaveRules = (rules) => {
    console.log('Rules saved:', rules);
    alert('Rules saved successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
      <p className="text-sm text-gray-600">Current tab: {tab}</p>
      
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {['notifications', 'rules', 'users', 'logs'].map((tabName) => (
            <button
              key={tabName}
              onClick={() => setTab(tabName)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                tab === tabName
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6">
        {tab === 'notifications' && <NotificationSender />}
        {tab === 'rules' && <RuleEngineEditor onSave={handleSaveRules} />}
        {tab === 'users' && <UserManager users={users} onAddUser={handleAddUser} onDeleteUser={handleDeleteUser} />}
        {tab === 'logs' && <AuditLogViewer logs={logs} />}
      </div>
    </div>
  );
};

export default AdminPanel;
