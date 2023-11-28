import { SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useState } from 'react';

interface ISearchInputProps {
  placeholder?: string;
  searchOnChange?: boolean;
  onSearch: (search: string) => void;
};

export default function SearchInput({
  placeholder = 'Search',
  searchOnChange = false,
  onSearch,
}: ISearchInputProps) {
  const [search, setSearch] = useState('');

  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (searchOnChange) onSearch(e.target.value);
  }

  const handleReset = () => {
    setSearch('');
    onSearch('');
  };

  return (
    <form
      onSubmit={handleSubmitSearch}
      data-testid="search-form"
    >
      <Flex
        direction="column"
        gap="5"
      >
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder={placeholder}
            value={search}
            onChange={handleChangeSearch}
          />
          <InputRightElement>
            <Flex
              as="button"
              type="button"
              bg="gray.500"
              color="white"
              borderRadius="50%"
              onClick={handleReset}
              role="reset-button"
            >
              <SmallCloseIcon boxSize={3} />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </form>
  );
}