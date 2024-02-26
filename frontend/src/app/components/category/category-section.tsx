import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import shape_1 from "@/assets/images/shape/shape_04.svg";
import shape_2 from "@/assets/images/shape/shape_05.svg";
import category_dropdown from "@/data/category-dropdown";

const CategorySection = () => {
  const category_items = category_dropdown.flatMap(
    (category) => category.category_items
  );
  return (
    <section className="category-section-one bg-color position-relative pt-180 xl-pt-150 lg-pt-80 pb-140 xl-pb-120 lg-pb-60">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <div className="title-one wow fadeInUp" data-wow-delay="0.3s">
              <h2>
                Most{" "}
                <span className="position-relative">
                  Demanding{" "}
                  <Image
                    src={shape_1}
                    alt="shape"
                    className="lazy-img shapes shape"
                  />
                </span>{" "}
                Categories.
              </h2>
            </div>
          </div>
          <div className="col-xxl-5 col-lg-6">
            <p className="text-md mb-25 lg-mb-10 md-mt-20">
              Together with useful notifications, collaboration, insights, and
              improvement tip lorem etc.
            </p>
            <Link href="/job-grid-v1"
              className="btn-two d-none d-lg-inline-block"
            >
              Explore all fields
            </Link>
          </div>
        </div>
        <div className="card-wrapper row justify-content-center mt-75 lg-mt-40 md-mt-10">
          {category_items.map((item, i) => (
            <div
              key={i}
              className="card-style-one text-center mt-20 wow fadeInUp"
              data-wow-delay={`0.1${i + 1}s`}
            >
              <Link href="/job-grid-v2" className={`bg wrapper ${i === 0 ? 'active' : ''}`}>
                <div className="icon d-flex align-items-center justify-content-center">
                  <Image src={item.icon} alt="icon" className="lazy-img" />
                </div>
                <div className="title fw-500">{item.title}</div>
                <div className="total-job">{item.count} Jobs</div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-40 d-lg-none">
          <Link href="/job-grid-v1" className="btn-two">
            Explore all fields
          </Link>
        </div>
      </div>
      <Image src={shape_2} alt="shape" className="lazy-img shapes shape_01" />
    </section>
  );
};

export default CategorySection;
