import { CurrentUserContext } from "@/context/CurrentUserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useMemo } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

interface UseLikeDislikeProps {
  videoId: string;
}

export enum LikeDislikeStatus {
  Liked = 1,
  Disliked = 2,
  None = 3,
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useLikeDislike = ({ videoId }: UseLikeDislikeProps) => {
  const currentUser = useContext(CurrentUserContext);

  const router = useRouter();

  const { data, error } = useSWR(
    currentUser ? `/api/videos/${videoId}/status` : null,
    fetcher
  );

  const likeDislikeStatus = useMemo(() => {
    if (!data) return LikeDislikeStatus.None;

    const { likedVideoIds, dislikedVideoIds } = data;

    if (likedVideoIds.includes(videoId)) {
      return LikeDislikeStatus.Liked;
    } else if (dislikedVideoIds.includes(videoId)) {
      return LikeDislikeStatus.Disliked;
    } else {
      return LikeDislikeStatus.None;
    }
  }, [data, videoId]);

  const toggleLikeDislike = useCallback(
    async (action: "like" | "dislike") => {
      if (!currentUser) {
        toast.error("Please Sign in to Like/Dislike");
        return;
      } else if (!videoId) return;

      try {
        if (action === "like") {
          switch (likeDislikeStatus) {
            case LikeDislikeStatus.Liked:
              await axios.delete(`/api/videos/${videoId}/like`);
              break;
            case LikeDislikeStatus.Disliked:
              await axios.delete(`/api/videos/${videoId}/dislike`);
              await axios.post(`/api/videos/${videoId}/like`);
              break;
            default:
              await axios.post(`/api/videos/${videoId}/like`);
              break;
          }
        } else if (action === "dislike") {
          switch (likeDislikeStatus) {
            case LikeDislikeStatus.Liked:
              await axios.delete(`/api/videos/${videoId}/like`);
              await axios.post(`/api/videos/${videoId}/dislike`);
              break;
            case LikeDislikeStatus.Disliked:
              await axios.delete(`/api/videos/${videoId}/dislike`);
              break;
            default:
              await axios.post(`/api/videos/${videoId}/dislike`);
              break;
          }
        }

        mutate(`/api/videos/${videoId}/status`); // Revalidate the SWR data
        router.refresh();
        toast.success("Thanks for your feedback!");
      } catch (error) {
        toast.error("There was an error");
      }
    },
    [currentUser, videoId, likeDislikeStatus, router]
  );

  return {
    likeDislikeStatus,
    toggleLikeDislike,
    isLoading: !error && !data,
    isError: error,
  };
};
