import React, { useEffect, useState } from 'react';
import { useCustomerStore } from '../store/customerStore';
import { CustomerTable } from '../components/customers/CustomerTable';
import { CustomerSearch } from '../components/customers/CustomerSearch';
import { CustomerForm } from '../components/customers/CustomerForm';
import { CustomerTierBadge } from '../components/customers/CustomerTierBadge';
import { DataExport } from '../components/common/DataExport';

export const Customers = () => {
  const { customers, totalCount, isLoading, error, filters, fetchCustomers, setFilters, createCustomer, deleteCustomer } = useCustomerStore();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (filters.search !== undefined || filters.tier !== undefined || filters.page !== undefined) {
      fetchCustomers();
    }
  }, [filters.search, filters.tier, filters.page]);

  const handleSearch = (searchTerm) => {
    setFilters({ search: searchTerm });
  };

  const handleTierFilter = (tier) => {
    setFilters({ tier });
  };

  const handlePageChange = (page) => {
    setFilters({ page });
  };

  if (error) {
    return <div className="text-red-600 p-4">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">{totalCount} customers</p>
        </div>
        <div className="flex gap-3">
          <CustomerSearch onSearch={handleSearch} />
          <select 
            className="px-4 py-2 border border-gray-300 rounded-md"
            onChange={(e) => handleTierFilter(e.target.value || '')}
          >
            <option value="">All Tiers</option>
            <option value="NORMAL">Normal</option>
            <option value="STANDARD">Standard</option>
            <option value="PREMIUM">Premium</option>
            <option value="BRONZE">Bronze</option>
          </select>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            Add Customer
          </button>
          <DataExport data={customers} filename="customers" />
        </div>
      </div>

      <CustomerTable 
        customers={customers} 
        isLoading={isLoading}
        onPageChange={handlePageChange}
        totalCount={totalCount}
        onDelete={setSelectedForDelete}
      />

      {showCreateModal && (
        <CustomerForm 
          onClose={() => setShowCreateModal(false)}
          onSubmit={createCustomer}
        />
      )}

      {selectedForDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete Customer?</h3>
            <p>This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button 
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                onClick={() => {
                  deleteCustomer(selectedForDelete);
                  setSelectedForDelete(null);
                }}
              >
                Delete
              </button>
              <button 
                className="flex-1 bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
                onClick={() => setSelectedForDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;

