import { useState, useEffect } from "react";
import { useLikeDislike, LikeDislikeStatus } from "@/lib/useLikeDislike";
import { compactNumberFormat } from "@/utils/numUtils";
import { Video } from "@prisma/client";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
import { Heart, Loader2 } from "lucide-react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

interface LikeDisLikeButtonProps {
  video: Video;
}

const LikeDisLikeButton: React.FC<LikeDisLikeButtonProps> = ({ video }) => {
  const { likeDislikeStatus, toogleLikeDislike } = useLikeDislike({
    videoId: video.id,
  });

  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingDislike, setLoadingDislike] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLikeDislike = async (action: "like" | "dislike") => {
    if (action === "like") {
      setLoadingLike(true);
      setLikeAnimating(true);
    } else {
      setLoadingDislike(true);
    }
    await toogleLikeDislike(action);
    if (action === "like") {
      setLoadingLike(false);
    } else {
      setLoadingDislike(false);
    }
  };

  useEffect(() => {
    if (likeAnimating) {
      const timer = setTimeout(() => {
        setLikeAnimating(false);
      }, 300); // Duration of the animation
      return () => clearTimeout(timer);
    }
  }, [likeAnimating]);

  return (
    <>
      <style jsx>{`
        .animate-like {
          animation: like 0.3s ease-in-out;
        }
        @keyframes like {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>
      <div className="flex items-center gap-1 dark:bg-neutral-800 bg-gray-100 rounded-full px-3 py-2 dark:text-white text-black font-medium">
        <button
          className={`pr-3 border-r-2 border-neutral-600 flex items-center gap-3 ${
            likeAnimating ? "animate-like" : ""
          }`}
          onClick={() => handleLikeDislike("like")}
          disabled={loadingLike}
        >
          {loadingLike ? (
            <span>
              <Loader2 className="w-5 h-5 animate-spin" />
            </span>
          ) : likeDislikeStatus === LikeDislikeStatus.Liked ? (
            <IoHeart className="w-6 h-6 text-red-500" />
          ) : (
            <IoHeartOutline className="h-6 w-6 text-gray-500" />
          )}
          <p>{compactNumberFormat(video.likeCount)}</p>
        </button>
        <button
          className="pl-2"
          onClick={() => handleLikeDislike("dislike")}
          disabled={loadingDislike}
        >
          {loadingDislike ? (
            <span>
              <Loader2 className="w-5 h-5 animate-spin" />
            </span>
          ) : likeDislikeStatus === LikeDislikeStatus.Disliked ? (
            <MdThumbDown className="w-6 h-6 text-blue-500" />
          ) : (
            <MdOutlineThumbDown className="h-6 w-6 text-gray-500" />
          )}
        </button>
      </div>
    </>
  );
};

export default LikeDisLikeButton;
