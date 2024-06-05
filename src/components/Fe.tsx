import { Channel } from "@prisma/client";
import Link from "next/link";

interface MenuItemProps {
  logo: React.ReactNode;

  onClick?: () => void;
  round?: boolean;
  channel: Channel;
}

const MenuItems: React.FC<MenuItemProps> = ({
  logo,

  onClick,
  round = false,
  channel,
}) => {
  return (
    <Link href={`/channel/${channel.id}`} prefetch={false}>
      <div
        className={`flex items-center  mt-5 mb-5  ${
          round && "rounded-md"
        }  transition-all hover:scale-105 cursor-pointer `}
        onClick={onClick}
      >
        {logo}
      </div>
    </Link>
  );
};

export default MenuItems;
