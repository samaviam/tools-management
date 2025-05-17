import { NuqsAdapter } from 'nuqs/adapters/react';
import SearchProvider from './search-provider';
import SidebarProvider from './sidebar-provider';
import ThemeProvider from './theme-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SearchProvider>
        <SidebarProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </SidebarProvider>
      </SearchProvider>
    </ThemeProvider>
  );
};

export default Providers;
