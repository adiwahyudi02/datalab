import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { useGetUsers } from '../../../api/user/queries';
import Users from '../page';

const mockedUseGetUsers = useGetUsers as jest.Mock;
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

describe('Users page', () => {
  it('Should render the loading table', () => {
    mockedUseGetUsers.mockImplementation(() => ({
      isLoading: true,
    }));

    render(<Users />, { wrapper });

    expect(screen.getByTestId('loading-table')).toBeInTheDocument();
  });

  it('Should render the header', () => {
    render(<Users />, { wrapper });

    const heading = screen.getByText('Users Data');
    const description = screen.getByText('List of Users Data');

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('Should render the user list', () => {
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

    mockedUseGetUsers.mockImplementation(() => ({
      status: 'success',
      data,
    }));

    render(<Users />, { wrapper });

    data.forEach(item => {
      expect(screen.getByText(item.id)).toBeInTheDocument();
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.email)).toBeInTheDocument();
      expect(screen.getByText(item.country_name)).toBeInTheDocument();
      expect(screen.getByText(item.device_id)).toBeInTheDocument();
      expect(screen.getByText(item.bitcoin_address)).toBeInTheDocument();
      expect(screen.getByText(item.avatar)).toBeInTheDocument();
      expect(screen.getByText(item.login_ip)).toBeInTheDocument();
      expect(screen.getByText(item.age)).toBeInTheDocument();
      expect(screen.getByText(item.referral_id)).toBeInTheDocument();
      expect(screen.getByText(item.locale)).toBeInTheDocument();
      expect(screen.getByText(item.invoice_email_address)).toBeInTheDocument();
      expect(screen.getByText(item.hmac_secret)).toBeInTheDocument();
      expect(screen.getByText(item.primary_color)).toBeInTheDocument();
      expect(screen.getByText(item.secondary_color)).toBeInTheDocument();
      expect(screen.getByText(item.material)).toBeInTheDocument();
      expect(screen.getByText(item.shipping_address)).toBeInTheDocument();
      expect(screen.getByText(item.zip_code)).toBeInTheDocument();
      expect(screen.getByText(item.latitude)).toBeInTheDocument();
      expect(screen.getByText(item.longitude)).toBeInTheDocument();
      expect(screen.getByText(item.favorite_animal)).toBeInTheDocument();
      expect(screen.getByText(item.timezone)).toBeInTheDocument();
    });
  });
});