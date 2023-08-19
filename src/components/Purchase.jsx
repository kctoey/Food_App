import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Lottie from "lottie-react";
import animationData from "../../public/image/animation_llbwoknm.json";
import { Link } from "react-router-dom";
const Purchase = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  const [data, setData] = useState("");

  useEffect(() => {
    loaddata();
  }, []);
  const loaddata = async () => {
    await getDocs(collection(db, "order"))
      .then((query) => {
        console.log(query.docs[0]);
        const newData = query.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const findMatchingItems = (data, user) => {
    const matchingItems = [];

    for (const item of data) {
      if (item.userId === user.uid) {
        matchingItems.push(item);
      }
    }

    return matchingItems;
  };

  const result = findMatchingItems(data, user);
  console.log(result);

  return (
    <div className="bg-white w-screen h-full pt-20 lg:pt-60 font-Kanit flex flex-col justify-center items-center ">
      <h1 className="text-lg">You have {result.length} order </h1>
      <hr />
      {result ? (
        result.map((item) => (
          <div
            key={item.id}
            className="text-sm relative overflow-x-auto md:shadow-md md:rounded-lg px-4 m-6 w-full md:w-[800px]"
          >
            <h2>
              Order Date: {item.date}{" "}
              <span className="text-gray-500"> {item.time}</span>
            </h2>
            <h3>Order Status: Pending</h3>
            <p>Items Ordered</p>

            {item.product?.map((piece) => (
              <div className="flex flex-cols border-gray-200  " key={piece.id}>
                {/* <p>{piece.title}</p>
              <p>{piece.qty}</p>
              <img width={100} height={100} src={piece.image} alt="" /> */}
                <table className="table-fixed text-sm">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="w-32  p-4">
                        {" "}
                        <img width={32} src={piece.image} alt="" />
                      </td>
                      <td>{piece.title} </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="font-Kanit h-screen w-screen flex flex-col items-center justify-center">
          <div style={{ height: 200, width: 200 }}>
            <Lottie animationData={animationData} />
          </div>
          <h1 className="text-center text-xl  md:p-20 mx-auto text-[#8B4513]">
            No order
          </h1>
          <Link to={`/`}>
            <button className="w-32 rounded-md bg-[#8B4513] p-4 text-white ">
              Go Shopping
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Purchase;
