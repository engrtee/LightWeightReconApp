import React from 'react';
import { 
  BarChart3, 
  Upload, 
  GitMerge, 
  AlertTriangle, 
  CheckSquare, 
  FileText, 
  Users, 
  Shield,
  Home
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  roles: string[];
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['analyst', 'manager', 'auditor', 'admin'] },
  { id: 'import', label: 'Data Import', icon: Upload, roles: ['analyst', 'admin'] },
  { id: 'reconciliation', label: 'Reconciliation', icon: GitMerge, roles: ['analyst', 'manager'] },
  { id: 'exceptions', label: 'Exceptions', icon: AlertTriangle, roles: ['analyst', 'manager'] },
  { id: 'approvals', label: 'Approvals', icon: CheckSquare, roles: ['manager'] },
  { id: 'reports', label: 'Reports', icon: FileText, roles: ['analyst', 'manager', 'auditor'] },
  { id: 'audit', label: 'Audit Trail', icon: Shield, roles: ['auditor', 'admin'] },
  { id: 'users', label: 'User Management', icon: Users, roles: ['admin'] },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { user } = useAuth();

  const availableItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">ReconPro</h1>
            <p className="text-xs text-gray-500">Bank Reconciliation</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {availableItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}