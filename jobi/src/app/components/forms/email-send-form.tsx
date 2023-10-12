import React from "react";

const EmailSendForm = () => {
  return (
    <form action="#">
      <div className="d-sm-flex mb-25">
        <label htmlFor="">Name</label>
        <input type="text" />
      </div>
      <div className="d-sm-flex mb-25">
        <label htmlFor="">Email</label>
        <input type="email" />
      </div>
      <div className="d-sm-flex mb-25 xs-mb-10">
        <label htmlFor="">Message</label>
        <textarea></textarea>
      </div>
      <div className="d-sm-flex">
        <label htmlFor=""></label>
        <button className="btn-ten fw-500 text-white flex-fill text-center tran3s">
          Send{" "}
        </button>
      </div>
    </form>
  );
};

export default EmailSendForm;
