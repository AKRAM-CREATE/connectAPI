import { useQueryClient } from "@tanstack/react-query";

export function useGetUser(id) {
  const queryClient = useQueryClient();

  // grab the cached users from the query key ["users"]
  const users = queryClient.getQueryData(["users"]);

  // find the specific user by id
  const user = users?.find((u) => u.id === id);

  return { user: user || null };
}
