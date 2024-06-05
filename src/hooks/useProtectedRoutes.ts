import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

interface UserProtectedRouteProps {
  checkChannel?: boolean;
}

export const useProtectedRoute = ({
  checkChannel = true,
}: UserProtectedRouteProps = {}) => {
  const currentUser = useContext(CurrentUserContext);
  const currentChannel = useContext(CurrentChannelContext);

  const router = useRouter();

  useEffect(() => {
    if (!currentUser || (checkChannel && !currentChannel)) router.push("/");
  }, [checkChannel, currentChannel, currentUser]);
};
