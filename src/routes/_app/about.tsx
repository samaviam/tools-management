import { Main } from '@/components/layout/main';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  IconBrandGithub,
  IconBrandTelegram,
  IconWorldWww,
} from '@tabler/icons-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_app/about')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Main>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>About the App</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This software has been developed to simplify and speed up the daily
            processes in university laboratories.
          </p>

          <p className="mb-4">
            With this application, laboratory tools and equipment can be managed
            more accurately, their status can be tracked, and a better
            organization in their usage can be achieved.
          </p>

          <div>Key features include:</div>
          <ul className="list-disc ml-5">
            <li>Registering and maintaining equipment records</li>
            <li>
              Tracking the status of each item (available, faulty, reserved,
              etc.)
            </li>
            <li>Fast and efficient search among tools</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Hi! I'm Mahdi Samavi. I developed this software with the aim of
            improving the management of laboratory equipment. I hope this app
            can play a small part in making your work easier.
          </p>

          <p className="mb-4">
            If you have any suggestions or encounter any issues, I’d be happy to
            hear from you.
          </p>

          <div>
            <a
              href="https://mahdi-samavi.ir/en"
              target="_blank"
              className="flex items-center gap-x-2 mb-2 text-sm"
              rel="noreferrer"
            >
              <IconWorldWww size={20} />
              Website
            </a>
            <a
              href="https://t.me/samavi_dev"
              target="_blank"
              className="flex items-center gap-x-2 mb-2 text-sm"
              rel="noreferrer"
            >
              <IconBrandTelegram size={20} />
              @samavi_dev
            </a>
            <a
              href="https://github.com/samaviam"
              target="_blank"
              className="flex items-center gap-x-2 text-sm"
              rel="noreferrer"
            >
              <IconBrandGithub size={20} />
              @samaviam
            </a>
          </div>
        </CardContent>
      </Card>
    </Main>
  );
}
