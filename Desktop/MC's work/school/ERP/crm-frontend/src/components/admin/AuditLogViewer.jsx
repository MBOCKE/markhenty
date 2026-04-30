import React from 'react';

export const AuditLogViewer = ({ logs, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Loading logs...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Timestamp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Target</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">IP Address</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {logs?.map((log) => (
            <tr key={log.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.userId}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.targetId}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogViewer;
