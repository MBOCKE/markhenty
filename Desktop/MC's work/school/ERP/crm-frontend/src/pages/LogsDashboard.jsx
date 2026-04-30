import React, { useEffect, useState } from 'react';
import { AuditLogViewer } from '../components/admin/AuditLogViewer';
import { auditAPI } from '../api/audit';

export const LogsDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    user: '',
    action: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    fetchLogs();
  }, [filters]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const response = await auditAPI.getLogs(filters);
      setLogs(response.data);
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      // Fallback to mock data
      setLogs([
        {
          id: 'audit_1',
          timestamp: new Date().toISOString(),
          user: 'admin@example.com',
          action: 'LOGIN',
          target: 'system',
          details: 'User logged in',
          ip: '192.168.1.1',
        },
        {
          id: 'audit_2',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          user: 'manager@example.com',
          action: 'CUSTOMER_UPDATE',
          target: 'cust_1001',
          details: 'Updated customer tier',
          ip: '192.168.1.2',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const exportLogs = () => {
    const csvContent = [
      ['Timestamp', 'User', 'Action', 'Target', 'Details', 'IP'],
      ...logs.map(log => [
        log.timestamp,
        log.user,
        log.action,
        log.target,
        log.details,
        log.ip,
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Logs Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor all system activities and audit trails</p>
        </div>
        <button
          onClick={exportLogs}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Export Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User
            </label>
            <input
              type="text"
              value={filters.user}
              onChange={(e) => handleFilterChange({ user: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Filter by user"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action
            </label>
            <select
              value={filters.action}
              onChange={(e) => handleFilterChange({ action: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Actions</option>
              <option value="LOGIN">Login</option>
              <option value="LOGOUT">Logout</option>
              <option value="CUSTOMER_CREATE">Customer Create</option>
              <option value="CUSTOMER_UPDATE">Customer Update</option>
              <option value="CUSTOMER_DELETE">Customer Delete</option>
              <option value="TRANSACTION_CREATE">Transaction Create</option>
              <option value="RULE_UPDATE">Rule Update</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange({ dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange({ dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Logs Viewer */}
      <AuditLogViewer logs={logs} loading={loading} />
    </div>
  );
};