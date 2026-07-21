# Task Plan: Bonus Calculation Rules Tab

## Information Gathered:
1. **Dashboard.jsx** - Already calculates tier percentages to sum to exactly 100% (implemented correctly!)
2. **AdminPanel.jsx** - Has tabs: notifications, rules, users, logs. Uses RuleEngineEditor for classification rules
3. **BonusCalculator.jsx** - Has hardcoded bonus rates: bronze: 0.01, silver: 0.015, gold: 0.02, platinum: 0.03
4. **RuleEngineEditor.jsx** - Allows configuring classification rules/factors/thresholds

## Requirements:
1. Add a tab on Admin/Manager dashboard to set rules for bonus calculation (bonus rates per tier)
2. Ensure tier dashboard percentages sum to 100% (already done!)

## Plan:
1. Create a new BonusRulesEditor component to configure bonus rates per tier
2. Add "bonus" tab to AdminPanel that uses BonusRulesEditor
3. Update BonusCalculator to use the configured bonus rates from storage

## Steps (COMPLETED):
1. ✅ Create src/components/admin/BonusRulesEditor.jsx - Editor for bonus rates per tier
2. ✅ Edit src/pages/AdminPanel.jsx - Add "bonus" tab
3. ✅ Edit src/components/transactions/BonusCalculator.jsx - Use configured rates from storage
4. ✅ Dashboard tier distribution already sums to 100%
