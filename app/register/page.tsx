'use client'

import Header from '@/components/Header';
import { WarningIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInput {
  name: string;
  email: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Please provide name"),
  email: yup.string().required('Please provide email').email('Email is invalid'),
});

const FormLabelInvalid = {
  color: 'red.500'
};

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    shouldFocusError: false,
  });

  const onSubmit = (values: IFormInput) => {
    // POST 
  }

  return (
    <>
      <Header
        heading="User Registration"
        description="Add new User"
      />
      <Box
        as="main"
        maxW={96}
        p={6}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={5}>
            <FormControl isInvalid={!!errors.name}>
              <FormLabel _invalid={FormLabelInvalid}>
                Name
              </FormLabel>
              <Input
                type="text"
                {...register('name')}
              />
              <FormErrorMessage>
                <WarningIcon mr={2} />
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel _invalid={FormLabelInvalid}>
                Email
              </FormLabel>
              <Input
                type="email"
                {...register('email')}
              />
              <FormErrorMessage>
                <WarningIcon mr={2} />
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <Flex justify="end">
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText="Submitting"
                isDisabled={Object.keys(errors).length !== 0}
                _disabled={{
                  bg: 'gray.300',
                  cursor: 'not-allowed',
                  _hover: {
                    bg: 'gray.300',
                  }
                }}
              >
                Submit User
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </>
  )
}
