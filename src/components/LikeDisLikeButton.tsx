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
import { Loader2 } from "lucide-react";

interface LikeDisLikeButtonProps {
  video: Video;
}

const LikeDisLikeButton: React.FC<LikeDisLikeButtonProps> = ({ video }) => {
  const { likeDislikeStatus, toogleLikeDislike } = useLikeDislike({
    videoId: video.id,
  });

  const [loading, setLoading] = useState(false);
  const [likeAnimating, setLikeAnimating] = useState(false);

  const handleLikeDislike = async (action: "like" | "dislike") => {
    setLoading(true);
    if (action === "like") {
      setLikeAnimating(true);
    }
    await toogleLikeDislike(action);
    setLoading(false);
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
      <div className="flex items-center gap-1 dark:bg-neutral-800 bg-gray-200 rounded-full px-3 py-2 dark:text-white text-black font-medium">
        <button
          className={`pr-3 border-r-2 border-neutral-600 flex items-center gap-3 ${
            likeAnimating ? "animate-like" : ""
          }`}
          onClick={() => handleLikeDislike("like")}
        >
          {loading ? (
            <span>
              <Loader2 className="w-5 h-5 animate-spin" />
            </span>
          ) : likeDislikeStatus === LikeDislikeStatus.Liked ? (
            <MdThumbUp className="w-6 h-6" />
          ) : (
            <MdOutlineThumbUp className="h-6 w-6" />
          )}
          <p>{compactNumberFormat(video.likeCount)}</p>
        </button>
        <button className="pl-2" onClick={() => handleLikeDislike("dislike")}>
          {loading ? (
            <div className="spinner-border" role="status">
              <span>
                <Loader2 className="w-5 h-5 animate-spin" />
              </span>
            </div>
          ) : likeDislikeStatus === LikeDislikeStatus.Disliked ? (
            <MdThumbDown className="w-6 h-6" />
          ) : (
            <MdOutlineThumbDown className="h-6 w-6" />
          )}
        </button>
      </div>
    </>
  );
};

export default LikeDisLikeButton;
