import React from "react";
import { IBlogDataType } from "@/types/blog-type";
import Image from "next/image";
import Link from "next/link";

const BlogItemTwo = ({ blog }: { blog: IBlogDataType }) => {
  return (
    <article className="blog-meta-one mt-35 wow fadeInUp">
      <figure className="post-img m0">
        <Link href={`/blog-details/${blog.id}`} className="w-100 d-block">
          <Image
            src={blog.img}
            alt="blog-img"
            className="lazy-img w-100 tran4s blog-img"
          />
        </Link>
      </figure>
      <div className="post-data mt-30 lg-mt-20">
        <div>
          <Link href={`/blog-details/${blog.id}`} className="date text-uppercase">
            {blog.date}
          </Link>
        </div>
        <Link href={`/blog-details/${blog.id}`} className="mt-10 mb-25 lg-mb-20">
          <h4 className="tran3s blog-title">{blog.title}</h4>
        </Link>
        <div>
          <Link href={`/blog-details/${blog.id}`} className="btn-seven">
            Read More
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogItemTwo;
