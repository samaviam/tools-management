import { useEffect } from 'react';
import { createFileRoute, Link, useParams } from '@tanstack/react-router';
import {
  IconCalendarWeek,
  IconSchool,
  IconUsersGroup,
} from '@tabler/icons-react';
import { Pencil } from 'lucide-react';
import { Main, MainHeader } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { useClass } from '@/queries/classes';
import { AutoSchedule, ClassForm } from '@/components/shared';
import { url } from '@/libs/utils';
import { getFiltersStateParser } from '@/libs/parsers';
import { createSerializer } from 'nuqs';

const searchParams = {
  filters: getFiltersStateParser(),
};

const serialize = createSerializer(searchParams);

export const Route = createFileRoute('/_app/classes/$id/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, mutate } = useClass();
  const { id } = useParams({ from: '/_app/classes/$id/' });

  useEffect(() => {
    mutate({ id: Number(id) });
  }, []);

  return (
    <Main>
      <MainHeader>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">View Class</h2>
        </div>

        <div className="flex gap-x-2">
          <Button variant="outline" asChild>
            <Link
              to={url(serialize, '/schedules', {
                id: 'class_id',
                value: id,
              })}
            >
              Schedules <IconCalendarWeek />
            </Link>
          </Button>

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
            <Link to="/classes/$id/edit" params={{ id }}>
              Edit <Pencil />
            </Link>
          </Button>

          {!data?.scheduled ? (
            <AutoSchedule classId={Number.parseInt(id)} />
          ) : null}
        </div>
      </MainHeader>

      {data ? (
        <ClassForm title="View the Class" values={data} disabled />
      ) : null}
    </Main>
  );
}
