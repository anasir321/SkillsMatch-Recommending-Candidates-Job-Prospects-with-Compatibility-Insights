"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as Yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import ErrorMsg from "../common/error-msg";
import icon from "@/assets/images/icon/icon_60.svg";
import axios from "axios";

// form data type
type IFormData = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

// schema
const schema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});
// resolver
const resolver: Resolver<IFormData> = async (values) => {
  return {
    values: values.firstname ? values : {},
    errors: !values.firstname
      ? {
          firstname: {
            type: "required",
            message: "First Name is required.",
          },
          lastname: {
            type: "required",
            message: "Last Name is required.",
          },
          email: {
            type: "required",
            message: "Email is required.",
          },
          password: {
            type: "required",
            message: "Password is required.",
          },
        }
      : {},
  };
};

// const resolver: Resolver<IFormData> = async (values: any) => {
//   return {
//     values,
//     errors: {
//       firstname: !values.firstname
//         ? {
//             type: "required",
//             message: "First Name is required.",
//           }
//         : null,
//       lastname: !values.lastname
//         ? {
//             type: "required",
//             message: "Last Name is required.",
//           }
//         : null,
//       email: !values.email
//         ? {
//             type: "required",
//             message: "Email is required.",
//           }
//         : null,
//       password: !values.password
//         ? {
//             type: "required",
//             message: "Password is required.",
//           }
//         : null,
//     },
//   };
// };

const RegisterForm = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({ resolver });
  // on submit
  // const onSubmit = (data: IFormData) => {
  //   if (data) {
  //     alert("Registered successfully!");
  //   }
  //   reset();
  // };

  const onSubmit = async (data: IFormData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", data);
      if(response) {
        alert("Registered successfully!");
        reset();
      } else {
        // const errorData = response.data;
        alert(`Registration failed!:  ${response}`);
      }

    } catch (error){

    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>First Name*</label>
            <input
              type="text"
              placeholder="James"
              {...register("firstname", { required: `First name is required!` })}
              name="firstname"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.firstname?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Last Name*</label>
            <input
              type="text"
              placeholder="Brower"
              {...register("lastname", { required: `Last name is required!` })}
              name="lastname"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.lastname?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              placeholder="james@example.com"
              {...register("email", { required: `Email is required!` })}
              name="email"
            />
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.email?.message!} />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter Password"
              className="pass_log_id"
              {...register("password", { required: `Password is required!` })}
              name="password"
            />
            <span
              className="placeholder_icon"
              onClick={() => setShowPass(!showPass)}
            >
              <span className={`passVicon ${showPass ? "eye-slash" : ""}`}>
                <Image src={icon} alt="pass-icon" />
              </span>
            </span>
            <div className="help-block with-errors">
              <ErrorMsg msg={errors.password?.message!} />
            </div>
          </div>
        </div>
        {/* <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input
                type="checkbox"
                name="remember"
              />
              <label htmlFor="remember">
                By hitting the Register button, you agree to the{" "}
                <a href="#">Terms conditions</a> &{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div> */}
        <div className="col-12">
          <button
            type="submit"
            className="btn-eleven fw-500 tran3s d-block mt-20"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

console.log(resolver)

export default RegisterForm;
