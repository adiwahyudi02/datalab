import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('Render correctly', () => {
    render(
      <Header
        heading="Users Data"
        description="List of Users Data"
      />
    );

    const heading = screen.getByRole('heading', {
      name: 'Users Data',
    });
    const description = screen.getByText('List of Users Data');

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});