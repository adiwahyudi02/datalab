import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SearchInput from '../SearchInput';

const placeholder = 'Search by email';

describe('SearchInput', () => {
  it('Render correctly', async () => {
    const mockOnsearch = jest.fn();
    render(
      <SearchInput
        placeholder={placeholder}
        onSearch={mockOnsearch}
      />
    );

    const input = screen.queryByPlaceholderText(placeholder);
    const resetButton = screen.getByRole('reset-button');

    expect(input).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it('If searchOnChange props is false, it should call onSearch only by typing enter or submit the form', () => {
    const mockOnsearch = jest.fn();
    render(
      <SearchInput
        placeholder={placeholder}
        onSearch={mockOnsearch}
      />
    );

    const form = screen.getByTestId('search-form');
    const input = screen.queryByPlaceholderText(placeholder);

    // it should not call onsearch function when the input changes 
    fireEvent.change(input!, { target: { value: 'Adi' } });
    expect(mockOnsearch).toHaveBeenCalledTimes(0);

    // it should call onsearch function when submit the form 
    fireEvent.submit(form);
    expect(mockOnsearch).toHaveBeenCalledTimes(1);
  });

  it('If searchOnChange props is true, it should call onSearch when the input changes', () => {
    const mockOnsearch = jest.fn();
    render(
      <SearchInput
        placeholder={placeholder}
        onSearch={mockOnsearch}
        searchOnChange
      />
    );

    const input = screen.queryByPlaceholderText(placeholder);

    fireEvent.change(input!, { target: { value: 'Adi' } });
    expect(mockOnsearch).toHaveBeenCalledTimes(1);
  });

  it('Sholud reset the search value when the reset button clicks', () => {
    const mockOnsearch = jest.fn();
    render(
      <SearchInput
        placeholder={placeholder}
        onSearch={mockOnsearch}
      />
    );

    const input = screen.queryByPlaceholderText(placeholder);
    const resetButton = screen.getByRole('reset-button');

    fireEvent.change(input!, { target: { value: 'Adi' } });
    expect(input).toHaveValue('Adi');

    fireEvent.click(resetButton);
    expect(input).toHaveValue('');
  });
});