import { createFileRoute } from '@tanstack/react-router';
import { Main, MainHeader } from '@/components/layout/main';
import { StudentForm } from '@/components/shared';

export const Route = createFileRoute('/_app/students/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">New Student</h2>
        </div>
      </MainHeader>

      <StudentForm title="Create new Student" />
    </Main>
  );
}
