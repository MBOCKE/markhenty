import React, { useState } from 'react';

export const RuleEngineEditor = ({ initialRules, onSave }) => {
  const [rules, setRules] = useState(initialRules || '');

  const handleSave = () => {
    onSave(rules);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4">Rule Engine Editor</h2>
      <div className="space-y-4">
        <textarea
          value={rules}
          onChange={(e) => setRules(e.target.value)}
          className="w-full h-96 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
          placeholder="Enter classification rules in JSON format"
        />
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Save Rules
        </button>
      </div>
    </div>
  );
};

export default RuleEngineEditor;
