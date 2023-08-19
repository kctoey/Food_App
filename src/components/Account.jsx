import React, { useState, useEffect } from "react";
import profile from "../../public/image/profile.png";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
    updateProfile(auth.currentUser, {
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
    alert("Upload file");
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

  return (
    <div className=" bg-white w-screen h-screen pt-40 font-Kanit flex flex-row justify-center items-center p-20">
      {auth?.currentUser ? (
        <>
          <div className="w-full h-full  shadow-md rounded-md p-4">
            <h1 className="text-2xl">My Profile</h1>
            <hr />
            <div className="py-4 flex flex-row items-center">
              <div className="w-80">
                <img
                  className=" rounded-full md:scale-50"
                  src={auth.currentUser.photoURL ?? profile}
                  width={200}
                  height={200}
                />
                <div>
                  <input type="file" onChange={handleChange} />
                  <button disabled={loading} onClick={handleClick}>
                    Upload
                  </button>
                </div>
              </div>

              <div className="text-xl">
                {edit ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-full h-10 border-solid border-2 border-[#e7c695] rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-2 "
                      value={name}
                      onChange={handleChangename}
                      placeholder="Full name (required for registering)"
                      type="text"
                    />
                    <button type="submit">Edit</button>
                  </form>
                ) : (
                  <>
                    {" "}
                    <p>Name: {auth.currentUser.displayName ?? ""}</p>
                    <button onClick={() => setEdit(true)}>
                      i want to edit
                    </button>
                  </>
                )}

                <p>E-mail: {auth.currentUser.email ?? ""}</p>
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
