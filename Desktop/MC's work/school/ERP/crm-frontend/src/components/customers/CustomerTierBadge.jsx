const tierColors = {
  PREMIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  STANDARD: 'bg-gray-100 text-gray-800 border-gray-300',
  NORMAL: 'bg-blue-100 text-blue-800 border-blue-300',
  BRONZE: 'bg-orange-100 text-orange-800 border-orange-300',
  NEW: 'bg-green-100 text-green-800 border-green-300',
};

export const CustomerTierBadge = ({ tier }) => {
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${tierColors[tier] || tierColors.NEW}`}>
      {tier}
    </span>
  );
};