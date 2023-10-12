import React from "react";
import Image from "next/image";
import Link from "next/link";
import icon from "@/assets/images/icon/icon_42.svg";
import { IBlogDataType } from "@/types/blog-type";

const BlogItemFour = ({ blog }: { blog: IBlogDataType }) => {
  return (
    <article className="blog-meta-one mt-35 xs-mt-20 wow fadeInUp">
      <figure className="post-img m0">
        <Link href={`/blog-details/${blog.id}`} className="w-100 d-block">
          <Image
            src={blog.img}
            alt="blog img"
            className="lazy-img w-100 tran4s"
            style={{height:'auto'}}
          />
        </Link>
      </figure>
      <div className="post-data mt-30 lg-mt-20">
        <div>
          <Link href={`/blog-details/${blog.id}`} className="date">
            {blog.date}
          </Link>
        </div>
        <Link href={`/blog-details/${blog.id}`} className="mt-10 mb-5">
          <h4 className="tran3s blog-title">
            {blog.title}
          </h4>
        </Link>
        <p className="mb-20">
          {blog.desc}…
        </p>
        <Link href={`/blog-details/${blog.id}`} className="read-more">
          <Image src={icon} alt="icon" className="lazy-img" />
        </Link>
      </div>
    </article>
  );
};

export default BlogItemFour;
