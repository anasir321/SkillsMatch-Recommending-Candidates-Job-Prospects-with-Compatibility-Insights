import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// internal
import logo from '@/assets/images/logo/logo_04.png';
import shape from '@/assets/images/shape/shape_28.svg';
import { WidgetOne, WidgetThree, WidgetTwo } from './component/footer-widgets';
import SocialLinks from './component/social-links';

const FooterTwo = () => {
  return (
    <div className="footer-one">
      <div className="container">
        <div className="inner-wrapper">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-3 footer-intro mb-15">
              <div className="logo mb-25">
                <Link href="/" className="d-flex align-items-center">
                  <Image src={logo} alt="logo" priority />
                </Link>
              </div>
              <a href="#" className="email fw-500">jobisupport@new.com</a>
              <Image src={shape} alt="shape" className="lazy-img mt-50 sm-mt-30 sm-mb-20" />
            </div>
            {/* widget one */}
            <WidgetOne cls='col-lg-2 col-sm-4' />
            {/* widget two */}
            <WidgetTwo cls='col-lg-2 col-sm-4' />
            {/* widget three */}
            <WidgetThree cls='col-xl-2 col-lg-3 col-sm-4' />
            {/* widget end */}
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 order-lg-3 mb-15">
              <ul className="style-none d-flex order-lg-last justify-content-center justify-content-lg-end social-icon">
                <SocialLinks />
              </ul>
            </div>
            <div className="col-lg-4 order-lg-1 mb-15">
              <ul className="d-flex style-none bottom-nav justify-content-center justify-content-lg-start">
                <li><Link href='/contact'>Privacy & Terms.</Link></li>
                <li><Link href='/contact'> Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-lg-4 order-lg-2">
              <p className="text-center mb-15">Copyright @{new Date().getFullYear()} jobi inc.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTwo;