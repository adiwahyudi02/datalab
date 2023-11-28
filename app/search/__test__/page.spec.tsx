import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useGetUsers, useGetUser, useDeleteUser } from '../../../api/user/queries';
import Search from '../page';

const mockedUseGetUsers = useGetUsers as jest.Mock;
const mockedUseGetUser = useGetUser as jest.Mock;
const mockedUseDeleteUser = useDeleteUser as jest.Mock;

jest.mock('../../../api/user/queries');

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

const data = [
  {
    id: '6e2b4b81-5307-4ab4-a696-d7de164aa83c',
    name: 'Rafael Pfeffer',
    email: 'Julio_Larson22@gmail.com',
    country_name: 'Virgin Islands, British',
    device_id: '3286ee6d-3dce-417b-bae6-7e5e8bdf0bea',
    bitcoin_address: '19ZnfEkvBsX766C6gAZ36vhNV',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/835.jpg',
    login_ip: '129.189.184.250',
    active_device_mac: '41:f1:23:04:56:2d',
    notes: 'laudantium necessitatibus dignissimos',
    age: 14,
    referral_id: 785,
    locale: 'de',
    favorite_music: 'Electronic',
    phone_number: '267.401.1721',
    twitter_username: 'Jesse75',
    job: 'Planner',
    invoice_email_address: 'Cordelia_Ledner40@gmail.com',
    hmac_secret: 'tukocuwefuqatabaxazu',
    favorite_quote: 'possimus et est',
    primary_color: 'olive',
    secondary_color: 'red',
    material: 'Wooden',
    shipping_address: '74062 Blanda View Apt. 448',
    zip_code: '11510',
    latitude: '17.5300',
    longitude: '13.4784',
    favorite_animal: 'cetacean',
    app_version: 'b8136ad',
    timezone: 'America/Guyana'
  },
  {
    id: 'd35d12a2-c168-42ab-b856-02806bbb9293',
    name: 'Austin Bartell',
    email: 'Luis_Rice81@yahoo.com',
    country_name: 'Turkmenistan',
    device_id: '56f16444-9c54-4339-b942-7f4ffb9afbf3',
    bitcoin_address: '3RwM9F4PceY57z2ctS35eMJF2ok1',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/434.jpg',
    login_ip: '168.26.25.172',
    active_device_mac: '2e:bc:7e:a6:7d:e7',
    notes: 'aliquam aut qui',
    age: 47,
    referral_id: 287,
    locale: 'pt_BR',
    favorite_music: 'Rock',
    phone_number: '1-688-281-3596 x681',
    twitter_username: 'Nyah_Koelpin47',
    job: 'Director',
    invoice_email_address: 'Jaiden47@yahoo.com',
    hmac_secret: 'lixanuqunifiqozapada',
    favorite_quote: 'aliquid nihil assumenda',
    primary_color: 'azure',
    secondary_color: 'orchid',
    material: 'Metal',
    shipping_address: '96910 Marilie Place Suite 171',
    zip_code: '01293-2115',
    latitude: '80.3722',
    longitude: '-90.4314',
    favorite_animal: 'snake',
    app_version: '6e2b51f',
    timezone: 'Europe/Berlin'
  },
];

describe('Search page', () => {
  beforeEach(() => {
    mockedUseGetUsers.mockImplementation(() => ({
      data,
    }));

    render(<Search />, { wrapper });
  });

  it('Should render the header', () => {
    const heading = screen.getByText('Search User');
    const description = screen.getByText('Search existing user');

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('Should render the search input', () => {
    const searchinput = screen.getByPlaceholderText('Search by email');
    expect(searchinput).toBeInTheDocument();
  });

  it('Should render list of user when search', async () => {
    const searchinput = screen.getByPlaceholderText('Search by email');
    fireEvent.input(searchinput, { target: { value: 'Julio_Larson22@gmail.com' } });

    await waitFor(() => {
      expect(screen.getByText('Julio_Larson22@gmail.com')).toBeInTheDocument();
    });
  });

  it('Should render the user not found message if search not found', async () => {
    const searchinput = screen.getByPlaceholderText('Search by email');
    fireEvent.input(searchinput, { target: { value: 'Julio_Larson22@gmail.com_123' } });

    await waitFor(() => {
      expect(screen.getByText('User not found')).toBeInTheDocument();
    });
  });

  it('Should show details when click view user button', async () => {
    // search
    const searchinput = screen.getByPlaceholderText('Search by email');
    fireEvent.input(searchinput, { target: { value: 'Julio_Larson22@gmail.com' } });
    await waitFor(() => {
      expect(screen.getByText('Julio_Larson22@gmail.com')).toBeInTheDocument();
    });

    // mock get user detail and delete
    mockedUseGetUser.mockImplementation(() => ({
      data: data[0],
    }));
    mockedUseDeleteUser.mockImplementation(() => ({
      mutate: () => jest.fn(),
    }));

    // click button view user
    const detailButton = screen.getByRole('view-detail-button');
    fireEvent.click(detailButton);

    // show user details
    await waitFor(() => {
      expect(screen.getByText(/Virgin Islands, British/i)).toBeInTheDocument();
      expect(screen.getByText(/laudantium necessitatibus dignissimos/i)).toBeInTheDocument();
    });
  });
});