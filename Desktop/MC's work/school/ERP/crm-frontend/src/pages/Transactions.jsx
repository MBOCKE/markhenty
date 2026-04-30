import React, { useState, useEffect } from 'react';
import { TransactionList } from '../components/transactions/TransactionList';
import { BonusCalculator } from '../components/transactions/BonusCalculator';

export const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions
    const mockData = [
      { id: 'TXN001', customerName: 'John Doe', amount: 250, status: 'completed', date: '2024-04-20' },
      { id: 'TXN002', customerName: 'Jane Smith', amount: 500, status: 'completed', date: '2024-04-19' },
      { id: 'TXN003', customerName: 'Bob Johnson', amount: 100, status: 'pending', date: '2024-04-18' },
    ];
    setTransactions(mockData);
  }, []);

  const handleBonusCalculate = (data) => {
    console.log('Bonus calculated:', data);
  };

  const exportTransactions = () => {
    // Mock export
    const csv = transactions.map(t => `${t.id},${t.customerName},${t.amount},${t.status},${t.date}`).join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
        <button onClick={exportTransactions} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Export Transactions
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions} />
        </div>
        <div>
          <BonusCalculator onCalculate={handleBonusCalculate} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;
