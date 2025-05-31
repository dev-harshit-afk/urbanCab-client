import { ArrowDown, ChevronDown, NotepadText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { ProfileDropDown } from "./ProfileDropDown";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { UserDataContext } from "@/_context/UserContext";
import axios from "axios";

const DashboardHeader = () => {
  const router = useRouter();
  const { userData, setUserData } = useContext(UserDataContext);
  const token = userData.token;

  const handleLogout = async () => {
    const toastId = toast.loading("signin out....");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Logged out successfully...", { id: toastId });

      setUserData({
        user: { email: "", firstname: "", lastname: "" },
        token: "",
      });

      localStorage.clear("userToken");
      router.push("/user/login");
    } catch (error) {
      toast.error("Logged out failed...", { id: toastId });
      console.log(error);
    }
  };

  const handleActivity = () => {
    router.push("/user/ride/history");
  };

  return (
    <div>
      <header className="bg-black sm:h-[9vh]  border-b-1 border-gray-200">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link href={"/user/ride/dashboard"}>
            <Image
              src={"/uber-white-logo.webp"}
              alt="uber"
              height={50}
              width={50}
            />
          </Link>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block"></nav>

            <div className="flex items-center gap-4 ">
              <Link href={"/user/ride/history"}>
                <div className=" p-2 flex items-center gap-2 max-sm:hidden  rounded-lg outline">
                  <NotepadText size={20} color="white" />
                  <h2 className="text-white">Activity</h2>
                </div>
              </Link>

              <div className="sm:flex sm:gap-2">
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
              {userData && (
                <ProfileDropDown
                  user={userData.user}
                  handleActivity={handleActivity}
                  handleLogout={handleLogout}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default DashboardHeader;
