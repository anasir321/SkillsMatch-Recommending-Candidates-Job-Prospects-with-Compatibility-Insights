import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IBlogDataType } from "@/types/blog-type";

const BlogItemFive = ({ blog }: { blog: IBlogDataType }) => {
  return (
    <article className="blog-meta-two mt-35 xs-mt-20 wow fadeInUp">
      <figure className="post-img m0">
        <Link href={`/blog-details/${blog.id}`} className="w-100 d-block">
          <Image src={blog.img} alt="" className="lazy-img w-100 tran4s" />
        </Link>
        <Link href={`/blog-details/${blog.id}`} className="tags fw-500">
          {blog.tags[0]}
        </Link>
      </figure>
      <div className="post-data mt-35 lg-mt-20">
        <div className="date">
          {blog.featured && (
            <span className="fw-500 text-dark">Featured -</span>
          )}{" "}
          <Link href={`/blog-details/${blog.id}`}>{blog.date}</Link>
        </div>
        <Link href={`/blog-details/${blog.id}`}>
          <h4 className="tran3s blog-title">{blog.title}</h4>
        </Link>
        <Link href={`/blog-details/${blog.id}`}
          className="continue-btn tran3s d-flex align-items-center"
        >
          <span className="fw-500 me-2">Continue Reading</span>
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
};

export default BlogItemFive;
