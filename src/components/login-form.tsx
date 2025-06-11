import { useRouteContext } from '@tanstack/react-router';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { cn } from '@/libs/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const { auth } = useRouteContext({
    from: '/auth/login',
  });
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>();

  const handleLogin: SubmitHandler<{
    email: string;
    password: string;
  }> = async (data) => {
    await auth.login({ credentials: data, redirect: '/' }).catch(() => {
      setError('root', { message: 'Invalid email or password' });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="m@example.com"
            {...register('email', { required: true })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...register('password', { required: true })}
          />
        </div>
        {errors.root && (
          <div className="-mt-4">
            <p className="text-red-500 text-xs" data-testid="error-message">
              {errors.root.message}
            </p>
          </div>
        )}
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
    </form>
  );
}
