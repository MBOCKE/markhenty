import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CustomerForm } from '../components/customers/CustomerForm';
import { CustomerTierBadge } from '../components/customers/CustomerTierBadge';

export const CustomerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch customer details
    const mockCustomer = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0123',
      tier: 'Gold',
      active: true,
      joinDate: '2023-01-15',
    };
    setCustomer(mockCustomer);
    setLoading(false);
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      // Update customer via API
      setCustomer({ ...customer, ...data });
      alert('Customer updated successfully');
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
              <p className="mt-1 text-lg font-medium">{customer?.active ? 'Active' : 'Inactive'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Join Date</p>
              <p className="mt-1 text-lg font-medium">{customer?.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
