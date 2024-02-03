import React from "react";
import blog_data from "@/data/blog-data";
import BlogItem from "./blog-item/blog-item";
import Link from "next/link";

const BlogOne = () => {
  const blog_items = blog_data.filter(b => b.blog === 'blog-one');
  return (
    <section className="blog-section-one">
      <div className="container">
        <div className="position-relative">
          <div className="title-one mb-30 lg-mb-10 wow fadeInUp" data-wow-delay="0.3s">
            <h2>Jobi Guides</h2>
          </div>

          <div className="row gx-xxl-5">
            {blog_items.map((item) => (
              <div key={item.id} className="col-lg-4 col-md-6">
                <BlogItem item={item} />
              </div>
            ))}
          </div>

          <div className="text-center explore-btn sm-mt-30">
            <Link href="/blog-v1" className="btn-one">
              Explore More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogOne;
