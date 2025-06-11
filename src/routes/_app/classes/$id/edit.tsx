import { useEffect } from 'react';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import { IconSchool, IconUsersGroup } from '@tabler/icons-react';
import { Eye } from 'lucide-react';
import { Main, MainHeader } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { useClass } from '@/queries/classes';
import { ClassForm } from '@/components/shared';
import { getFiltersStateParser } from '@/libs/parsers';
import { createSerializer } from 'nuqs';
import { url } from '@/libs/utils';

const searchParams = {
  filters: getFiltersStateParser(),
};

const serialize = createSerializer(searchParams);

export const Route = createFileRoute('/_app/classes/$id/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useClass();
  const { id } = useParams({ from: '/_app/classes/$id/edit' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Edit Class</h2>
        </div>

        <div className="flex gap-x-2">
          <Button variant="outline" asChild>
            <Link
              to={url(serialize, '/groups', {
                id: 'class_id',
                value: id,
              })}
            >
              Groups <IconUsersGroup />
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link
              to={url(serialize, '/students', {
                id: 'class_id',
                value: id,
              })}
            >
              Students <IconSchool />
            </Link>
          </Button>

          <Button asChild>
            <Link to="/classes/$id" params={{ id }}>
              View <Eye />
            </Link>
          </Button>
        </div>
      </MainHeader>

      {data ? <ClassForm title="Edit the Class" values={data} /> : null}
    </Main>
  );
}
