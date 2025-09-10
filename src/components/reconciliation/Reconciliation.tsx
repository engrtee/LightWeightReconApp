import React, { useState } from 'react';
import { GitMerge, Check, X, Eye, Filter, Search } from 'lucide-react';
import { mockBankStatements, mockLedgerEntries } from '../../data/mockData';

export default function Reconciliation() {
  const [selectedBank, setSelectedBank] = useState<string[]>([]);
  const [selectedLedger, setSelectedLedger] = useState<string[]>([]);
  const [showMatched, setShowMatched] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBankSelect = (id: string) => {
    setSelectedBank(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleLedgerSelect = (id: string) => {
    setSelectedLedger(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const createMatch = () => {
    if (selectedBank.length > 0 && selectedLedger.length > 0) {
      // In real app, this would call API to create match
      alert(`Creating match: ${selectedBank.length} bank items with ${selectedLedger.length} ledger items`);
      setSelectedBank([]);
      setSelectedLedger([]);
    }
  };

  const filteredBankStatements = mockBankStatements.filter(bs => {
    const matchesSearch = bs.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bs.accountNo.includes(searchTerm);
    const matchesFilter = showMatched ? bs.status === 'matched' : bs.status === 'unmatched';
    return matchesSearch && matchesFilter;
  });

  const filteredLedgerEntries = mockLedgerEntries.filter(le => {
    const matchesSearch = le.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         le.glAccount.includes(searchTerm);
    const matchesFilter = showMatched ? le.status === 'matched' : le.status === 'unmatched';
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reconciliation</h1>
          <p className="text-gray-600 mt-1">Match bank statements with ledger entries</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowMatched(!showMatched)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              showMatched 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Eye className="w-4 h-4 mr-2" />
            {showMatched ? 'Show Unmatched' : 'Show Matched'}
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <GitMerge className="w-4 h-4 mr-2" />
            Run Auto-Match
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        {(selectedBank.length > 0 || selectedLedger.length > 0) && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Selected: {selectedBank.length} bank, {selectedLedger.length} ledger
            </span>
            <button
              onClick={createMatch}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              Create Match
            </button>
            <button
              onClick={() => {
                setSelectedBank([]);
                setSelectedLedger([]);
              }}
              className="flex items-center px-2 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Reconciliation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bank Statements */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Bank Statements</h3>
              <span className="text-sm text-gray-500">
                {filteredBankStatements.length} items
              </span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredBankStatements.map(item => (
              <div
                key={item.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedBank.includes(item.id) ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => handleBankSelect(item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedBank.includes(item.id)}
                        onChange={() => handleBankSelect(item.id)}
                        className="rounded text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <p className="text-sm font-medium text-gray-900">
                        {item.description}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.date} • {item.accountNo}
                    </p>
                    {item.status === 'matched' && item.matchedWith && (
                      <p className="text-xs text-green-600 mt-1">
                        Matched with: {item.matchedWith.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      item.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.amount >= 0 ? '+' : ''}{item.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      item.status === 'matched' ? 'bg-green-100 text-green-800' :
                      item.status === 'exception' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ledger Entries */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Ledger Entries</h3>
              <span className="text-sm text-gray-500">
                {filteredLedgerEntries.length} items
              </span>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredLedgerEntries.map(item => (
              <div
                key={item.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedLedger.includes(item.id) ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => handleLedgerSelect(item.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedLedger.includes(item.id)}
                        onChange={() => handleLedgerSelect(item.id)}
                        className="rounded text-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <p className="text-sm font-medium text-gray-900">
                        {item.description}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.date} • {item.glAccount} • {item.sourceSystem}
                    </p>
                    {item.status === 'matched' && item.matchedWith && (
                      <p className="text-xs text-green-600 mt-1">
                        Matched with: {item.matchedWith.join(', ')}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      item.amount >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.amount >= 0 ? '+' : ''}{item.amount.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                      item.status === 'matched' ? 'bg-green-100 text-green-800' :
                      item.status === 'exception' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Matching Rules */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Matching Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Exact Match</h4>
            <p className="text-sm text-gray-600">Amount, date, and description must match exactly</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Amount Tolerance</h4>
            <p className="text-sm text-gray-600">Allow ±$10 variance in amount matching</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Reference Match</h4>
            <p className="text-sm text-gray-600">Match based on reference numbers or invoice IDs</p>
          </div>
        </div>
      </div>
    </div>
  );
}