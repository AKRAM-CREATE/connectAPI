import { useMutation } from "@tanstack/react-query";
import { register as registerApi } from "../Services/apiAuth";
export function useReg() {
  const { mutate: register, isLoading } = useMutation({
    mutationFn: ({ username, email, password }) =>
      registerApi({ username, email, password }),
    onSuccess: (user) => {
      console.log("reg user :", user);
    },
    onError: (err) => {
      console.log("reg ERRR", err);
    },
  });

  return { register, isLoading };
}
