import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { useGetSales } from '../../api/sales/queries';
import Sales from '../page';

const mockedUseGetSales = useGetSales as jest.Mock;
jest.mock('../../api/sales/queries');

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

describe('Sales page', () => {
  it('Should render the loading table', () => {
    mockedUseGetSales.mockImplementation(() => ({
      isLoading: true,
    }));

    render(<Sales />, { wrapper });

    expect(screen.getByTestId('loading-table')).toBeInTheDocument();
  });

  it('Should render the header', () => {
    render(<Sales />, { wrapper });

    const heading = screen.getByText('Sales Dashboard');
    const description = screen.getByText('List of Sales Data');

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('Should render sales list', () => {
    const data = [
      {
        id: 1,
        name: 'Johns - Hessel',
        sales_id: '20-6028760',
        item_id: 588,
        qty: 3,
        consumen_name: 'Arnold Altenwerth',
        transaction_date: '2023-11-20T14:45:18.274Z'
      },
      {
        id: 2,
        name: 'Schaefer, Leffler and Price',
        sales_id: '78-2557422',
        item_id: 719,
        qty: 6,
        consumen_name: 'Dennis McGlynn',
        transaction_date: '2023-11-19T15:24:43.425Z'
      },
    ];

    mockedUseGetSales.mockImplementation(() => ({
      status: 'success',
      data,
    }));

    render(<Sales />, { wrapper });

    data.forEach(item => {
      expect(screen.getByText(item.id)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.sales_id)).toBeInTheDocument();
      expect(screen.getByText(item.item_id)).toBeInTheDocument();
      expect(screen.getByText(item.qty)).toBeInTheDocument();
      expect(screen.getByText(item.consumen_name)).toBeInTheDocument();
      expect(screen.getByText(item.transaction_date)).toBeInTheDocument();
    });
  });
});