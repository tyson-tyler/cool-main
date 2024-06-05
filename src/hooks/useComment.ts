import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { CreateChannelModalContext } from "@/context/CreateChannelModelContext";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import toast from "react-hot-toast";

interface UseCommentProps {
  videoId?: string | null;
}

export const useComment = ({ videoId }: UseCommentProps) => {
  const currentChannel = useContext(CurrentChannelContext);
  const currentUser = useContext(CurrentUserContext);

  const createChannelModal = useContext(CreateChannelModalContext);

  const router = useRouter();

  const [text, setText] = useState("");
  const submitComment = useCallback(async () => {
    if (!currentUser) {
      alert("Please sign in to comment");
      return;
    }
    if (!currentUser) {
      createChannelModal?.onOpen();
      return;
    }

    if (!videoId) return;

    const data = {
      videoId,
      text,
      channelId: currentChannel?.id,
    };

    try {
      router.prefetch;
      if (text.trim()) {
        await axios
          .post(`/api/comments/${videoId}`, data)
          .then(() => setText(""));
      }
      router.refresh();
      toast.success("Thanks for Comment");
    } catch (error) {
      toast.error("not Comment");
    }
  }, [
    createChannelModal,
    currentUser,
    currentChannel,
    videoId,
    text,
    setText,
    router,
  ]);

  return {
    text,
    setText,
    submitComment,
  };
};
