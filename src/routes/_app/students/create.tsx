import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/students/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_app/students/create"!</div>;
}
