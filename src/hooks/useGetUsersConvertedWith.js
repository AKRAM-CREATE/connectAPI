import { useQuery } from "@tanstack/react-query";
import { getUsersConvertedWith } from "../Services/apiAuth";
import { useUser } from "./useUser";

export function useGetUsersConvertedWith() {
  const user = useUser();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["usersConvertedWith"],
    queryFn: () => getUsersConvertedWith(user.id),
    refetchOnMount: true, // always fetch when component mounts
    refetchOnWindowFocus: true,
  });

  return { data, isLoading, error, refetch };
}
