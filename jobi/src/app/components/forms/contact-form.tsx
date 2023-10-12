"use client";
import React from "react";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import emailjs from "@emailjs/browser";
import { notifyError, notifySuccess } from "@/utils/toast";

// form data type
type IFormData = {
  name: string;
  email: string;
  subject?: string;
  message: string;
};

// schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().label("Subject"),
  message: Yup.string().required().label("Subject"),
});
// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.name ? values : {},
    errors: !values.name
      ? {
          name: {
            type: "required",
            message: "Name is required.",
          },
          email: {
            type: "required",
            message: "Email is required.",
          },
          message: {
            type: "required",
            message: "Message is required.",
          },
        }
      : {},
  };
};
const ContactForm = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  const onSubmit = (data: IFormData) => {
    const templateParams = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    if (data) {
      emailjs
        .send(
          'service_gnu2rla', 
          'template_ilrquco', 
          templateParams,
          'tDbxqotWh8Z0dv0h6'
        )
        .then(
          (response) => {
            // console.log("SUCCESS!", response.status, response.text);
            notifySuccess('Your message sent successfully');
          },
          (err) => {
            // console.log("FAILED...", err);
            notifyError(err?.text);
          }
        );
    }

    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="messages"></div>
      <div className="row controls">
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="">Name*</label>
            <input
              type="text"
              placeholder="Your Name*"
              {...register("name", { required: `Name is required!` })}
              name="name"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.name?.message!} />
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="input-group-meta form-group mb-30">
            <label htmlFor="">Email*</label>
            <input
              type="email"
              placeholder="Email Address*"
              {...register("email", { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <label htmlFor="">Subject (optional)</label>
            <input
              {...register("subject", { required: false })}
              type="text"
              placeholder="Write about the subject here.."
              name="subject"
            />
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta form-group mb-35">
            <textarea
              placeholder="Your message*"
              {...register("message", { required: `Message is required!` })}
              name="message"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.message?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <button className="btn-eleven fw-500 tran3s d-block">
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
