import { useQueryClient } from "@tanstack/react-query";

export function useUser() {
  const queryClient = useQueryClient();

  // Try to get user from React Query
  let user = queryClient.getQueryData(["user"]);

  // Fallback: get from localStorage if not in React Query
  if (!user) {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  }

  if (!user) return null;
  // Final fallback if nothing is found
  const { id, userName, email, profileImageUrl } = user;

  return { id, userName, email, profileImageUrl };
}
