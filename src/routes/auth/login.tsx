import { LoginForm } from '@/components/login-form';
import ThemeProvider from '@/providers/theme-provider';
import { createFileRoute, redirect } from '@tanstack/react-router';
import overlay from '@/assets/img/login-overlay.jpeg';

export const Route = createFileRoute('/auth/login')({
  preload: true,
  beforeLoad: ({ context }) => {
    if (context.auth.check()) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block">
          <img
            src={overlay}
            alt="Login overlay"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6] dark:grayscale"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
