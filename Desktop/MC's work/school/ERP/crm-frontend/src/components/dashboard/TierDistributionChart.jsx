import React from 'react';

export const TierDistributionChart = ({ tierData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Tier Distribution</h2>
      <div className="space-y-4">
        {tierData?.map((tier) => (
          <div key={tier.name}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{tier.name}</span>
              <span className="text-sm font-medium text-gray-600">{tier.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${tier.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TierDistributionChart;
