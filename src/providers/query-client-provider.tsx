import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as QueryClientBaseProvider,
} from '@tanstack/react-query';

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => console.error(error),
    }),
    mutationCache: new MutationCache({
      onError: (error) => console.error(error),
    }),
  });

  return (
    <QueryClientBaseProvider client={queryClient}>
      {children}
    </QueryClientBaseProvider>
  );
};

export default QueryClientProvider;
