import { useState } from "react";

interface MutationProps<T, K> {
  mutationFn: (data: K) => Promise<T>;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useMutation<T, K>({
  mutationFn,
  onError,
  onSuccess,
}: MutationProps<T, K>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: false, error: "" });

  const mutate = async (props?: K) => {
    setFetch({ isLoading: true, isError: false, error: "", data: undefined });
    try {
      const data = await mutationFn(props as K);
      setFetch({ isLoading: false, data, isError: false, error: "" });
      onSuccess?.();
    } catch (error: unknown) {
      setFetch({ isLoading: false, isError: true, error: String(error) });
      onError?.();
    }
  };

  return {
    ...fetch,
    mutate,
  };
}
