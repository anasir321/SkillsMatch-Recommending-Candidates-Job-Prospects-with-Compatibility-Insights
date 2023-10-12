import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BlogSidebar from '../blog-postbox/sidebar';
import BlogCommentForm from '../../forms/blog-comment-form';
import { IBlogDataType } from '@/types/blog-type';
import img_1 from '@/assets/images/blog/blog_img_32.jpg';
import img_2 from '@/assets/images/blog/blog_img_33.jpg';
import avatar_1 from '@/assets/images/blog/avatar_01.jpg';
import avatar_2 from '@/assets/images/blog/avatar_02.jpg';

const BlogDetailsArea = ({ item }: { item: IBlogDataType }) => {
  return (
    <section className="blog-section pt-100 lg-pt-80">
      <div className="container">
        <div className="border-bottom pb-160 xl-pb-130 lg-pb-80">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-page pe-xxl-5 me-xxl-3">
                <article className="blog-details-meta">
                  <div className="blog-pubish-date">{item.tags[0]} . {item.date} . By <a href="#">{item.author}</a></div>
                  <h2 className="blog-heading">{item.title}</h2>
                  <div className="img-meta mb-15">
                    <Image src={img_1} alt="blog-img" className="lazy-img" /></div>
                  <p>{item.desc}</p> <br />
                  <p>Tempus imperdiet nulla malesuada pellentesque elit eget gravida cum. Sit amet ris nullam eget felis. Enim praesent elementum facilisis leo. Ultricies leo integer.</p>
                  <div className="img-meta mb-15">
                    <Image src={img_2} alt="blog-img" className="lazy-img" /></div>
                  <h5>This response is important for our ability to from mistakes but it also gives rise to self-criticism imperdiet nulla malesu elit.</h5>
                  <p className="pt-15">One touch of a red-hot stove is usually all we need to avoid that kind of discomfort in  future The same is true as we experienc the emotional of stress from our instances. We are quickly learn to fear and thus automatically. Lorem ipsum dolor sit amet.</p>
                  <div className="quote-text">
                    <div className="row">
                      <div className="col-xl-10 m-auto">
                        <blockquote>“Everything is designed. <br />Few things are designed well </blockquote>
                        <div className="name"><span className="fw-500">Brian Reed, </span><span>front-end developer</span></div>
                      </div>
                    </div>
                  </div>
                  <h3>Work Harder & Gain Success</h3>
                  <p>One touch of a red-hot stove is usually all we need to avoid that kind of discomfort in quis elit future. The same Duis aute irure dolor in reprehenderit .</p> <br />
                  <p>is true as we experience the emotional sensation of stress from our firs social rejec ridicule. We quickly learn to fear and thus automatically. potentially stressful situation of wlir ext quiert all kinds, including the most common of all.</p>
                  <div className="bottom-widget border-bottom d-sm-flex align-items-center justify-content-between">
                    <ul className="d-flex tags style-none pb-20">
                      <li>Tag:</li>
                      <li><a href="#">business,</a></li>
                      <li><a href="#">makreting,</a></li>
                      <li><a href="#">tips</a></li>
                    </ul>
                    <ul className="d-flex share-icon align-items-center style-none pb-20">
                      <li>Share:</li>
                      <li><a href="#"><i className="bi bi-google"></i></a></li>
                      <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                      <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                    </ul>
                  </div>
                </article>
                <div className="blog-comment-area">
                  <h3 className="blog-inner-title pb-15">2 Comments</h3>
                  <div className="comment d-flex">
                    <Image src={avatar_1} alt="avatar" className="lazy-img user-avatar rounded-circle" />
                    <div className="comment-text">
                      <div className="name fw-500 tx-dark">Al Hasani</div>
                      <div className="date">13 June, 2023, 7:30pm</div>
                      <p>One touch of a red-hot stove is usually all we need to avoid that kind of lorem discomfort in future. The same true we experience </p>
                      <a href="#" className="reply-btn fw-500 tran3s">Reply</a>
                    </div>
                  </div>
                  <div className="comment d-flex">
                    <Image src={avatar_2} alt="avatar" className="lazy-img user-avatar rounded-circle" />
                    <div className="comment-text">
                      <div className="name fw-500 tx-dark">John Doe.</div>
                      <div className="date">13 June, 2023, 7:30pm</div>
                      <p>One touch of a red-hot stove is usually all we need to avoid that kind of lorem discomfort in future. The same true we experience </p>
                      <a href="#" className="reply-btn fw-500 tran3s">Reply</a>
                    </div>
                  </div>
                </div>
                <div className="blog-comment-form">
                  <h3 className="blog-inner-title">Leave A Comment</h3>
                  <p><Link href="/register" className="text-decoration-underline">Sign</Link> in to post your comment or signup if you do not have any account.</p>
                  <BlogCommentForm />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsArea;