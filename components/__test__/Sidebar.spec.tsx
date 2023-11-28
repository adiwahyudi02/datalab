import { fireEvent, render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';
import { SidebarProvider } from '@/contexts/SidebarContext';

describe('Sidebar', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });

    render(
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    );
  });

  it('Render correctly', () => {
    const menuButton = screen.getByRole('sidebar-button');
    const dashboardMenu = screen.getByRole('link', { name: 'Dashboard', });
    const usersMenu = screen.getByRole('link', { name: 'Users' });
    const registrationMenu = screen.getByRole('link', { name: 'Registration' });
    const searchMenu = screen.getByRole('link', { name: 'Search' });


    expect(menuButton).toBeInTheDocument();
    expect(dashboardMenu).toBeInTheDocument();
    expect(usersMenu).toBeInTheDocument();
    expect(registrationMenu).toBeInTheDocument();
    expect(searchMenu).toBeInTheDocument();
  });

  it('Expand and collapse the sidebar correctly', () => {
    const menuButton = screen.getByRole('sidebar-button');
    const sidebar = screen.getByRole('sidebar');

    // expand
    fireEvent.click(menuButton);
    expect(sidebar).toHaveStyle("width: 15rem");

    // collapse
    fireEvent.click(menuButton);
    expect(sidebar).toHaveStyle("width: 3.8rem");
  });

  it('Should call localstorage to get sidebar value on render', () => {
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('Should call localStorage setItem on sidebar-button click', () => {
    const menuButton = screen.getByRole('sidebar-button');
    fireEvent.click(menuButton);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(window.localStorage.setItem).toHaveBeenCalledWith('sidebar', 'false');
  });
});