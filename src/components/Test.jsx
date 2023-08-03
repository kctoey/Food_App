import { P } from "caniuse-lite/data/agents";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
const Test = () => {
  const { cartStore } = useSelector((state) => ({ ...state }));
  console.log(cartStore);
  return (
    <div>
      <h1>Component1</h1>
      <br />
      store:{cartStore.value}
      <br />
      {cartStore.loading ? <p>Loading</p> : <p>ฝากติดตามด้วย</p>}
    </div>
  );
};

export default Test;
