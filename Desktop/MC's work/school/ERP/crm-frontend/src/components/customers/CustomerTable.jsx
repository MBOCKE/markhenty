import React from 'react';
import { Link } from 'react-router-dom';

export const CustomerTable = ({ customers, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Tier</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers?.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{customer.name}</td>
              <td className="border border-gray-300 px-4 py-2">{customer.email}</td>
              <td className="border border-gray-300 px-4 py-2">{customer.tier}</td>
              <td className="border border-gray-300 px-4 py-2">
                <span className={`px-2 py-1 rounded text-sm ${customer.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {customer.active ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <Link to={`/customers/${customer.id}`} className="text-blue-600 hover:underline mr-2">
                  View
                </Link>
                <button
                  onClick={() => onDelete(customer.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
