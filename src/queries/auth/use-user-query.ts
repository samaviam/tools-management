import { eq } from 'drizzle-orm';
import { invoke } from '@tauri-apps/api/core';
import { useQuery } from '@tanstack/react-query';
import db from '@/db';
import { users } from '@/db/schema';

export namespace UseUserQuery {
  export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    last_login_at: string;
  };

  export const key = ['get-user'];

  export const fn = async () => {
    try {
      const userId = await invoke<number>('get_logged_in_user', {
        token: localStorage.getItem('token'),
      });

      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .get();

      if (!user) throw new Error();

      return user as UseUserQuery.User;
    } catch (err: unknown) {
      localStorage.removeItem('token');
    }
  };
}

export const useGetUser = () =>
  useQuery({
    queryKey: UseUserQuery.key,
    queryFn: UseUserQuery.fn,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
