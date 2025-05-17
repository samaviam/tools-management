import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/groups/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/groups/create"!</div>
}
