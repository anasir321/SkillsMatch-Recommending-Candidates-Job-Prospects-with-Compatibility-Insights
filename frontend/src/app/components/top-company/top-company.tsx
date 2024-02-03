import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import company_1 from '@/assets/images/logo/media_29.png';
import company_2 from '@/assets/images/logo/media_30.png';
import company_3 from '@/assets/images/logo/media_31.png';
import company_4 from '@/assets/images/logo/media_32.png';

// company data 
const company_data: {
  id: number;
  icon: StaticImageData;
  name: string;
  desc: string;
  job: number;
}[] = [
    {
      id: 1,
      icon: company_1,
      name: 'Payoneer',
      desc: 'New York, New York; Seattle, Washington',
      job: 3,
    },
    {
      id: 2,
      icon: company_2,
      name: 'Medium',
      desc: 'New York, New York; Seattle, Washington',
      job: 5,
    },
    {
      id: 3,
      icon: company_3,
      name: 'Linkedin',
      desc: 'New York, New York; Seattle, Washington',
      job: 10,
    },
    {
      id: 4,
      icon: company_4,
      name: 'MacDonald’s',
      desc: 'New York, New York; Seattle, Washington',
      job: 7,
    },
  ]

const TopCompany = () => {
  return (
    <section className="top-company-section pt-100 lg-pt-60 pb-130 lg-pb-80 mt-200 xl-mt-150">
      <div className="container">
        <div className="row justify-content-between align-items-center pb-40 lg-pb-10">
          <div className="col-sm-7">
            <div className="title-one">
              <h2 className="main-font wow fadeInUp" data-wow-delay="0.3s">Top Company</h2>
            </div>
          </div>
          <div className="col-sm-5">
            <div className="d-flex justify-content-sm-end">
              <Link href="/company-v1" className="btn-six d-none d-sm-inline-block">Explore More</Link>
            </div>
          </div>
        </div>

        <div className="row">
          {company_data.map((item) => (
            <div key={item.id} className="col-lg-3 col-sm-6">
              <div className="card-style-ten text-center tran3s mt-25 wow fadeInUp">
                <Image src={item.icon} alt="logo" className="lazy-img m-auto" />
                <div className="text-lg fw-500 text-dark mt-15 mb-30">{item.name}</div>
                <p className="mb-20">{item.desc}...</p>
                <Link href="/company-v2" className="open-job-btn fw-500 tran3s">{item.job} open job</Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-30 d-sm-none">
          <Link href="/company-v1" className="btn-six">Explore More</Link>
        </div>
      </div>
    </section>
  );
};

export default TopCompany;