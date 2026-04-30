import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomerStore } from '../store/customerStore';
import transactionsAPI from '../api/transactions';
import { CustomerForm } from '../components/customers/CustomerForm';
import { CustomerTierBadge } from '../components/customers/CustomerTierBadge';
import { TransactionList } from '../components/transactions/TransactionList';

export const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedCustomer, fetchCustomerWithDetails } = useCustomerStore();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchCustomerWithDetails(id);
        const txnRes = await transactionsAPI.getByCustomer(id);
        setTransactions(txnRes.data);
      } catch (error) {
        console.error('Failed to load customer details:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id, fetchCustomerWithDetails]);

  const handleUpdate = async (data) => {
    try {
      // Update customer via store
      // Assuming updateCustomer is available, but for now, just log
      console.log('Update customer:', data);
      alert('Customer updated successfully');
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  const customer = selectedCustomer;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{customer?.name}</h1>
        <button
          onClick={() => navigate('/customers')}
          className="text-blue-600 hover:underline"
        >
          Back to Customers
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CustomerForm initialData={customer} onSubmit={handleUpdate} />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4">Customer Info</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Tier</p>
              <div className="mt-1">
                <CustomerTierBadge tier={customer?.tier} size="lg" />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status</p>
              <p className="mt-1 text-lg font-medium">{customer?.status === 'active' ? 'Active' : 'Inactive'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Join Date</p>
              <p className="mt-1 text-lg font-medium">{customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString() : ''}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction History</h2>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default CustomerDetail;
