import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import img_1 from '@/assets/images/assets/img_37.jpg';
import img_2 from '@/assets/images/assets/img_38.jpg';
import img_3 from '@/assets/images/assets/img_04.jpg';
import screen_1 from '@/assets/images/assets/screen_01.png';
import screen_2 from '@/assets/images/assets/screen_02.png';
import screen_3 from '@/assets/images/assets/screen_03.png';
import AccordionItem from '../accordion/accordion-item';

// style 
const imgStyle = {
  height: 'auto'
}

const FeatureNine = () => {
  return (
    <section className="text-feature-one position-relative pt-180 xl-pt-150 lg-pt-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="wow fadeInLeft">
              <div className="title-two">
                <div className="sub-title">Why choose us?</div>
                <h2 className="main-font color-blue">World of talent at your fingertips</h2>
              </div>
              <div className="accordion accordion-style-one color-two mt-40" id="accordionOne">
                <AccordionItem id='one' isShow={true} title='Seamless Search' desc='It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand. It only takes 5 minutes.' parent='accordionOne' />
                <AccordionItem id='two' title='Hire top talents' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
                <AccordionItem id='three' title='Protected payments, every time' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
              </div>
              <Link href="/candidates-v3" className="btn-five mt-45 lg-mt-20">Learn More</Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-11 ms-auto me-auto me-lg-0">
            <div className="img-data position-relative md-mt-50">
              <div className="row">
                <div className="col-md-6 col-sm-8 col-10">
                  <Image src={img_1} alt="image" className="lazy-img img01" style={imgStyle} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-5">
                  <Image src={img_2} alt="image" className="lazy-img img02 mt-35" style={imgStyle} />
                </div>
                <div className="col-md-6 col-7">
                  <Image src={img_3} alt="image" className="lazy-img img01 mt-35" style={imgStyle} />
                </div>
              </div>
              <Image src={screen_1} alt="screen" className="lazy-img shapes screen01 wow fadeInRight" style={imgStyle} />
              <Image src={screen_2} alt="screen" className="lazy-img shapes screen02 wow fadeInUp" style={imgStyle} />
              <Image src={screen_3} alt="screen" className="lazy-img shapes screen03 wow fadeInUp" style={imgStyle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureNine;