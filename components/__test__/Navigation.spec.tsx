import { render, screen } from '@testing-library/react';
import Navigation from '../Navigation';

describe('Navigation', () => {
  it('Render correctly', () => {
    render(<Navigation />);

    const heading = screen.getByRole('heading', {
      name: 'delman.io',
    });

    expect(heading).toBeInTheDocument();
  });
});