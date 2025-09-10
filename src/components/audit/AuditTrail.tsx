import React, { useState } from 'react';
import { Shield, Search, Filter, Download, Eye } from 'lucide-react';
import { mockAuditTrail } from '../../data/mockData';

export default function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('all');
  const [filterUser, setFilterUser] = useState('all');

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'MATCH_CREATED', label: 'Match Created' },
    { value: 'MATCH_APPROVED', label: 'Match Approved' },
    { value: 'EXCEPTION_CREATED', label: 'Exception Created' },
    { value: 'USER_LOGIN', label: 'User Login' },
    { value: 'DATA_IMPORT', label: 'Data Import' }
  ];

  const users = [
    { value: 'all', label: 'All Users' },
    { value: '1', label: 'Sarah Johnson' },
    { value: '2', label: 'Michael Chen' },
    { value: '3', label: 'Emma Davis' },
    { value: '4', label: 'Robert Wilson' }
  ];

  const filteredAuditTrail = mockAuditTrail.filter(entry => {
    const matchesSearch = entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = filterAction === 'all' || entry.action === filterAction;
    const matchesUser = filterUser === 'all' || entry.userId === filterUser;
    
    return matchesSearch && matchesAction && matchesUser;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'MATCH_CREATED': return 'bg-blue-100 text-blue-800';
      case 'MATCH_APPROVED': return 'bg-green-100 text-green-800';
      case 'EXCEPTION_CREATED': return 'bg-red-100 text-red-800';
      case 'USER_LOGIN': return 'bg-purple-100 text-purple-800';
      case 'DATA_IMPORT': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserName = (userId: string) => {
    const user = users.find(u => u.value === userId);
    return user ? user.label : 'Unknown User';
  };

  const formatValue = (value: any) => {
    if (!value) return '-';
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Trail</h1>
          <p className="text-gray-600 mt-1">Complete history of all system activities and changes</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export Audit Log
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search actions, entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {actionTypes.map(action => (
                <option key={action.value} value={action.value}>{action.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User</label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {users.map(user => (
                <option key={user.value} value={user.value}>{user.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterAction('all');
                setFilterUser('all');
              }}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredAuditTrail.length} of {mockAuditTrail.length} audit entries
        </div>
      </div>

      {/* Audit Log */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAuditTrail.map((entry, index) => (
            <div key={entry.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(entry.action)}`}>
                      {entry.action.replace('_', ' ')}
                    </span>
                    <span className="text-sm text-gray-900 font-medium">
                      {entry.entity} #{entry.entityId}
                    </span>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <span className="font-medium">User:</span> {getUserName(entry.userId)}
                    </p>
                    <p>
                      <span className="font-medium">Timestamp:</span> {new Date(entry.timestamp).toLocaleString()}
                    </p>
                    
                    {entry.oldValue && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                          Show old value
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                          {formatValue(entry.oldValue)}
                        </pre>
                      </details>
                    )}
                    
                    {entry.newValue && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                          Show new value
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                          {formatValue(entry.newValue)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-gray-400">
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filteredAuditTrail.length === 0 && (
            <div className="p-12 text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No audit entries found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filter settings.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-md font-semibold text-blue-900 mb-2">Security & Compliance</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                • All user activities are automatically logged and cannot be modified or deleted
              </p>
              <p>
                • Audit logs are retained for 7 years in compliance with SOX requirements
              </p>
              <p>
                • Access to audit trails is restricted to authorized users with auditor role
              </p>
              <p>
                • Logs are encrypted at rest and backed up daily to secure storage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}