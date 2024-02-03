import React from "react";
import BlogSidebar from "../blog-postbox/sidebar";
import BlogPagination from "../blog-postbox/blog-pagination";
import blog_data from "@/data/blog-data";
import BlogItem from "../blog-postbox/blog-item";

const BlogGridArea = () => {
  const blog_items = blog_data
    .filter((b) => b.blog === "blog-postbox")
    .slice(0, 6);
  return (
    <section className="blog-section pt-100 lg-pt-80 pb-120 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              {blog_items.map((b) => (
                <div key={b.id} className="col-md-6">
                  <BlogItem blog={b} style_2={true} />
                </div>
              ))}
            </div>
            <BlogPagination />
          </div>

          <div className="col-lg-4">
            {/* sidebar start */}
            <BlogSidebar />
            {/* sidebar  end */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogGridArea;
