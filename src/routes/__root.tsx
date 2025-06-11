import type { Auth } from '@/hooks/use-auth';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

interface RouterContext {
  auth: Auth;
}

const isDevelopmentEnv = process.env.NODE_ENV === 'development';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />

      {isDevelopmentEnv ? <TanStackRouterDevtools /> : null}
    </>
  );
}
