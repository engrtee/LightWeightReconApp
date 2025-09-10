import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, PieChart, BarChart3 } from 'lucide-react';

export default function Reports() {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('summary');

  const reportTemplates = [
    {
      id: 'reconciliation-summary',
      name: 'Reconciliation Summary',
      description: 'Overview of reconciliation status and match rates',
      icon: BarChart3,
      lastRun: '2024-01-20',
      frequency: 'Weekly'
    },
    {
      id: 'exception-aging',
      name: 'Exception Aging Report',
      description: 'Analysis of unresolved exceptions by age',
      icon: TrendingUp,
      lastRun: '2024-01-19',
      frequency: 'Daily'
    },
    {
      id: 'audit-trail',
      name: 'Audit Trail Export',
      description: 'Complete history of all reconciliation activities',
      icon: FileText,
      lastRun: '2024-01-20',
      frequency: 'Monthly'
    },
    {
      id: 'performance-metrics',
      name: 'Performance Metrics',
      description: 'Auto-match rates and processing time analysis',
      icon: PieChart,
      lastRun: '2024-01-18',
      frequency: 'Weekly'
    }
  ];

  const kpiData = {
    autoMatchRate: 85,
    totalTransactions: 1247,
    exceptionsResolved: 23,
    avgResolutionTime: 2.3,
    complianceScore: 98
  };

  const trendData = [
    { month: 'Oct', matched: 78, exceptions: 22 },
    { month: 'Nov', matched: 82, exceptions: 18 },
    { month: 'Dec', matched: 85, exceptions: 15 },
    { month: 'Jan', matched: 87, exceptions: 13 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate reconciliation reports and view performance metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Auto-Match Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{kpiData.autoMatchRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${kpiData.autoMatchRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Transactions</p>
              <p className="text-2xl font-semibold text-gray-900">{kpiData.totalTransactions.toLocaleString()}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Exceptions Resolved</p>
              <p className="text-2xl font-semibold text-gray-900">{kpiData.exceptionsResolved}</p>
            </div>
            <PieChart className="w-8 h-8 text-amber-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-semibold text-gray-900">{kpiData.avgResolutionTime} days</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">-0.5 days from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-semibold text-gray-900">{kpiData.complianceScore}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-xs text-gray-500 mt-2">SOX compliance</p>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Rate Trend</h3>
        <div className="h-64 flex items-end justify-between space-x-4">
          {trendData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full max-w-16 space-y-1">
                {/* Matched bar */}
                <div className="relative">
                  <div 
                    className="bg-green-500 rounded-t transition-all duration-500"
                    style={{ height: `${(item.matched / 100) * 200}px` }}
                  ></div>
                  <div className="text-xs text-center mt-1 text-green-600 font-medium">
                    {item.matched}%
                  </div>
                </div>
                
                {/* Exceptions bar */}
                <div className="relative">
                  <div 
                    className="bg-red-500 rounded-b transition-all duration-500"
                    style={{ height: `${(item.exceptions / 100) * 200}px` }}
                  ></div>
                  <div className="text-xs text-center mt-1 text-red-600 font-medium">
                    {item.exceptions}%
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2 font-medium">{item.month}</div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Matched</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Exceptions</span>
          </div>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Last run: {template.lastRun}</span>
                  <span>Frequency: {template.frequency}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Generate Report
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Schedule
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Reconciliation Summary - January 2024
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Michael Chen</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2024-01-20</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Download</button>
                  <button className="text-gray-600 hover:text-gray-900">View</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  Exception Aging Report
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Sarah Johnson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2024-01-19</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">Download</button>
                  <button className="text-gray-600 hover:text-gray-900">View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}