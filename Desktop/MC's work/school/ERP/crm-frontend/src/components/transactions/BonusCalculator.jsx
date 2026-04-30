import React, { useState } from 'react';

export const BonusCalculator = ({ onCalculate }) => {
  const [spendAmount, setSpendAmount] = useState('');
  const [tier, setTier] = useState('bronze');
  const [bonusPoints, setBonusPoints] = useState(null);

  const handleCalculate = () => {
    if (!spendAmount) return;
    const bonus = calculateBonus(parseFloat(spendAmount), tier);
    setBonusPoints(bonus);
    onCalculate?.({ amount: spendAmount, tier, bonus });
  };

  const calculateBonus = (amount, tier) => {
    const rates = { bronze: 0.01, silver: 0.015, gold: 0.02, platinum: 0.03 };
    return (amount * rates[tier]).toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Bonus Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Spend Amount ($)</label>
          <input
            type="number"
            value={spendAmount}
            onChange={(e) => setSpendAmount(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tier</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="bronze">Bronze</option>
            <option value="silver">Silver</option>
            <option value="gold">Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Calculate Bonus
        </button>
        {bonusPoints !== null && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <p className="text-center">
              <span className="text-gray-600">Bonus Points: </span>
              <span className="text-2xl font-bold text-blue-600">{bonusPoints}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BonusCalculator;
