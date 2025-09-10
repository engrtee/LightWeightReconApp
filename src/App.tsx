import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Sidebar from './components/common/Sidebar';
import Header from './components/common/Header';
import Dashboard from './components/dashboard/Dashboard';
import DataImport from './components/import/DataImport';
import Reconciliation from './components/reconciliation/Reconciliation';
import Exceptions from './components/exceptions/Exceptions';
import Approvals from './components/approvals/Approvals';
import Reports from './components/reports/Reports';
import AuditTrail from './components/audit/AuditTrail';
import UserManagement from './components/users/UserManagement';

function AppContent() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'import': return <DataImport />;
      case 'reconciliation': return <Reconciliation />;
      case 'exceptions': return <Exceptions />;
      case 'approvals': return <Approvals />;
      case 'reports': return <Reports />;
      case 'audit': return <AuditTrail />;
      case 'users': return <UserManagement />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;