import React from "react";

import { Carousel } from "react-responsive-carousel";
import HeadImage1 from "../../public/image/banner_1.jpg";
import HeadImage2 from "../../public/image/banner_2.jpg";
import HeadImage3 from "../../public/image/banner_3.jpg";
export default () => (
  <Carousel
    showThumbs={false}
    showStatus={false}
    autoPlay
    className="max-w-[1600px] max-h-[492px] object-cover mx-auto p-8"
  >
    <div>
      <img
        className=" object-cover rounded-xl"
        src={HeadImage1}
        alt="mainImg"
      />
    </div>
    <div>
      <img
        className=" object-cover rounded-xl"
        src={HeadImage2}
        alt="mainImg"
      />
    </div>
    <div>
      <img
        className=" object-cover rounded-xl"
        src={HeadImage3}
        alt="mainImg"
      />
    </div>
  </Carousel>
);
