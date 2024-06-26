"use client";
import { useContext, useState, useEffect } from "react";
import SignInButton from "./SignInButton";
import { CurrentUserContext } from "@/context/CurrentUserContext";
import Avatar, { AvatarSize } from "../Avatar";
import UserMenu from "../UserMenu";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Loader, Loader2 } from "lucide-react";

const UserOptions = () => {
  const router = useRouter();
  const currentUser = useContext(CurrentUserContext);

  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser && currentUser.image) {
      const img = new Image();
      img.src = currentUser.image;
      img.onload = () => setLoading(false);
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const handleClick = () => {
    router.push("/sign");
  };

  return currentUser ? (
    <>
      <div className="flex items-center gap-4 mr-4">
        {loading ? (
          <div className="loader">
            <Loader className="w-5 h-5 animate-spin" />
          </div> // Replace this with your actual loader component
        ) : (
          <Avatar
            size={AvatarSize.medium}
            imageSrc={currentUser.image}
            onClick={() => setMenuOpen(true)}
          />
        )}
      </div>
      {menuOpen ? <UserMenu onClose={() => setMenuOpen(false)} /> : null}
    </>
  ) : (
    <SignInButton />
  );
};

export default UserOptions;
