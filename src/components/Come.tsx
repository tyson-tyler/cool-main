import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Video } from "@prisma/client";
import { Facebook, Instagram, Share2, Twitch, Twitter } from "lucide-react";
import { BiLogoDiscord } from "react-icons/bi";
import { MdWhatsapp } from "react-icons/md";
import { PiDiscordLogo, PiPinterestLogo } from "react-icons/pi";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface VideoCardProps {
  video: Video;
}

const DialogDemo: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="dark:bg-neutral-800 rounded-full bg-gray-200 hover:bg-gray-900 hover:scale-105 transition px-3 py-2 dark:text-white text-black font-medium">
          <Share2 className="w-6 h-6 mr-3" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Social Media</DialogTitle>
          <DialogDescription>
            Share the link to the social media platsform
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4 py-4">
          <div className="flex justify-center items-center gap-4">
            <FacebookShareButton url={`https://myaimix.com/video/${video.id}`}>
              <FacebookIcon className="w-10 h-10 rounded-full" />
            </FacebookShareButton>
            <TwitterShareButton url={`https://myaimix.com/video/${video.id}`}>
              <TwitterIcon className="w-10 h-10 rounded-full" />
            </TwitterShareButton>

            <WhatsappShareButton url={`https://myaimix.com/video/${video.id}`}>
              <WhatsappIcon className="w-10 h-10 rounded-full" />
            </WhatsappShareButton>
            <TelegramShareButton url={`https://myaimix.com/video/${video.id}`}>
              {" "}
              <TelegramIcon className="w-10 h-10 rounded-full" />
            </TelegramShareButton>
            <RedditShareButton url={`https://myaimix.com/video/${video.id}`}>
              <RedditIcon className="w-10 h-10 rounded-full" />
            </RedditShareButton>
            <LinkedinShareButton url={`https://myaimix.com/video/${video.id}`}>
              <LinkedinIcon className="w-10 h-10 rounded-full" />
            </LinkedinShareButton>
            <PinterestShareButton
              url={`https://myaimix.com/video/${video.id}`}
              media={video.thumbnailSrc}
            >
              <PinterestIcon className="w-10 h-10 rounded-full" />
            </PinterestShareButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
