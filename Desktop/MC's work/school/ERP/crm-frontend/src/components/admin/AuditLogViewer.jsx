import React from 'react';

export const AuditLogViewer = ({ logs }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Timestamp</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Resource</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {logs?.map((log, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.user}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.action}</td>
              <td className="px-6 py-4 text-sm text-gray-900">{log.resource}</td>
              <td className="px-6 py-4 text-sm">
                <span className={`px-2 py-1 rounded text-xs font-medium ${log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {log.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditLogViewer;
