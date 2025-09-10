import React, { useState } from 'react';
import { AlertTriangle, User, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { mockExceptions } from '../../data/mockData';

export default function Exceptions() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const exceptionTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'timing_difference', label: 'Timing Difference' },
    { value: 'missing_entry', label: 'Missing Entry' },
    { value: 'bank_fee', label: 'Bank Fee' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'open', label: 'Open' },
    { value: 'investigating', label: 'Investigating' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const filteredExceptions = mockExceptions.filter(exception => {
    const typeMatch = selectedType === 'all' || exception.type === selectedType;
    const statusMatch = selectedStatus === 'all' || exception.status === selectedStatus;
    return typeMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'investigating': return 'bg-amber-100 text-amber-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'timing_difference': return <Clock className="w-4 h-4" />;
      case 'missing_entry': return <AlertTriangle className="w-4 h-4" />;
      case 'bank_fee': return <AlertTriangle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (days: number) => {
    if (days >= 30) return 'text-red-600';
    if (days >= 7) return 'text-amber-600';
    return 'text-green-600';
  };

  const summary = {
    total: mockExceptions.length,
    open: mockExceptions.filter(e => e.status === 'open').length,
    investigating: mockExceptions.filter(e => e.status === 'investigating').length,
    overdue: mockExceptions.filter(e => e.agingDays > 30).length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exception Management</h1>
          <p className="text-gray-600 mt-1">Track and resolve reconciliation exceptions</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <MessageSquare className="w-4 h-4 mr-2" />
          Add Note
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Exceptions</p>
              <p className="text-2xl font-semibold text-gray-900">{summary.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Open</p>
              <p className="text-2xl font-semibold text-gray-900">{summary.open}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-amber-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Investigating</p>
              <p className="text-2xl font-semibold text-gray-900">{summary.investigating}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue (30+ days)</p>
              <p className="text-2xl font-semibold text-gray-900">{summary.overdue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-40 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {exceptionTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-40 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>

          <div className="flex-1"></div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredExceptions.length} of {mockExceptions.length} exceptions
          </div>
        </div>
      </div>

      {/* Exceptions List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Exceptions</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredExceptions.map(exception => (
            <div key={exception.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-red-100">
                    {getTypeIcon(exception.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-sm font-medium text-gray-900">
                        {exception.description}
                      </h4>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(exception.status)}`}>
                        {exception.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{exception.note}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Assigned to: {exception.assignedTo}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>Created: {new Date(exception.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${getPriorityColor(exception.agingDays)}`}>
                        <AlertTriangle className="w-3 h-3" />
                        <span>Aging: {exception.agingDays} days</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-lg font-semibold ${
                    exception.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {exception.amount >= 0 ? '+' : ''}{exception.amount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    })}
                  </span>
                  
                  <div className="flex items-center space-x-1">
                    {exception.status !== 'resolved' && (
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                    <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-4">
                <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                  Investigate
                </button>
                <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                  Mark Resolved
                </button>
                <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  Reassign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}