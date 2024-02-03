import React from "react";
import BlogSidebar from "./sidebar";
import blog_data from "@/data/blog-data";
import BlogItem from "./blog-item";
import BlogPagination from "./blog-pagination";

const BlogPostboxArea = () => {
  const blog_items = blog_data
    .filter((b) => b.blog === "blog-postbox")
    .slice(0, 4);
  return (
    <section className="blog-section pt-100 lg-pt-80 pb-120 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-11 m-auto">
            <div className="row">
              <div className="col-lg-8">
                {blog_items.map((b) => (
                  <BlogItem key={b.id} blog={b} />
                ))}

                <BlogPagination />
              </div>

              <div className="col-lg-4">
                {/* sidebar start */}
                <BlogSidebar />
                {/* sidebar  end */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPostboxArea;
