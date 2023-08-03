// import React, { useState } from "react";
// // import { login } from "../feature/user/userslice";
// import { useSelector, useDispatch } from "react-redux";
// import { auth } from "../config/firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link } from "react-router-dom";
// import { BsCheckCircle } from "react-icons/bs";
// import {
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from "../config/firebase";

// export const RegisterPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const dispatch = useDispatch();
//   const username = useSelector((state) => state.user.value);
//   const [user] = useAuthState(auth);

//   const register = () => {
//     if (!name) {
//       return alert("Please enter a full name");
//     }
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userAuth) => {
//         updateProfile(userAuth.user, {
//           displayName: name,
//         })
//           .then(
//             dispatch(
//               login({
//                 email: userAuth.user.email,
//                 uid: userAuth.user.uid,
//                 displayName: name,
//               })
//             )
//           )
//           .catch((error) => {
//             console.log("user not updated");
//           });
//       })
//       .catch((err) => {
//         alert(err);
//       });
//   };
//   return (
//     <div className="bg-[#F5EBDC] w-screen h-screen pt-20 font-Kanit">
//       <div className=" bg-white rounded-lg w-80 mx-auto p-8 space-y-2">
//         <div className="text-center">
//           <h1 className="font-bold">สมัครสมาชิก</h1>
//         </div>

//         <div className="flex flex-row justify-center space-x-2 py-4">
//           {!user ? (
//             <div>
//               <form className="space-y-4">
//                 <input
//                   className="w-full h-10 border-solid border-2 border-[#e7c695] rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-2 "
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Full name (required for registering)"
//                   type="text"
//                 />

//                 <input
//                   className="w-full h-10 border-solid border-2 border-[#e7c695] rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-2"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Email"
//                   type="email"
//                 />
//                 <input
//                   className="w-full h-10 border-solid border-2 border-[#e7c695] rounded-md focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 pl-2"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Password"
//                   type="password"
//                 />
//               </form>
//               <div className="pt-4 text-center">
//                 <button
//                   className="hover:opacity-75 bg-[#502314]  text-sm text-white py-2 px-4 rounded-full"
//                   // onClick={register}
//                 >
//                   ยืนยันการสมัคร
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col justify-center space-y-4 items-center">
//               <div>
//                 <BsCheckCircle className="h-14 w-14 drop-shadow-lg text-green-500 text-center " />
//               </div>
//               <h1 className="py-4 text-2xl">สมัครสมาชิกสำเร็จ</h1>
//               <div className="hover:opacity-75 bg-[#502314] text-center text-sm text-white py-1 px-3 rounded-full">
//                 <button className="">
//                   <Link to="/">กลับสู่หน้าหลัก</Link>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
import React from "react";

const RegisterPage = () => {
  return <div>RegisterPage</div>;
};

export default RegisterPage;
