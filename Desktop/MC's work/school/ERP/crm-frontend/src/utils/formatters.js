export const formatCurrency = (amount, currency = 'XAF') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatDate = (date, format = 'short') => {
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' },
  };

  return new Intl.DateTimeFormat('en-US', options[format] || options.short).format(
    new Date(date)
  );
};

export const formatNumber = (number, decimals = 2) => {
  return parseFloat(number).toFixed(decimals);
};

export const formatPercent = (value, decimals = 1) => {
  return `${parseFloat(value).toFixed(decimals)}%`;
};
