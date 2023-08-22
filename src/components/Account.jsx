import React, { useState, useEffect } from "react";
import profile from "../../public/image/profile.png";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Button } from "@mui/material";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineUpload } from "react-icons/ai";
const Account = () => {
  const auth = getAuth();
  const storage = getStorage();
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(profile);
  const [edit, setEdit] = useState(false);
  const [photoURL, setPhotoURL] = useState(profile);
  const [loading, setLoading] = useState(false);
  //updatename
  const updateuser = async () => {
    await updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("name update");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //change image
  async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + ".png");
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(auth.currentUser, {
      photoURL,
    });
    setLoading(false);
  }
  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  function handleChangename(e) {
    if (e.target.value) {
      setName(e.target.value);
    }
  }
  function handleSubmit() {
    updateuser(name);
  }
  function handleClick() {
    upload(photo, auth.currentUser, setLoading);
    const interval = setInterval(() => {
      window.location.reload();
    }, 3000);

    return () => clearInterval(interval);
  }
  useEffect(() => {
    if (auth.currentUser?.photoURL) {
      setPhoto(auth.currentUser.photoURL);
    }
  }, [auth.currentUser]);
  const style = {
    "& label.Mui-focused": {
      color: "brown",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "brown",
      },
    },
  };
  return (
    <div className=" bg-white w-screen h-screen pt-40 font-Kanit flex flex-col lg:flex-row justify-center items-center  sm:p-20">
      {auth?.currentUser ? (
        <>
          <div className="w-full h-full  sm:shadow-md rounded-md p-4">
            <h1 className="text-2xl">My Profile</h1>
            <hr />
            <div className="py-4 flex flex-col lg:flex-row items-center">
              <div className="w-80 h-full flex flex-col justify-center text-center p-4">
                <div className="p-4">
                  <img
                    className=" rounded-full md:w-full  md:h-full"
                    src={auth.currentUser.photoURL ?? profile}
                    width={200}
                    height={200}
                  />
                </div>

                <input className="py-4" type="file" onChange={handleChange} />

                <Button
                  style={{ backgroundColor: "#8B4513" }}
                  variant="contained"
                  onClick={handleClick}
                >
                  Upload <AiOutlineUpload />
                </Button>
              </div>

              <div className="sm:text-xl p-4 flex flex-col justify-center ">
                {edit ? (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-row justify-center py-4"
                  >
                    <input
                      className="w-full h-10 border-solid border-2 border-[#e7c695] rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-2 "
                      value={name}
                      onChange={handleChangename}
                      placeholder="Display Name "
                      type="text"
                    />
                    <button className="text-[#8B4513]" type="submit">
                      {" "}
                      <AiFillEdit />
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-row   py-4">
                    {" "}
                    <p>Display Name: {auth.currentUser.displayName ?? ""}</p>
                    <button
                      className="text-[#8B4513]"
                      onClick={() => setEdit(true)}
                    >
                      <AiFillEdit />
                    </button>
                  </div>
                )}

                <photo>E-mail: {auth.currentUser.email ?? ""}</photo>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Account;
