"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo/logo_06.png';
import dark_logo from '@/assets/images/logo/logo_04.png';
import Menus from './component/menus';
import useSticky from '@/hooks/use-sticky';
import LoginModal from '@/app/components/common/popup/login-modal';

const HeaderSix = ({dark_style=false}:{dark_style?:boolean}) => {
  const {sticky} = useSticky();
  return (
    <>
    <header className={`theme-main-menu menu-overlay ${dark_style?'':'menu-style-two'} sticky-menu ${sticky?'fixed':''}`}>
      <div className="inner-content position-relative">
        <div className="top-header">
          <div className="d-flex align-items-center justify-content-between">
            <div className="logo order-lg-0">
              <Link href="/" className="d-flex align-items-center">
                <Image src={dark_style ? dark_logo : logo} alt="logo" priority />
              </Link>
            </div>
            <div className="right-widget ms-auto ms-lg-0 order-lg-2">
              <ul className="d-flex align-items-center style-none">
                <li><a href="#" className={`fw-500 login-btn-three ${dark_style?'dark-style':''} tran3s`} data-bs-toggle="modal" data-bs-target="#loginModal">Login/Sign up</a></li>
                <li className="d-none d-md-block ms-3"><Link href="/register" className="btn-five">Post a job</Link></li>
              </ul>
            </div>

            <nav className="navbar navbar-expand-lg p0 ms-3 ms-lg-5 order-lg-1">
              <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                <span></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="d-block d-lg-none"><div className="logo">
                    <Link href="/" className="d-block">
                      <Image src={dark_style ? dark_logo : logo} alt="logo" priority width="100" />
                    </Link>
                  </div>
                  </li>
                  {/* menus start */}
                  <Menus />
                  {/* menus end */}
                  <li className="d-md-none mt-5"><Link href="/register" className="btn-five w-100">Post a job</Link></li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>

    {/* login modal start */}
      <LoginModal/>
    {/* login modal end */}
    </>
  );
};

export default HeaderSix;