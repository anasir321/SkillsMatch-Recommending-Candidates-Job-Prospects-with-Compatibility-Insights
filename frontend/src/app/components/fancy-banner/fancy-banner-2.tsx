import Link from 'next/link';
import React from 'react';
import CounterUp from '../common/counter-up';

// counter data 
const counter_data: {
  count: number;
  text: string;
  title: string;
}[] = [
    { count: 30, text: 'k+', title: 'World wide Client' },
    { count: 3, text: '%', title: 'Top Talents' },
    { count: 7, text: 'k+', title: 'Dollar Payout' },
  ]

const FancyBannerTwo = () => {
  return (
    <section className="fancy-banner-two mt-200 xl-mt-150 lg-mt-100 md-mt-80">
      <div className="container">
        <div className="bg-wrapper position-relative wow fadeInUp">
          <div className="row">
            <div className="col-xl-6 col-lg-7">
              <div className="text-wrapper">
                <div className="title-two">
                  <div className="sub-title">Business Solution</div>
                  <h2 className="fw-600 text-white">Get quick <br /> Solution for your 
                    <span style={{ color: '#DFA79C' }}>business.</span>
                  </h2>
                </div>
                <p className="text-white mt-25 mb-55 lg-mb-40">A full suite of hybrid workforce management tools are yours to use, as well as access to our top 1% of talent. </p>
                <div className="counter-wrapper pb-50 lg-pb-30">
                  <div className="row">
                    {counter_data.map((c,i) => (
                    <div key={i} className="col-sm-4 col-6">
                      <div className="counter-block mt-20 wow fadeInUp">
                        <div className="main-count text-white fw-500">
                          <span className="counter">
                            <CounterUp number={c.count} text={c.text} />
                          </span>
                        </div>
                        <p className="text-white m0">{c.title}</p>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
                <Link href="/about-us" className="explore-btn tran3s">Explore Jobi business</Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5">
              <div className="img-meta ms-xl-5"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FancyBannerTwo;