import { CaptainDataContext } from "@/_context/CaptainContext";
import { ProfileDropDown } from "@/app/_components/ProfileDropDown";
import axios from "axios";
import { ArrowDown, ChevronDown, NotepadText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const CaptainHeader = () => {
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading("signin out....");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/captains/logout`,
        {
          headers: {
            Authorization: `Bearer ${captainData.token}`,
          },
        }
      );

      toast.success("Logged out successfully...", { id: toastId });

      setCaptainData({
        captain: { email: "", firstname: "", lastname: "" },
        token: "",
      });

      localStorage.clear("captainToken");
      router.push("/captain/login");
    } catch (error) {
      toast.error("Logged out failed...", { id: toastId });
      console.log(error);
    }
  };
  function handleActivity() {
    router.push("/captain/ride/history");
  }
  return (
    <div>
      <header className="bg-black z-100 sm:h-[9vh]  border-b-1 border-gray-200">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link href={"/captain/ride/dashboard"}>
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
              <Link href={"/captain/ride/history"}>
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
              <ProfileDropDown
                handleLogout={handleLogout}
                user={captainData.captain}
                handleActivity={handleActivity}
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CaptainHeader;
