import React from "react";
import Image from "next/image";
import shape from "@/assets/images/shape/shape_02.svg";

const MapArea = () => {
  return (
    <div className="inner-banner-one position-relative pb-0">
      <div className="map-banner">
        <div className="gmap_canvas h-100 w-100">
          <iframe
            className="gmap_iframe h-100 w-100"
            src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
      <Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
    </div>
  );
};

export default MapArea;
