import React, { useState } from 'react';
import { CheckSquare, Clock, User, Calendar, DollarSign, Eye } from 'lucide-react';
import { mockMatchRecords, mockBankStatements, mockLedgerEntries } from '../../data/mockData';

export default function Approvals() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  // Get pending approvals with details
  const pendingApprovals = mockMatchRecords.filter(match => match.status === 'pending').map(match => {
    const bankItem = mockBankStatements.find(bs => bs.id === match.bankStatementId);
    const ledgerItem = mockLedgerEntries.find(le => le.id === match.ledgerEntryId);
    
    return {
      ...match,
      bankItem,
      ledgerItem,
      amount: bankItem?.amount || 0,
      description: bankItem?.description || 'Unknown transaction'
    };
  });

  const approvedItems = mockMatchRecords.filter(match => match.status === 'approved').map(match => {
    const bankItem = mockBankStatements.find(bs => bs.id === match.bankStatementId);
    const ledgerItem = mockLedgerEntries.find(le => le.id === match.ledgerEntryId);
    
    return {
      ...match,
      bankItem,
      ledgerItem,
      amount: bankItem?.amount || 0,
      description: bankItem?.description || 'Unknown transaction'
    };
  });

  const displayItems = filter === 'pending' ? pendingApprovals : 
                      filter === 'approved' ? approvedItems : 
                      [...pendingApprovals, ...approvedItems];

  const handleApprove = (matchId: string) => {
    // In real app, this would call API
    alert(`Approving match: ${matchId}`);
  };

  const handleReject = (matchId: string) => {
    // In real app, this would call API
    alert(`Rejecting match: ${matchId}`);
  };

  const stats = {
    pending: pendingApprovals.length,
    approved: approvedItems.length,
    totalValue: pendingApprovals.reduce((sum, item) => sum + Math.abs(item.amount), 0)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approval Workflow</h1>
          <p className="text-gray-600 mt-1">Review and approve reconciliation matches</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Bulk Approve
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Export List
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-amber-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckSquare className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved Today</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.approved}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === 'pending' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pending ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === 'approved' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Approved ({stats.approved})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({stats.pending + stats.approved})
            </button>
          </div>
        </div>

        {/* Approval List */}
        <div className="divide-y divide-gray-200">
          {displayItems.map((item) => (
            <div key={item.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">
                      {item.description}
                    </h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Bank Statement Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Bank Statement</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Date:</span> {item.bankItem?.date}</p>
                        <p><span className="font-medium">Account:</span> {item.bankItem?.accountNo}</p>
                        <p><span className="font-medium">Description:</span> {item.bankItem?.description}</p>
                        <p><span className="font-medium">Amount:</span> 
                          <span className={item.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {item.amount >= 0 ? '+' : ''}{item.amount.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Ledger Entry Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-2">Ledger Entry</h5>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Date:</span> {item.ledgerItem?.date}</p>
                        <p><span className="font-medium">GL Account:</span> {item.ledgerItem?.glAccount}</p>
                        <p><span className="font-medium">Description:</span> {item.ledgerItem?.description}</p>
                        <p><span className="font-medium">Amount:</span> 
                          <span className={item.ledgerItem?.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {item.ledgerItem?.amount >= 0 ? '+' : ''}{item.ledgerItem?.amount.toLocaleString('en-US', {
                              style: 'currency',
                              currency: 'USD'
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>Created by: Sarah Johnson</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>Date: {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckSquare className="w-3 h-3" />
                      <span>Match Rule: {item.matchRule.replace('_', ' ')}</span>
                    </div>
                  </div>

                  {item.status === 'approved' && item.approvedBy && (
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <CheckSquare className="w-4 h-4" />
                      <span>Approved by: Michael Chen on {new Date(item.approvedAt!).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye className="w-5 h-5" />
                  </button>
                  
                  {item.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {displayItems.length === 0 && (
            <div className="p-12 text-center">
              <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'pending' ? 'No pending approvals' : 'No items found'}
              </h3>
              <p className="text-gray-600">
                {filter === 'pending' 
                  ? 'All reconciliation matches have been processed.' 
                  : 'Try adjusting your filter criteria.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}