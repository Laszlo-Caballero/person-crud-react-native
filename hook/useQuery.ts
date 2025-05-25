import { useEffect, useState } from 'react';
import { DependencyList } from 'react-native-reanimated/lib/typescript/hook';

interface QueryProps<T> {
  dependencies?: DependencyList;
  queryFn: () => Promise<T>;
}

export function useQuery<T>({ queryFn, dependencies }: QueryProps<T>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: true, error: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await queryFn();
        setFetch({ isLoading: false, data, isError: false, error: '' });
      } catch (error: unknown) {
        setFetch({ isLoading: false, isError: true, error: String(error) });
      }
    };
    fetchData();
  }, [dependencies]);

  return {
    ...fetch,
  };
}
