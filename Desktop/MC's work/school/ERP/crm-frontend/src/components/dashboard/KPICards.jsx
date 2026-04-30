import React from 'react';

export const KPICards = ({ kpiData }) => {
  const cards = [
    { title: 'Total Customers', value: kpiData?.totalCustomers || 0, color: 'bg-blue-500' },
    { title: 'Active Transactions', value: kpiData?.activeTransactions || 0, color: 'bg-green-500' },
    { title: 'Pending Notifications', value: kpiData?.pendingNotifications || 0, color: 'bg-yellow-500' },
    { title: 'Total Bonus', value: `$${kpiData?.totalBonus || 0}`, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className={`${card.color} rounded-lg shadow p-6 text-white`}>
          <h3 className="text-sm font-medium opacity-90">{card.title}</h3>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
