import React from "react";
import Image, { StaticImageData } from "next/image";
// internal
import icon from "@/assets/images/icon/icon_22.svg";
import user_1 from "@/assets/images/assets/img_22.jpg";
import user_2 from "@/assets/images/assets/img_23.jpg";
import user_3 from "@/assets/images/assets/img_24.jpg";
import user_4 from "@/assets/images/assets/img_25.jpg";

// feedback desc
const feedback_desc: {
  active?: boolean;
  desc: string;
  name: string;
  location: string;
}[] = [
  {
    active: true,
    desc: "“Very easy to set-up. I had no experience with hosting before signing up with Jobi but they have made everything seem simple.”",
    name: "John Doe.",
    location: "Italy",
  },
  {
    desc: "“Very easy to set-up. I had no experience with hosting before signing up with Jobi but they have made everything seem simple.”",
    name: "Juan Marko.",
    location: "London",
  },
  {
    desc: "“Very easy to set-up. I had no experience with hosting before signing up with Jobi but they have made everything seem simple.”",
    name: "Julia Ark.",
    location: "California",
  },
  {
    desc: "“Very easy to set-up. I had no experience with hosting before signing up with Jobi but they have made everything seem simple.”",
    name: "Shani Milar..",
    location: "Milan",
  },
];

// indicators
const indicators: {
  user: StaticImageData;
  active?: boolean;
}[] = [
  { user: user_1, active: true },
  { user: user_2 },
  { user: user_3 },
  { user: user_4 },
];

const FeedbackThree = () => {
  return (
    <section className="feedback-section-three position-relative mt-170 xl-mt-150 lg-mt-100">
      <div className="container position-relative">
        <div className="row">
          <div className="col-xl-6 col-lg-7 col-md-8 m-auto">
            <div className="title-two text-center wow fadeInUp" data-wow-delay="0.3s">
              <Image
                src={icon}
                alt="icon"
                className="lazy-img me-auto ms-auto mb-10"
              />
              <h2 className="fw-600 color-blue">
                Check what these clients have to say.
              </h2>
            </div>
          </div>
        </div>

        <div
          id="feedBack_carousel"
          className="carousel slide mt-55 lg-mt-30"
          data-bs-ride="carousel"
        >
          <div className="row">
            <div className="col-xxl-9 col-lg-8 col-md-10 m-auto">
              <div className="carousel-inner text-center">
                {feedback_desc.map((item, i) => (
                  <div
                    key={i}
                    className={`carousel-item ${item.active ? "active" : ""}`}
                    data-bs-interval={`${item.active && "1000000"}`}
                  >
                    <p>{item.desc}</p>
                    <div className="d-inline-block position-relative name fw-500 text-dark text-lg">
                      {item.name}{" "}
                      <span className="fw-normal opacity-50">
                        {item.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev carousel-btn"
            type="button"
            data-bs-target="#feedBack_carousel"
            data-bs-slide="prev"
          >
            <i className="bi bi-chevron-left"></i>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next carousel-btn"
            type="button"
            data-bs-target="#feedBack_carousel"
            data-bs-slide="next"
          >
            <i className="bi bi-chevron-right"></i>
            <span className="visually-hidden">Next</span>
          </button>
          <div className="carousel-indicators">
            {indicators.map((item, i) => (
              <button
                key={i}
                type="button"
                data-bs-target="#feedBack_carousel"
                data-bs-slide-to={i}
                className={item.active ? "active" : ""}
                aria-current={item.active ? "true" : "false"}
                aria-label={`Slide ${i + 1}`}
              >
                <Image
                  src={item.user}
                  alt="user"
                  className="lazy-img rounded-circle user"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackThree;
