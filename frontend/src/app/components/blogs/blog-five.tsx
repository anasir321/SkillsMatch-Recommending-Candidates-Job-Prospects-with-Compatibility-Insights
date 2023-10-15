import React from "react";
import Link from "next/link";
import blog_data from "@/data/blog-data";
import BlogItemFive from "./blog-item/blog-item-5";

const BlogFive = () => {
  const blog_items = blog_data.filter((b) => b.blog === "blog-four");
  return (
    <section className="blog-section-one mt-160 xl-mt-130 lg-mt-100">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-7">
              <div className="title-one mb-20 lg-mb-10 wow fadeInUp" data-wow-delay="0.3s">
                <h2 className="main-font">Jobi Guides</h2>
              </div>
            </div>
          </div>
          <div className="row gx-xl-5">
            {blog_items.map((item) => (
              <div key={item.id} className="col-sm-6">
                <BlogItemFive blog={item} />
              </div>
            ))}
          </div>
          <div className="text-center explore-btn sm-mt-50">
            <Link href="/blog-v1" className="btn-six">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogFive;
