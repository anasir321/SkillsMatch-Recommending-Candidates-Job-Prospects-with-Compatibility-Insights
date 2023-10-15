"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import logo from '@/assets/images/logo/logo_04.png';
import icon from '@/assets/images/icon/icon_21.svg';
import NiceSelect from '@/ui/nice-select';
import useSticky from '@/hooks/use-sticky';
import LoginModal from '@/app/components/common/popup/login-modal';

// search select
function SearchSelect() {
  const handleChange = (item: { value: string; label: string }) => {

  }
  return (
    <NiceSelect
      options={[
        { value: "talents", label: "Talents" },
        { value: "jobs", label: "Jobs" }
      ]}
      defaultCurrent={0}
      onChange={(item) => handleChange(item)}
      name="looking for"
      cls='lg'
    />
  )
}

const HeaderThree = () => {
  const {sticky} = useSticky()
  return (
    <>
      <header className={`theme-main-menu sticky-menu ${sticky?'fixed':''}`}>
        <div className="inner-content position-relative">
          <div className="top-header">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image src={logo} alt="logo" priority style={{height:'auto'}} />
                </Link>
              </div>
              <form action="#" className="header-search position-relative d-none d-sm-block ms-lg-5 ms-md-3 order-lg-1">
                <Image src={icon} alt="icon" className="lazy-img icon" />
                <input type="text" placeholder="Search here.." />
                <SearchSelect/>
              </form>
              <div className="right-widget ms-auto ms-xl-5 order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  <li><a href="#" className="fw-500 login-btn-two" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a></li>
                  <li className="d-none d-lg-block ms-4"><Link href='/register' className="btn-five">Register</Link></li>
                </ul>
              </div>
              <nav className="navbar navbar-expand-lg p0  ms-3 ms-lg-auto order-lg-2">
                <button className="navbar-toggler d-block d-lg-none" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="d-block d-lg-none">
                      <div className="logo">
                        <Link href="/" className="d-block">
                          <Image src={logo} alt="logo" width="100"priority style={{height:'auto'}} />
                        </Link>
                      </div>
                    </li>
                    <li className="d-sm-none xs-mb-20">
                      <form action="#" className="header-search position-relative">
                        <Image src={icon} alt="icon" className="lazy-img icon" />
                        <input type="text" placeholder="Search here.." />
                        <SearchSelect/>
                      </form>
                    </li>
                    <li className="nav-item dropdown d-lg-none">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Browse Categories</a>
                      <ul className="dropdown-menu">
                        <li><Link href="/job-grid-v3" className="dropdown-item">Design & Creative</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">It & Development</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Trending</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Web & Mobile Dev</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Writing</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Sales & Marketing</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Music & Audio</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Video & Animation</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">AI Services</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Photography</Link></li>
                        <li><Link href="/job-grid-v3" className="dropdown-item">Programming & Tech</Link></li>
                      </ul>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link" href="/job-list-v2" role="button">Find Job</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <Link className="nav-link" href="/candidates-v2" role="button">Find Talents</Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">Pages</a>
                      <ul className="dropdown-menu">
                        <li><Link href="/about-us" className="dropdown-item"><span>About Us</span></Link></li>
                        <li><Link href="/pricing" className="dropdown-item"><span>Pricing</span></Link></li>
                        <li><Link href="/faq" className="dropdown-item"><span>Faq</span></Link></li>
                        <li><Link href="/register" className="dropdown-item"><span>Register</span></Link></li>
                        <li><Link href="/notfound" className="dropdown-item"><span>404 Error</span></Link></li>
                      </ul>
                    </li>
                    <li className="d-lg-none mt-5">
                      <Link href="/register" className="btn-five w-100">Register</Link>
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
      {/* login modal end */}
    </>
  );
};

export default HeaderThree;