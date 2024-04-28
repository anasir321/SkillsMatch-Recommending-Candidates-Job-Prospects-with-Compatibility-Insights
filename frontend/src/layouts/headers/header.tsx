"use client"
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Menus from "./component/menus";
import logo from "@/assets/images/logo/logo_01.png";
import CategoryDropdown from "./component/category-dropdown";
import LoginModal from "@/app/components/common/popup/login-modal";
import LoginModalCompanyHR from "@/app/components/common/popup/login-modal-companyHR";
import useSticky from "@/hooks/use-sticky";
import { jwtDecode } from "jwt-decode";

// // Define an interface representing the structure of your JWT payload
// interface JwtPayload {
//   firstName: string;
//   lastName: string;
//   // Add more properties if needed
// }

// extract user details from jwt token
const getUserDetails = (token: string) => {
  try{
    const decoded = jwtDecode(token);
    return {
      firstname: decoded.firstname,
      lastname: decoded.lastname,
    }

  } catch(err){
    console.error("Error decoding jwt token", err);
    return null;
  }
}


const Header = () => {
  const {sticky} = useSticky();
  const [isLogged, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState<{ firstname: any; lastname: any; } | null>(null);

  useEffect(() => {
    // Check if JWT token exists in local storage or cookie
    const token = localStorage.getItem("token"); // Adjust this based on where you store your token
    console.log("token", token);

    if (token) {
      // Decode token to get user information
      const userData = getUserDetails(token);
      console.log("userData", userData);

      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  return (
    <>
    <header className={`theme-main-menu menu-overlay menu-style-one sticky-menu ${sticky?'fixed':''}`}>
      <div className="inner-content position-relative">
        <div className="top-header">
          <div className="d-flex align-items-center">
            <div className="logo order-lg-0">
              <Link href="/" className="d-flex align-items-center">
                {/* <Image src={logo} alt="logo" priority /> */}
              </Link>
            </div>
            <div className="right-widget ms-auto order-lg-3">
              <ul className="d-flex align-items-center style-none">
                <li className="d-none d-md-block">
                  <Link href="/register" className="job-post-btn tran3s">
                    Register
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="login-btn-one"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Candidate Login
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="login-btn-one"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModalCompanyHR"
                  >
                    Company HR Login
                  </a>
                </li>
                <li className="d-none d-md-block ms-4">
                  <Link href="/candidates-v1" className="btn-one">
                    Hire Top Talents
                  </Link>
                </li>
              </ul>
            </div>
            <nav className="navbar navbar-expand-lg p0 ms-lg-5 ms-3 order-lg-2">
              <button
                className="navbar-toggler d-block d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav align-items-lg-center">
                  <li className="d-block d-lg-none">
                    <div className="logo">
                      <Link href="/" className="d-block">
                        <Image src={logo} alt="logo" width={100} priority />
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown category-btn mega-dropdown-sm">
                    {/* <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      data-bs-auto-close="outside"
                      aria-expanded="false"
                    >
                      <i className="bi bi-grid-fill"></i> Category
                    </a> */}
                    {/* CategoryDropdown start */}
                    <CategoryDropdown />
                    {/* CategoryDropdown end */}
                  </li>
                  {/* menus start */}
                  <Menus />
                  {/* menus end */}
                  <li className="d-md-none">
                    <Link href='/register' className="job-post-btn tran3s">
                      Post Job
                    </Link>
                  </li>
                  <li className="d-md-none">
                    <Link href="/candidates-v1" className="btn-one w-100">
                      Hire Top Talents
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>

    {/* login modal start */}
    <LoginModal/>
    <LoginModalCompanyHR/>
    {/* login modal end */}
    </>
  );
};

export default Header;
