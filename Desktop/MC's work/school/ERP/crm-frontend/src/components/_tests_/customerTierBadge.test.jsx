import { render, screen } from '@testing-library/react';
import { CustomerTierBadge } from '../customers/CustomerTierBadge';

describe('CustomerTierBadge', () => {
  it('renders PREMIUM tier with correct styling', () => {
    render(<CustomerTierBadge tier="PREMIUM" />);
    expect(screen.getByText('PREMIUM')).toBeInTheDocument();
    expect(screen.getByText('PREMIUM')).toHaveClass('bg-yellow-100');
  });
});