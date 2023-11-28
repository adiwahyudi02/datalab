import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from '../page';

const mockedMutate = jest.fn();
jest.mock('../../../api/user/queries', () => {
  return ({
    useRegisterUser: () => ({ mutate: mockedMutate }),
  })
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('Register page', () => {
  beforeEach(() => {
    render(<Register />, { wrapper });
  });

  it('Should render the header', () => {
    const heading = screen.getByText('User Registration');
    const description = screen.getByText('Add new User');

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('Should render the form', () => {
    const name = screen.getByLabelText('name');
    const email = screen.getByLabelText('email');
    const buttonSubmit = screen.getByRole('submit');

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();
  });

  it('Should return validation if submit with empty form', async () => {
    const name = screen.getByLabelText('name');
    const email = screen.getByLabelText('email');
    const buttonSubmit = screen.getByRole('submit');

    fireEvent.input(name, { target: { value: '' } });
    fireEvent.input(email, { target: { value: '' } });

    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      expect(screen.getByText('Please provide name')).toBeInTheDocument();
      expect(screen.getByText('Please provide email')).toBeInTheDocument();
    });
  });

  it('Should call mutate if submit with correct value', async () => {
    const name = screen.getByLabelText('name');
    const email = screen.getByLabelText('email');
    const buttonSubmit = screen.getByRole('submit');

    fireEvent.input(name, { target: { value: 'Adi' } });
    fireEvent.input(email, { target: { value: 'adi.whyd02@gmail.com' } });

    fireEvent.click(buttonSubmit);
    await waitFor(() => {
      expect(mockedMutate).toHaveBeenCalledTimes(1);
    });
  });
});