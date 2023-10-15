import React from 'react';
import Link from 'next/link';
import AccordionItem from '../accordion/accordion-item';
import { FeatureImgData } from './feature-one';

const FeatureTen = () => {
  return (
    <section className="text-feature-one position-relative pt-150 lg-pt-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-5 order-lg-last">
            <div className="wow fadeInRight">
              <div className="title-two">
                <div className="sub-title">Why choose us?</div>
                <h2 className="main-font">World of talent at your fingertips</h2>
              </div>
              <div className="accordion accordion-style-one color-two mt-40" id="accordionOne">
                <AccordionItem id='one' isShow={true} title='Seamless Search' desc='It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand. It only takes 5 minutes.' parent='accordionOne' />
                <AccordionItem id='two' title='Hire top talents' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
                <AccordionItem id='three' title='Protected payments, every time' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
              </div>
              <Link href="/candidates-v2" className="btn-five mt-45 md-mt-30">Learn More</Link>
            </div>
          </div>
          <div className="col-lg-7 col-md-11 m-auto order-lg-first">
            <FeatureImgData />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureTen;