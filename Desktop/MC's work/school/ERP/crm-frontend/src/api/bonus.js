import { bonusClient } from './client';
import { loadMockData, saveMockData, generateCustomers } from '../utils/mockData';
import { customerAPI } from './customers';
import toast from 'react-hot-toast';

// initMockData();

export const bonusAPI = {
  // Mock bonus calculation/redemption - TODO: Bonus Service @3004
  getBalance: async (customerId) => {
    await new Promise(r => setTimeout(r, 300));
    const customer = (await customerAPI.getCustomerById(customerId)).data;
    return { data: { points: customer.points || 0 } };
  },

  calculateBonus: async (customerId, amount, tierMultiplier = 1) => {
    await new Promise(r => setTimeout(r, 400));
    const bonusPoints = Math.floor(amount * 0.1 * tierMultiplier); // 10% of amount
    return { data: { bonusPoints, multiplier: tierMultiplier } };
  },

  redeem: async (customerId, points) => {
    await new Promise(r => setTimeout(r, 500));
    let customers = loadMockData('customers') || generateCustomers();
    const index = customers.findIndex(c => c.id === customerId);
    if (index > -1 && customers[index].points >= points) {
      customers[index].points -= points;
      saveMockData('customers', customers);
      toast.success('Points redeemed');
      return { data: { success: true, remaining: customers[index].points } };
    }
    throw { response: { data: { error: 'Insufficient points' } } };
  },

  awardBonus: async (customerId, points, reason) => {
    await new Promise(r => setTimeout(r, 400));
    let customers = loadMockData('customers') || generateCustomers();
    const index = customers.findIndex(c => c.id === customerId);
    if (index > -1) {
      customers[index].points += points;
      saveMockData('customers', customers);
      toast.success(`Bonus ${points} points awarded: ${reason}`);
      return { data: { success: true, newBalance: customers[index].points } };
    }
    throw { response: { data: { error: 'Customer not found' } } };
  },
};

