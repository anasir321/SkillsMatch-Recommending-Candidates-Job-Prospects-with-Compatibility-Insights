import React from "react";
import Image from "next/image";
import Link from "next/link";
import category_dropdown from "@/data/category-dropdown";

const CategorySectionSix = ({style_2=false}:{style_2?:boolean}) => {
  const category_items = category_dropdown.flatMap(
    (category) => category.category_items
  );
  return (
    <section className={`category-section-five position-relative ${style_2?'mt-85 md-mt-60':'mt-190 lg-mt-150'}`}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-8">
            <div className="title-four text-center text-lg-start wow fadeInUp" data-wow-delay="0.3s">
              <h2>Most Demanding Categories.</h2>
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
        <div className="card-wrapper d-flex flex-wrap justify-content-center justify-content-lg-between pt-50 lg-pt-30">
          {category_items.map((item, i) => (
            <div
              key={item.id}
              className="card-style-seven bg-color text-center mt-15 wow fadeInUp"
              data-wow-delay={`0.${i + 1}s`}
            >
              <Link href="/job-grid-v3"
                className="wrapper d-flex align-items-center"
                style={{background:style_2?`${item.bg_clr}`:''}}
              >
                <div className="icon d-flex align-items-center justify-content-center">
                  <Image src={item.icon} alt="icon" className="lazy-img" />
                </div>
                <div className="title fw-500">{item.title}</div>
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
  );
};

export default CategorySectionSix;
