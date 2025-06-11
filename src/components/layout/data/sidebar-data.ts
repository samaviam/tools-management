import {
  IconCalendarWeek,
  IconChalkboard,
  IconLayoutDashboard,
  IconMicroscope,
  IconSchool,
  IconSettings,
  IconTool,
  IconUsersGroup,
} from '@tabler/icons-react';
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react';
import type { SidebarData } from '../types';

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      title: 'Tools Management',
      items: [
        {
          title: 'Tools',
          icon: IconTool,
          url: '/tools',
        },
      ],
    },
    {
      title: 'Students Management',
      items: [
        {
          title: 'Classes',
          icon: IconChalkboard,
          url: '/classes',
        },
        {
          title: 'Groups',
          icon: IconUsersGroup,
          url: '/groups',
        },
        {
          title: 'Students',
          icon: IconSchool,
          url: '/students',
        },
      ],
    },
    {
      title: 'Experiments Management',
      items: [
        {
          title: 'Experiments',
          icon: IconMicroscope,
          url: '/experiments',
        },
        {
          title: 'Schedules',
          icon: IconCalendarWeek,
          url: '/schedules',
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Data Management',
              url: '/settings/data-management',
              icon: IconTool,
            },
          ],
        },
      ],
    },
  ],
};
