import React from "react";
import BlogPagination from "../blog-postbox/blog-pagination";
import blog_data from "@/data/blog-data";
import FullWidthItem from "./full-width-item";

const BlogFullWidthArea = () => {
  const blog_items = blog_data
    .filter((b) => b.blog === "blog-postbox")
    .slice(0, 8);
  return (
    <section className="blog-section bg-color pt-100 lg-pt-80 pb-120 lg-pb-80">
      <div className="container">
        <div className="row gx-xl-5">
          {blog_items.map((b) => (
            <div key={b.id} className="col-md-6">
              <FullWidthItem blog={b} />
            </div>
          ))}
        </div>
        <BlogPagination />
      </div>
    </section>
  );
};

export default BlogFullWidthArea;
