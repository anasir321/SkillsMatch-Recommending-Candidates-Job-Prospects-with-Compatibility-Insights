import React from "react";
import Image from "next/image";
import Link from "next/link";
import category_dropdown from "@/data/category-dropdown";

const CategorySectionFour = ({style_2=false}: { style_2?: boolean }) => {
  const category_items = category_dropdown.flatMap(
    (category) => category.category_items
  );
  return (
    <>
      <section className={`category-section-one position-relative ${style_2 ? 'mt-120 lg-mt-80' : ''}`}>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-8">
              <div className="title-three">
                <h2 className={` wow fadeInUp fw-600 ${style_2 ? 'text-dark' : 'color-blue'}`} data-wow-delay="0.3s">{style_2 ? 'Most Demanding Categories.' : 'Explore the marketplace.'}</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="d-flex justify-content-lg-end">
                <Link href="/job-grid-v2"
                  className="btn-six d-none d-lg-inline-block"
                >
                  Explore all fields
                </Link>
              </div>
            </div>
          </div>
          <div className="card-wrapper row justify-content-center mt-45 lg-mt-30">
            {category_items.map((item, i) => (
              <div
                key={i}
                className="card-style-one text-center mt-20 wow fadeInUp"
              >
                <Link href="/job-grid-v3"
                  className={`wrapper ${i === 0 ? "active" : ""}`}
                  data-wow-delay={`0.${i + 2}s`}
                >
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
            <Link href="/job-grid-v2" className="btn-six">
              Explore all fields
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategorySectionFour;
