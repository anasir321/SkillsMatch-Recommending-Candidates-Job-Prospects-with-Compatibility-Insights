import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import img_1 from '@/assets/images/assets/img_11.jpg';
import img_2 from '@/assets/images/assets/img_12.jpg';
import img_3 from '@/assets/images/assets/img_13.jpg';
import shape_1 from '@/assets/images/shape/shape_06.svg';
import shape_2 from '@/assets/images/shape/shape_21.svg';
import AccordionItem from '../accordion/accordion-item';

const FeatureSeven = () => {
  return (
    <>
      <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 order-lg-last">
              <div className="ps-lg-4 wow fadeInRight">
                <div className="title-one">
                  <div className="sub-title">Looking for an expert?</div>
                  <h2 className="text-dark">Find top talents from jobi.</h2>
                </div>
                <div className="accordion accordion-style-one mt-25" id="accordionOne">
                  <AccordionItem id='one' isShow={true} title='Seamless Search' desc='It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand. It only takes 5 minutes.' parent='accordionOne' />
                  <AccordionItem id='two' title='Hire top talents' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
                </div>
                <Link href="/candidates-v2" className="btn-seven border6 mt-70 lg-mt-40">Find Talents</Link>
              </div>
            </div>
            <div className="col-lg-7 col-md-8 m-auto order-lg-first">
              <div className="img-data position-relative me-xl-5 md-mt-20">
                <div className="row align-items-center">
                  <div className="col-6">
                    <Image src={img_1} alt="image" className="lazy-img mt-35 md-mt-20 wow fadeInLeft" />
                  </div>
                  <div className="col-6">
                    <Image src={img_2} alt="image" className="lazy-img mt-35 md-mt-20 wow fadeInDown" />
                    <Image src={img_3} alt="image" className="lazy-img mt-35 md-mt-20 wow fadeInUp" />
                  </div>
                </div>
                <Image src={shape_1} alt="shape" className="lazy-img shapes shape_02" />
                <Image src={shape_2} alt="shape" className="lazy-img shapes shape_03" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSeven;