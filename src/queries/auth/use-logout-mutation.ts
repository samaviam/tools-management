import { type QueryClient, useMutation } from '@tanstack/react-query';
import type { Register } from '@tanstack/react-router';
import { UseUserQuery } from './use-user-query';

export namespace UseLogoutMutation {
  export const key = ['use-logout'];

  export const fn = async (_: { redirect?: string }) => {
    localStorage.removeItem('token');
  };
}

export const useLogout = (
  router: Register['router'],
  queryClient: QueryClient,
) =>
  useMutation(
    {
      mutationKey: UseLogoutMutation.key,
      mutationFn: UseLogoutMutation.fn,
      onSuccess: (_, variables) => {
        queryClient.setQueryData(UseUserQuery.key, null);

        router.navigate({ to: variables?.redirect || '/' });
      },
    },
    queryClient,
  );
