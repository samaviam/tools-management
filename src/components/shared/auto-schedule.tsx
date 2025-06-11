import { useState } from 'react';
import { and, eq } from 'drizzle-orm';
import { CalendarDays, CircleAlert, Info } from 'lucide-react';
import { IconPlus } from '@tabler/icons-react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import db from '@/db';
import {
  classes,
  experiments,
  experimentsTools,
  schedules,
  schedulesTools,
} from '@/db/schema';
import { Schedule, Tool } from '@/types';

const AutoSchedule = ({ classId }: { classId: number }) => {
  const [open, setOpen] = useState(false);
  const [brokenExperimentTools, setBrokenExperimentTools] = useState<string[]>(
    [],
  );

  const handleGenerate = async () => {
    await db.transaction(async (tx) => {
      const _class = await tx.query.classes.findFirst({
        where: eq(classes.id, classId),
        with: {
          groups: true,
          students: true,
        },
      });

      if (!_class?.groups.length) {
        toast.error('Default schedules could not be created!');

        return;
      }

      const _experiments = await tx
        .select()
        .from(experiments)
        .where(
          and(
            eq(experiments.degree, _class.degree),
            eq(experiments.status, true),
          ),
        );

      const schedulesList = _class.groups.flatMap((group) =>
        _experiments.map((experiment) => ({
          experiment_id: experiment.id,
          class_id: _class.id,
          group_id: group.id,
          status: Schedule.Status['Not Started'],
        })),
      );

      await tx.insert(schedules).values(schedulesList);

      const _schedules = await tx
        .select()
        .from(schedules)
        .where(eq(schedules.class_id, _class.id));

      const brokenExpsToolsSet = new Set<string>();
      await Promise.all(
        _schedules.map(async (schedule) => {
          const _experiments_tools = await tx.query.experimentsTools.findMany({
            where: eq(experimentsTools.experiment_id, schedule.experiment_id),
            with: {
              tool: { columns: { status: true } },
              experiment: { columns: { name: true } },
            },
          });

          const schedulesToolsList = _experiments_tools.map((expTool) => {
            if (expTool.tool.status === Tool.Status.Broken) {
              brokenExpsToolsSet.add(expTool.experiment.name);
            }

            return {
              schedule_id: schedule.id,
              tool_id: expTool.tool_id,
              status: expTool.tool.status,
            };
          });

          await tx.insert(schedulesTools).values(schedulesToolsList);
        }),
      );

      toast.success(
        'Default schedules have been created for this class. Please specify the start times for each schedule.',
      );

      const brokenExperiments = Array.from(brokenExpsToolsSet);
      if (brokenExperiments.length) {
        setBrokenExperimentTools(brokenExperiments);
      } else {
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger asChild>
        <Button>
          Create Schedules <IconPlus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create default schedules for this class</DialogTitle>
          <DialogDescription>
            With this method, you can automatically add schedules to the class
            and then specify the time.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <Info />
          <AlertTitle>Recommended</AlertTitle>
          <AlertDescription>
            Please make sure that groups and students exist before creating a
            schedule automatically.
          </AlertDescription>
        </Alert>

        {brokenExperimentTools.length ? (
          <Alert variant="warning">
            <CircleAlert />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              The following experiments include tools that are broken or
              unavailable:
              <ul>
                {brokenExperimentTools.map((experiment) => (
                  <li key={experiment}>{experiment}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        ) : null}

        <DialogFooter>
          <Button onClick={handleGenerate}>
            <CalendarDays /> Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AutoSchedule;
