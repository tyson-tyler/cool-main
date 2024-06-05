import { CurrentUserContext } from "@/context/CurrentUserContext";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo } from "react";
import toast from "react-hot-toast";

interface UseSubscribeProps {
  channelId: string;
}
const UseSubscribe = ({ channelId }: UseSubscribeProps) => {
  const currentUser = useContext(CurrentUserContext);

  const router = useRouter();

  const hasSubcribed = useMemo(() => {
    if (!currentUser) return false;

    const subscription = currentUser.subscribedChannelIds || [];

    return subscription.includes(channelId);
  }, [currentUser, channelId]);

  const toogleSubscribed = useCallback(async () => {
    if (!currentUser) {
      alert("Please sign in to follow");
      return;
    }
    try {
      router.prefetch;
      if (hasSubcribed) {
        await axios.delete("/api/users/subscriptions", { data: { channelId } });
      } else {
        await axios.post("/api/users/subscriptions", { channelId });
      }
      router.refresh();
      toast.success(
        hasSubcribed ? "UnFollow successfully" : "Follow successfully"
      );
    } catch (error) {
      toast.error(hasSubcribed ? "is not unfollow" : "not unfollow");
    }
  }, [currentUser, channelId, hasSubcribed, router]);

  return { hasSubcribed, toogleSubscribed };
};
export default UseSubscribe;
