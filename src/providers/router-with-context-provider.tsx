import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/route-tree.gen';
import useAuth, { type Auth } from '@/hooks/use-auth';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: { auth: null as unknown as Auth },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const RouterWithContextProvider = () => {
  const auth = useAuth(router);

  return <RouterProvider router={router} context={{ auth }} />;
};

export default RouterWithContextProvider;
