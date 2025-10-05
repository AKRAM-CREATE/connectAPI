import { useSearchParams } from "react-router-dom";

export function useReadUrl() {
  const [searchParams] = useSearchParams();

  return {
    id: searchParams.get("id") || null,
    userName: searchParams.get("userName") || "",
  };
}
