import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IBlogDataType } from "@/types/blog-type";

const BlogItem = ({blog,style_2=false}:{blog:IBlogDataType;style_2?:boolean}) => {
  const { id,img, tags, featured, title, date,grid_img } = blog || {};
  return (
    <article className={`blog-meta-two ${style_2?'mb-60':'mb-75'} lg-mb-40`}>
      <figure className="post-img m0">
        <Link href={`/blog-details/${id}`} className="w-100 d-block">
          <Image src={style_2 ? grid_img! : img} alt="blog-img" className="lazy-img w-100 tran4s" />
        </Link>
        <Link href={`/blog-details/${id}`} className="tags color-two fw-500">
          {tags[0]}
        </Link>
      </figure>
      <div className="post-data mt-35 lg-mt-20">
        <div className="date">
          {featured && <span className="fw-500 text-dark">Featured -</span>}
          <Link href={`/blog-details/${id}`}>{date}</Link>
        </div>
        <Link href={`/blog-details/${id}`}>
          <h4 className="tran3s blog-title">{style_2 ? `${title.slice(0,20)}..` : title}</h4>
        </Link>
        <Link href={`/blog-details/${id}`}
          className="continue-btn tran3s d-flex align-items-center"
        >
          <span className="fw-500 me-2">Continue Reading</span>
          <i className="bi bi-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
};

export default BlogItem;
