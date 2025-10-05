import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProfileImage } from "../Services/apiAuth";

export function useAddPhoto() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ userId, file }) => uploadProfileImage(userId, file),
    onSuccess: () => {
      alert("Photo added successfully");
      // ✅ Refetch user data so it has the new profileImageUrl
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      alert("Upload failed: " + err.message);
    },
  });

  return mutation;
}
