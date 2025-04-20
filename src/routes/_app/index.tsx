import { Main } from '@/components/layout/main';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <div>Dashboard</div>
    </Main>
  );
}
