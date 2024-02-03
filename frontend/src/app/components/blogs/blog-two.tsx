import React from "react";
import blog_data from "@/data/blog-data";
import BlogItemTwo from "./blog-item/blog-item-2";

const BlogTwo = () => {
  const blog_items = blog_data.filter((b) => b.blog === "blog-two");
  return (
    <section className="blog-section-two pt-180 xl-pt-150 lg-pt-100 pb-150 xl-pb-130 lg-pb-80">
      <div className="container">
        <div className="position-relative">
          <div className="title-one text-center mb-30 lg-mb-10 wow fadeInUp" data-wow-delay="0.3s">
            <h2 className="fw-600">Our Blog</h2>
          </div>
          <div className="row gx-xxl-5">
            {blog_items.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <BlogItemTwo blog={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogTwo;
