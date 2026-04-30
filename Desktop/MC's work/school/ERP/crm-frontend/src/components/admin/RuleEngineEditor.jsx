import React, { useState, useEffect } from 'react';
import { loadMockData, saveMockData } from '../../utils/mockData';
import { defaultRules } from '../../utils/mockData';
import toast from 'react-hot-toast';

export const RuleEngineEditor = ({ onSave }) => {
  const [rules, setRules] = useState({});
  const [activeScenario, setActiveScenario] = useState('big_spender');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load existing rules or use defaults
    const existingRules = loadMockData('rules') || defaultRules;
    setRules(existingRules);
  }, []);

  const handleFactorChange = (factor, field, value) => {
    setRules(prev => ({
      ...prev,
      factors: {
        ...prev.factors,
        [factor]: {
          ...prev.factors[factor],
          [field]: value
        }
      }
    }));
  };

  const handleThresholdChange = (tier, value) => {
    setRules(prev => ({
      ...prev,
      tierThresholds: {
        ...prev.tierThresholds,
        [tier]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with Rules Service API call @3004
      // const response = await rulesAPI.updateRules(rules);
      saveMockData('rules', rules);
      toast.success('Rules saved successfully');
      if (onSave) onSave(rules);
    } catch (error) {
      toast.error('Failed to save rules');
    } finally {
      setIsLoading(false);
    }
  };

  const scenarios = [
    { id: 'big_spender', name: 'Big Spender', description: 'High value customers' },
    { id: 'loyal_fan', name: 'Loyal Fan', description: 'Long-term loyal customers' },
    { id: 'super_user', name: 'Super User', description: 'Highly engaged users' },
    { id: 'balanced', name: 'Balanced', description: 'Well-rounded customers' },
    { id: 'retention', name: 'Retention', description: 'At-risk customers' },
  ];

  const factors = [
    { key: 'purchaseFrequency', name: 'Purchase Frequency', description: 'How often they buy' },
    { key: 'avgOrderValue', name: 'Average Order Value', description: 'Average transaction amount' },
    { key: 'loyaltyYears', name: 'Loyalty Years', description: 'Years as customer' },
    { key: 'totalSpent', name: 'Total Spent', description: 'Lifetime value' },
    { key: 'lastPurchase', name: 'Days Since Last Purchase', description: 'Recency' },
    { key: 'pointsBalance', name: 'Points Balance', description: 'Current loyalty points' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Rule Engine Configuration</h2>
        <p className="text-gray-600 mb-6">Configure classification rules and thresholds for customer tier assignment</p>

        {/* Scenarios */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Active Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map(scenario => (
              <div
                key={scenario.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  rules.scenarios?.includes(scenario.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  const newScenarios = rules.scenarios?.includes(scenario.id)
                    ? rules.scenarios.filter(s => s !== scenario.id)
                    : [...(rules.scenarios || []), scenario.id];
                  setRules(prev => ({ ...prev, scenarios: newScenarios }));
                }}
              >
                <h4 className="font-medium">{scenario.name}</h4>
                <p className="text-sm text-gray-600">{scenario.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Factors Configuration */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Factor Weights</h3>
          <div className="space-y-4">
            {factors.map(factor => (
              <div key={factor.key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{factor.name}</h4>
                  <p className="text-sm text-gray-600">{factor.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rules.factors?.[factor.key]?.enabled ?? true}
                      onChange={(e) => handleFactorChange(factor.key, 'enabled', e.target.checked)}
                      className="mr-2"
                    />
                    Enabled
                  </label>
                  <div className="flex items-center">
                    <label className="mr-2">Weight:</label>
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.1"
                      value={rules.factors?.[factor.key]?.weight ?? 0.2}
                      onChange={(e) => handleFactorChange(factor.key, 'weight', parseFloat(e.target.value))}
                      className="w-20 px-2 py-1 border rounded"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tier Thresholds */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Tier Thresholds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(rules.tierThresholds || {}).map(([tier, threshold]) => (
              <div key={tier} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">{tier}</span>
                <div className="flex items-center">
                  <label className="mr-2">Min Score:</label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => handleThresholdChange(tier, parseInt(e.target.value))}
                    className="w-24 px-2 py-1 border rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Rules Configuration'}
        </button>
      </div>
    </div>
  );
};

export default RuleEngineEditor;
