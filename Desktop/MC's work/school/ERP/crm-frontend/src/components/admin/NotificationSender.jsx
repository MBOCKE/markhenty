import React, { useState } from 'react';
import { notificationAPI } from '../../api/notifications';
import { customerAPI } from '../../api/customers';
import toast from 'react-hot-toast';

export const NotificationSender = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    targetType: 'all', // 'all', 'tier', 'specific'
    targetTier: '',
    targetCustomerId: '',
  });
  const [customers, setCustomers] = useState([]);
  const [isSending, setIsSending] = useState(false);

  React.useEffect(() => {
    if (formData.targetType === 'specific') {
      fetchCustomers();
    }
  }, [formData.targetType]);

  const fetchCustomers = async () => {
    try {
      const response = await customerAPI.getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      let targets = [];

      if (formData.targetType === 'all') {
        // Send to all customers
        const response = await customerAPI.getAllCustomers();
        targets = response.data?.map(c => c.id) || [];
      } else if (formData.targetType === 'tier') {
        // Send to customers of specific tier
        const response = await customerAPI.getAllCustomers({ tier: formData.targetTier });
        targets = response.data?.map(c => c.id) || [];
      } else if (formData.targetType === 'specific') {
        targets = [formData.targetCustomerId];
      }

      // Create notifications for each target
      const promises = targets.map(customerId =>
        notificationAPI.createNotification({
          customerId,
          title: formData.title,
          message: formData.message,
          type: formData.type,
        })
      );

      await Promise.all(promises);

      toast.success(`Notification sent to ${targets.length} customers`);
      setFormData({
        title: '',
        message: '',
        type: 'info',
        targetType: 'all',
        targetTier: '',
        targetCustomerId: '',
      });
    } catch (error) {
      console.error('Failed to send notifications:', error);
      toast.error('Failed to send notifications');
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Send Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Notification title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Notification message"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Target Audience
          </label>
          <select
            name="targetType"
            value={formData.targetType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Customers</option>
            <option value="tier">Specific Tier</option>
            <option value="specific">Specific Customer</option>
          </select>
        </div>

        {formData.targetType === 'tier' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tier
            </label>
            <select
              name="targetTier"
              value={formData.targetTier}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Tier</option>
              <option value="NORMAL">Normal</option>
              <option value="STANDARD">Standard</option>
              <option value="PREMIUM">Premium</option>
              <option value="BRONZE">Bronze</option>
            </select>
          </div>
        )}

        {formData.targetType === 'specific' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Customer
            </label>
            <select
              name="targetCustomerId"
              value={formData.targetCustomerId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} ({customer.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isSending}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSending ? 'Sending...' : 'Send Notification'}
        </button>
      </form>
    </div>
  );
};