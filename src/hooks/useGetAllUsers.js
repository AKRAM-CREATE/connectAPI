import { useMutation } from "@tanstack/react-query";
import { getAllUsers } from "../Services/apiAuth";
import { useState } from "react";

export function useGetAllUsers() {
  const [data, setData] = useState([]);
  const { mutateAsync: usersServer, isLoading } = useMutation({
    mutationFn: getAllUsers,
    onSuccess: (res) => setData(res),
  });

  return { data, isLoading, usersServer };
}
