import { type QueryClient, useMutation } from '@tanstack/react-query';
import type { Register } from '@tanstack/react-router';
import { invoke } from '@tauri-apps/api/core';
import { UseUserQuery } from './use-user-query';

export namespace UseLoginMutation {
  export type Credentials = {
    email: string;
    password: string;
  };

  export const key = ['use-login'];

  export const fn = async ({
    credentials,
  }: { credentials: Credentials; redirect?: string }) => {
    const token = await invoke<string>('login', credentials);

    localStorage.setItem('token', token);

    return token;
  };
}

export const useLogin = (
  router: Register['router'],
  queryClient: QueryClient,
) =>
  useMutation(
    {
      mutationKey: UseLoginMutation.key,
      mutationFn: UseLoginMutation.fn,
      onSuccess: (data, variables) => {
        queryClient.setQueryData(UseUserQuery.key, data);

        router.navigate({
          replace: true,
          reloadDocument: true,
          to: variables.redirect || '/',
        });
      },
    },
    queryClient,
  );
