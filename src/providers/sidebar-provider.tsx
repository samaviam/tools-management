import Cookies from 'js-cookie';
import { SidebarProvider as Sidebar } from '@/components/ui/sidebar';

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultOpen = Cookies.get('sidebar:state') !== 'false';

  return <Sidebar defaultOpen={defaultOpen}>{children}</Sidebar>;
};

export default SidebarProvider;
