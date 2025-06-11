import { cn } from '@/libs/utils';

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export const Main = ({ fixed, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        'px-4 py-6',
        fixed && 'fixed-main flex flex-grow flex-col overflow-hidden',
      )}
      {...props}
    />
  );
};

export const MainHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between mb-4">{children}</div>
  );
};

Main.displayName = 'Main';
