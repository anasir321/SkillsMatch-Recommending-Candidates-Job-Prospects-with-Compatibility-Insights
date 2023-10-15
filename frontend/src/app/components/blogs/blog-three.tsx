import React from 'react';
import blog_data from '@/data/blog-data';
import BlogItemThree from './blog-item/blog-item-3';
import Link from 'next/link';

const BlogThree = () => {
  const blog_items = blog_data.filter((b) => b.blog === "blog-three");
  return (
    <section className="blog-section-one mt-160 xl-mt-130 lg-mt-100">
      <div className="container">
        <div className="position-relative">
          <div className="row">
            <div className="col-xl-7">
              <div className="title-one mb-30 lg-mb-10">
                <h2 className="main-font wow fadeInUp" data-wow-delay="0.3s">Jobi Guides</h2>
              </div>
            </div>
          </div>

          <div className="row gx-xl-5">
            {blog_items.map(item => (
              <div key={item.id} className="col-sm-6">
                <BlogItemThree blog={item} />
              </div>
            ))}
          </div>

          <div className="text-center explore-btn sm-mt-50">
            <Link href="/blog-v1" className="btn-six">Explore More</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogThree;