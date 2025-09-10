import React from 'react';
import { Bell, Settings, LogOut, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout, switchRole } = useAuth();

  const roles = [
    { value: 'analyst', label: 'Finance Analyst' },
    { value: 'manager', label: 'Finance Manager' },
    { value: 'auditor', label: 'Auditor' },
    { value: 'admin', label: 'System Admin' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {user?.role === 'analyst' && 'Finance Analyst Dashboard'}
            {user?.role === 'manager' && 'Manager Dashboard'}
            {user?.role === 'auditor' && 'Auditor Dashboard'}
            {user?.role === 'admin' && 'System Administration'}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Role Switcher for Demo */}
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-gray-400" />
            <select
              value={user?.role || ''}
              onChange={(e) => switchRole(e.target.value as any)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>

          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>

          <button
            onClick={logout}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}