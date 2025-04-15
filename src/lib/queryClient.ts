import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        try {
          console.log(`Fetching from: ${queryKey[0]}`);
          const response = await fetch(queryKey[0] as string, {
            credentials: "include",
          });
          
          if (!response.ok) {
            console.error(`API request failed with status ${response.status}: ${response.statusText}`);
            const errorText = await response.text();
            console.error(`Error response body: ${errorText}`);
            throw new Error(`${response.status}: ${response.statusText}`);
          }
          
          const data = await response.json();
          console.log(`Successfully fetched data from ${queryKey[0]}`);
          return data;
        } catch (error) {
          console.error(`Error fetching ${queryKey[0]}:`, error);
          throw error;
        }
      },
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: 2, // Retry failed requests up to 2 times
    },
    mutations: {
      retry: false,
    },
  },
});
