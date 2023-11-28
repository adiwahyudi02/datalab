import { render, screen } from '@testing-library/react';
import Main from '../Main';
import { SidebarProvider } from '@/contexts/SidebarContext';

describe('Main', () => {
  it('Render children correctly', () => {
    render(
      <SidebarProvider>
        <Main>
          <p>Test</p>
        </Main>
      </SidebarProvider>
    );

    const children = screen.getByText('Test');
    expect(children).toBeInTheDocument();
  });
});