import Image from "next/image";

export enum AvatarSize {
  extraSmall = 25,
  small = 32,
  medium = 40,
  large = 126,
  extra = 50,
}
interface AvatarProps {
  className?: string;
  onClick?: () => void;
  size?: AvatarSize;
  imageSrc?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({
  className,
  onClick,
  imageSrc,
  size = AvatarSize.medium,
}) => {
  return (
    <Image
      alt="avatar"
      className={`rounded-md aspect-square object-cover
       ${onClick && "cursor-pointer"} ${className}`}
      height={size}
      width={size}
      onClick={onClick}
      src={imageSrc || "/logo.svg"}
    />
  );
};

export default Avatar;
