import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../Services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ username, password }) => loginApi({ username, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("loged in user :", data.user);
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERRR", err);
    },
  });

  return { login, isLoading };
}
