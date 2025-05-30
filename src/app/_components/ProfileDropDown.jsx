import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  HelpCircle,
  NotepadText,
  Settings,
  WalletCardsIcon,
} from "lucide-react";
import Image from "next/image";

export function ProfileDropDown({ handleLogout, handleActivity, user }) {
  return (
    <DropdownMenu className="">
      <DropdownMenuTrigger asChild>
        <ChevronDown
          color="white"
          className=" cursor-pointer"
          onClick={() => setShowMenu(true)}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 sm:w-64 mr-2">
        <DropdownMenuLabel>
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">
              {user?.firstname + " " + user?.lastname}
            </h1>
            <Image
              src={
                "https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg"
              }
              className=" rounded-full"
              alt="hero"
              height={40}
              width={40}
            />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex py-2 ">
          <DropdownMenuItem>
            <div className=" flex flex-col gap-2 justify-center items-center bg-gray-100 p-3 rounded-lg">
              <div className="">
                <WalletCardsIcon color="black" />
              </div>
              <h2 className=" font-bold">Wallet</h2>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              onClick={handleActivity}
              className=" flex flex-col gap-2 justify-center items-center bg-gray-100 p-3 rounded-lg"
            >
              <div className="">
                <NotepadText
                  size={40}
                  width={40}
                  height={40}
                  color="black"
                  className=" h-10 w-10"
                />
              </div>
              <h2 className=" font-bold">Activity</h2>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className=" flex flex-col gap-2 justify-center items-center bg-gray-100 p-3 rounded-lg">
              <HelpCircle className=" h-20" color="black" />
              <h2 className=" font-bold">Help</h2>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className=" w-full bg-gray-100 p-2 rounded-md flex justify-between text-lg font-bold">
              <h2>Uber Cash</h2>
              <h2>$0.00</h2>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <div className=" w-full  p-1 rounded-md flex items-center gap-2 text-base">
              <Settings color="black" />
              <h2>Manage Account</h2>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            className={" w-full"}
            onClick={() => {
              //handle signout
              handleLogout();
            }}
          >
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
