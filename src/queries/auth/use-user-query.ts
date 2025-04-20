import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export namespace UseUserQuery {
  export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
  };

  export const key = ['get-user'];

  export const fn = async () => {
    try {
      return await invoke<User>('get_logged_in_user', {
        token: localStorage.getItem('token'),
      });
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
