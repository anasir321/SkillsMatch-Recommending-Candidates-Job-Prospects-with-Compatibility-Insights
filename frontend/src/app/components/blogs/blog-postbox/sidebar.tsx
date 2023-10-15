import React from "react";
import Image from "next/image";
import Link from "next/link";
import blog_data from "@/data/blog-data";

const BlogSidebar = () => {
  const recent_blogs = blog_data.slice(-3);
  return (
    <div className="blog-sidebar ps-xl-4 md-mt-60">
      <form action="#" className="search-form position-relative mb-50 lg-mb-40">
        <input type="text" placeholder="Search..." />
        <button>
          <i className="bi bi-search"></i>
        </button>
      </form>

      <div className="category-list mb-60 lg-mb-40">
        <h3 className="sidebar-title">Category</h3>
        <ul className="style-none">
          <li>
            <a href="#">Education (3)</a>
          </li>
          <li>
            <a href="#">Information (4)</a>
          </li>
          <li>
            <a href="#">Interview (2)</a>
          </li>
          <li>
            <a href="#">Speaking (8)</a>
          </li>
          <li>
            <a href="#">Skill (5)</a>
          </li>
          <li>
            <a href="#">Developer (3)</a>
          </li>
          <li>
            <a href="#">Account (7)</a>
          </li>
        </ul>
      </div>
      <div className="sidebar-recent-news mb-60 lg-mb-40">
        <h4 className="sidebar-title">Recent News</h4>
        {recent_blogs.map((b, i) => (
          <div
            key={i}
            className={`news-block d-flex align-items-center pt-20 pb-20 border-top ${
              i === recent_blogs.length - 1 ? "border-bottom" : ""
            }`}
          >
            <div>
              <Image src={b.img} alt="" className="lazy-img" />
            </div>
            <div className="post ps-4">
              <h4 className="mb-5">
                <Link href={`/blog-details/${b.id}`} className="title tran3s">
                  {b.title}
                </Link>
              </h4>
              <div className="date">{b.date}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="sidebar-keyword">
        <h4 className="sidebar-title">Keywords</h4>
        <ul className="style-none d-flex flex-wrap">
          <li>
            <a href="#">Ideas</a>
          </li>
          <li>
            <a href="#">Education</a>
          </li>
          <li>
            <a href="#">Design</a>
          </li>
          <li>
            <a href="#">Development</a>
          </li>
          <li>
            <a href="#">Branding</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
