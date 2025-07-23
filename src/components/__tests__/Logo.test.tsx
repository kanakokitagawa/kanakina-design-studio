
import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo', () => {
  it('renders the logo text correctly', () => {
    render(<Logo />);
    const logoElement = screen.getByText('KDS');
    expect(logoElement).toBeInTheDocument();
  });

  it('has the correct link to the homepage', () => {
    render(<Logo />);
    const logoLink = screen.getByRole('link', { name: 'KDS' });
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
