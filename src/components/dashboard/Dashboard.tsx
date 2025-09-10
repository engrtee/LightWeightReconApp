import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  FileText,
  Users,
  Calendar
} from 'lucide-react';
import StatsCard from './StatsCard';
import { mockBankStatements, mockLedgerEntries, mockExceptions } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  // Calculate stats
  const totalTransactions = mockBankStatements.length + mockLedgerEntries.length;
  const matchedCount = mockBankStatements.filter(bs => bs.status === 'matched').length;
  const unmatchedCount = mockBankStatements.filter(bs => bs.status === 'unmatched').length;
  const exceptionsCount = mockExceptions.length;
  const matchRate = Math.round((matchedCount / mockBankStatements.length) * 100);

  const recentActivity = [
    { action: 'New bank statement imported', time: '2 hours ago', user: 'Sarah Johnson' },
    { action: 'Exception resolved for ACME payment', time: '4 hours ago', user: 'Michael Chen' },
    { action: 'Reconciliation approved for Jan 15', time: '6 hours ago', user: 'Michael Chen' },
    { action: 'Exception assigned: Bank fee investigation', time: '1 day ago', user: 'Sarah Johnson' },
    { action: 'ERP data sync completed', time: '1 day ago', user: 'System' }
  ];

  const upcomingTasks = [
    { task: 'Review pending matches for approval', due: 'Today', priority: 'high' },
    { task: 'Investigate timing differences', due: 'Tomorrow', priority: 'medium' },
    { task: 'Prepare monthly reconciliation report', due: 'Jan 31', priority: 'medium' },
    { task: 'Update matching rules for new vendor', due: 'Feb 2', priority: 'low' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-blue-100">
          {user?.role === 'analyst' && 'Ready to reconcile today\'s transactions?'}
          {user?.role === 'manager' && 'You have 3 reconciliations pending approval.'}
          {user?.role === 'auditor' && 'Review audit trails and compliance reports.'}
          {user?.role === 'admin' && 'System running smoothly with 99.9% uptime.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Transactions"
          value={totalTransactions.toString()}
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        
        <StatsCard
          title="Auto-Match Rate"
          value={`${matchRate}%`}
          change="+5% from last month"
          changeType="positive"
          icon={TrendingUp}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        
        <StatsCard
          title="Pending Exceptions"
          value={exceptionsCount.toString()}
          change="-2 from yesterday"
          changeType="positive"
          icon={AlertTriangle}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
        />
        
        <StatsCard
          title="Unmatched Items"
          value={unmatchedCount.toString()}
          change="Same as yesterday"
          changeType="neutral"
          icon={Clock}
          iconBg="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.time} • {item.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{task.task}</p>
                    <p className="text-xs text-gray-500">Due: {task.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.role !== 'auditor' && (
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-gray-500 mr-2" />
                Import Bank Statement
              </button>
            )}
            
            {(user?.role === 'analyst' || user?.role === 'manager') && (
              <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <CheckCircle className="w-5 h-5 text-gray-500 mr-2" />
                Run Auto-Match
              </button>
            )}
            
            <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}