import { useSelector } from "react-redux";

// Custom hook to check user authentication
export default function useUserAuth() {
  const { user } = useSelector((state: any) => state.auth);

  return Boolean(user); // Convert to boolean for cleaner return
}
