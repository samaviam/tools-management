import { Outlet, createFileRoute } from '@tanstack/react-router';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Header } from '@/components/layout/header';
import Providers from '@/providers';
import { cn } from '@/libs/utils';

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ context, location }) => {
    context.auth.redirectIfUnauthenticated(location.pathname);
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <Providers>
      <AppSidebar />

      <div
        id="content"
        className={cn(
          'ml-auto w-full max-w-full',
          'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
          'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
          'transition-[width] duration-200 ease-linear',
          'flex h-svh flex-col',
          'group-data-[scroll-locked=1]/body:h-full',
          'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh',
        )}
      >
        <Header>{null}</Header>

        <Outlet />
      </div>
    </Providers>
  );
}
