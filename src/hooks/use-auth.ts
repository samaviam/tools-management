import { useCallback, useEffect } from 'react';
import {
  type UseMutateAsyncFunction,
  useQueryClient,
} from '@tanstack/react-query';
import type { Register } from '@tanstack/react-router';
import { useGetUser, useLogin, useLogout } from '@/queries/auth';
import type { UseUserQuery } from '@/queries/auth/use-user-query';
import type { UseLoginMutation } from '@/queries/auth/use-login-mutation';

export interface Auth {
  user: UseUserQuery.User | undefined;
  check: () => boolean;
  middleware: (callback: () => void) => void;
  redirectIfUnauthenticated: (redirect?: string) => void;
  login: UseMutateAsyncFunction<
    string,
    Error,
    {
      credentials: UseLoginMutation.Credentials;
      redirect?: string;
    },
    unknown
  >;
  logout: UseMutateAsyncFunction<
    void,
    Error,
    {
      redirect?: string;
    },
    unknown
  >;
}

const useAuth = (router: Register['router']): Auth => {
  const queryClient = useQueryClient();

  const { data: user, error } = useGetUser();

  useEffect(() => {
    router.invalidate();
  }, [user, error]);

  const check = useCallback(() => !!localStorage.getItem('token'), [user]);

  const redirectIfUnauthenticated = useCallback(
    (redirect = '/') => {
      if (!check()) {
        router.navigate({
          replace: true,
          to: '/auth/login',
          search: { redirect },
        });
      }
    },
    [user, router],
  );

  const middleware = useCallback(
    (callback: () => void) => {
      if (check()) {
        return callback();
      }

      router.navigate({ to: '/auth/login', search: { redirect: '/' } });
    },
    [user, router],
  );

  const loginMutation = useLogin(router, queryClient);

  const logoutMutation = useLogout(router, queryClient);

  return {
    user: user,
    check,
    middleware,
    redirectIfUnauthenticated,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};

export default useAuth;
