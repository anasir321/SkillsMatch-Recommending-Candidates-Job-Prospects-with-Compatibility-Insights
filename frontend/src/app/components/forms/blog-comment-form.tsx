import React from "react";

const BlogCommentForm = () => {
  return (
    <form action="#" className="mt-30">
      <div className="input-wrapper mb-35">
        <label>Name*</label>
        <input type="text" placeholder="James Brower" />
      </div>
      <div className="input-wrapper mb-40">
        <label>Email*</label>
        <input type="email" placeholder="james@example.com" />
      </div>
      <div className="input-wrapper mb-30">
        <textarea placeholder="Your Comment"></textarea>
      </div>
      <button className="btn-ten fw-500 text-white text-center pe-5 ps-5 tran3s">
        Post Comment
      </button>
    </form>
  );
};

export default BlogCommentForm;
