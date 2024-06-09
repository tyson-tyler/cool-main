"use client";

import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { CurrentChannelContext } from "@/context/CreateChannelContext";
import { useComment } from "@/hooks/useComment";
import { Loader } from "lucide-react";
import { useContext, useState } from "react";

interface CommentInputProps {
  videoId: string;
}

const CommentInput: React.FC<CommentInputProps> = ({ videoId }) => {
  const currentChannnel = useContext(CurrentChannelContext);
  const { text, setText, submitComment } = useComment({ videoId });
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async () => {
    setLoading(true);
    try {
      await submitComment();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 justify-center items-center text-sm">
      <Avatar imageSrc={currentChannnel?.imageSrc || null} />
      <div className="flex flex-col w-full">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment about the video"
          className="bg-transparent outline-none border-b border-b-gray-600 focus:border-b-3 focus:border-b-neutral-400"
        />
        {text ? (
          <div className="flex justify-end gap-4 mt-2">
            <Button
              variant={"ghost"}
              className="p-2"
              onClick={() => setText("")}
            >
              Cancel
            </Button>
            <Button
              className="p-2"
              onClick={handleCommentSubmit}
              disabled={loading}
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Comment"
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentInput;
