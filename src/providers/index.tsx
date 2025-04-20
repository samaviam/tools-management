import SearchProvider from './search-provider';
import SidebarProvider from './sidebar-provider';
import ThemeProvider from './theme-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <SearchProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </SearchProvider>
    </ThemeProvider>
  );
};

export default Providers;
