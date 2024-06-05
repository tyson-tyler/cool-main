import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import LeftBar from "./Leftbar";
import getCurrentSubscription from "@/actions/getCurrentSubscriptions";

export async function SheetDemo() {
  const subscriptions = await getCurrentSubscription();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="hidden lg:flex mt-2">
          <MenuIcon className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <LeftBar subscribedChannels={subscriptions} />
      </SheetContent>
    </Sheet>
  );
}
