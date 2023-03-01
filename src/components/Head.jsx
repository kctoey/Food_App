import React from "react";
import HeadImage from "../../public/image/banner2.png";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
export const Head = () => {
  const [user] = useAuthState(auth);

  let greet = "";
  const myDate = new Date();
  const hrs = myDate.getHours();

  if (hrs > 1 && hrs < 12) {
    greet = "Good Morning";
  } else if (hrs > 12 && hrs < 18) {
    greet = "Good Afternoon";
  } else {
    greet = "Good Evening";
  }

  return (
    <div className="bg-[#F5EBDC] h-full font-bold font-Kanit ">
      <div className="pt-16">
        <div className="md:hidden">
          <div>
            {user && (
              <div className="  w-screen h-full inline-block align-middle space-x-2">
                <p className="pl-8 pt-4 space-x-4">
                  <span>{greet}</span>
                  <span>{user?.displayName}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="p-2">
            <img className="w-screen h-full" src={HeadImage} alt="mainImg" />
          </div>
        </div>
      </div>
    </div>
  );
};
