import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { invoke } from '@tauri-apps/api/core';
import { type QueryClient, useMutation } from '@tanstack/react-query';
import type { Register } from '@tanstack/react-router';
import { UseUserQuery } from './use-user-query';
import db from '@/db';
import { users } from '@/db/schema';

export namespace UseLoginMutation {
  export type Credentials = {
    email: string;
    password: string;
  };

  export const key = ['use-login'];

  export const fn = async ({
    credentials,
  }: { credentials: Credentials; redirect?: string }) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, credentials.email))
      .get();

    if (!user || !bcrypt.compareSync(credentials.password, user.password)) {
      throw new Error('Invalid credentials');
    }

    const token = await invoke<string>('login', { userId: user.id });

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
