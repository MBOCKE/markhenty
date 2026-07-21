import React, { useState, useEffect } from 'react';
import { loadMockData, saveMockData } from '../../utils/mockData';
import toast from 'react-hot-toast';

const DEFAULT_BONUS_RATES = {
  bronze: 0.01,
  silver: 0.015,
  gold: 0.02,
  platinum: 0.03,
};

export const BonusRulesEditor = ({ onSave }) => {
  const [bonusRates, setBonusRates] = useState(DEFAULT_BONUS_RATES);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const existingRates = loadMockData('bonusRates');
    if (existingRates) {
      setBonusRates(existingRates);
    }
  }, []);

  const handleRateChange = (tier, value) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 1) {
      setBonusRates(prev => ({
        ...prev,
        [tier]: numValue,
      }));
    }
  };

  const validateTotal = () => {
    return true;
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      saveMockData('bonusRates', bonusRates);
      toast.success('Bonus rates saved successfully');
      if (onSave) onSave(bonusRates);
    } catch (error) {
      toast.error('Failed to save bonus rates');
    } finally {
      setIsLoading(false);
    }
  };

  const tiers = [
    { key: 'bronze', name: 'Bronze', color: 'bg-amber-700' },
    { key: 'silver', name: 'Silver', color: 'bg-gray-400' },
    { key: 'gold', name: 'Gold', color: 'bg-yellow-500' },
    { key: 'platinum', name: 'Platinum', color: 'bg-purple-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Bonus Rate Configuration</h2>
        <p className="text-gray-600 mb-6">
          Set the bonus calculation rates for each customer tier. These rates determine what percentage of their purchase amount customers receive as bonus points.
        </p>

        <div className="space-y-4">
          {tiers.map(tier => (
            <div key={tier.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <span className={`w-4 h-4 rounded-full mr-3 ${tier.color}`}></span>
                <span className="font-medium">{tier.name}</span>
              </div>
              <div className="flex items-center">
                <label className="mr-2">Rate (%):</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={(bonusRates[tier.key] * 100).toFixed(1)}
                  onChange={(e) => handleRateChange(tier.key, parseFloat(e.target.value) / 100)}
                  className="w-24 px-2 py-1 border rounded"
                />
                <span className="ml-2 text-gray-600">
                  ({(bonusRates[tier.key] * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> The bonus rate determines what percentage of their purchase amount customers receive as bonus points.
            For example, a 2% rate on a 10000 XAF purchase would give 2 bonus (points whiich has a value 200 XAF).
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Bonus Rates'}
        </button>
      </div>
    </div>
  );
};

export default BonusRulesEditor;
