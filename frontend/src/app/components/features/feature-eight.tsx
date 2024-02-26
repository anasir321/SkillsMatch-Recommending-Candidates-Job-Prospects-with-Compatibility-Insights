import React from 'react';
import Link from 'next/link';
import AccordionItem from '../accordion/accordion-item';
import { FeatureImgBox } from './feature-four';

const FeatureEight = () => {
  return (
    <section className="text-feature-three position-relative pt-200 xl-pt-150 md-pt-80">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 order-lg-last ms-auto">
            <div className="wow fadeInRight">
              <div className="title-one">
                <h2 className="main-font">Find top talents from jobi.</h2>
              </div>
              <div className="accordion accordion-style-one mt-25" id="accordionOne">
                <AccordionItem id='one' isShow={true} title='Seamless Search' desc='It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand. It only takes 5 minutes.' parent='accordionOne' />
                <AccordionItem id='two' title='Hire top talents' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
                <AccordionItem id='three' title='Protected payments, every time' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
              </div>
              <Link href="/candidates-v2" className="btn-five border6 mt-45">Learn More</Link>
            </div>
          </div>
          <div className="col-lg-6 order-lg-first">
            <FeatureImgBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureEight;