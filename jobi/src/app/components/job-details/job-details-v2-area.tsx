import React from 'react';
import Image from 'next/image';
import icon_1 from '@/assets/images/icon/icon_52.svg';
import icon_2 from '@/assets/images/icon/icon_53.svg';
import icon_3 from '@/assets/images/icon/icon_54.svg';
import icon_4 from '@/assets/images/icon/icon_55.svg';
import icon_5 from '@/assets/images/icon/icon_56.svg';

const JobDetailsV2Area = () => {
  return (
    <section className="job-details style-two pt-100 lg-pt-80 pb-130 lg-pb-80">
      <div className="container">
        <div className="row">
          <div className="col-xxl-9 col-xl-10 m-auto">
            <div className="details-post-data ps-xxl-4 pe-xxl-4">
              <ul className="job-meta-data-two d-flex flex-wrap justify-content-center justify-content-lg-between style-none">
                <div className="bg-wrapper bg-white text-center">
                  <Image src={icon_1} alt="icon" className="lazy-img m-auto icon" />
                  <span>Salary</span>
                  <div>50k-60k/year</div>
                </div>
                <div className="bg-wrapper bg-white text-center">
                  <Image src={icon_2} alt="icon" className="lazy-img m-auto icon" />
                  <span>Expertise</span>
                  <div>Intermediate</div>
                </div>
                <div className="bg-wrapper bg-white text-center">
                  <Image src={icon_3} alt="icon" className="lazy-img m-auto icon" />
                  <span>Location</span>
                  <div>Spain, Barcelona </div>
                </div>
                <div className="bg-wrapper bg-white text-center">
                  <Image src={icon_4} alt="icon" className="lazy-img m-auto icon" />
                  <span>Job Type</span>
                  <div>Fulltime</div>
                </div>
                <div className="bg-wrapper bg-white text-center">
                  <Image src={icon_5} alt="icon" className="lazy-img m-auto icon" />
                  <span>Experience</span>
                  <div>2 years</div>
                </div>
              </ul>

              <div className="post-block mt-50 lg-mt-40">
                <h4 className="block-title">Overview</h4>
                <p>When team members told us they needed more flexibility around where and how they worked, we acted, creating two options to accommodate two different styles of work. One non-negotiable principle along the way? We had to retain our deep culture of collaboration, both among ourselves and with our clients. Introducing Work From Near and Work From Anywhere at WillowTree. <a href="#">Learn more here</a>. Please indicate which location(s) you are interested.</p>
              </div>
              <div className="post-block mt-60 lg-mt-40">
                <h4 className="block-title">Job Description</h4>
                <p>As a <a href="#">Product Designer</a> at WillowTree, you’ll give form to ideas by being the voice and owner of product decisions. You’ll drive the design direction, and then make it happen!</p>
                <p>We understand our responsibility to create a diverse, equitable, and inclusive place within the tech industry, while pushing to make our industry more representative. </p>
              </div>
              <div className="post-block mt-70 lg-mt-40">
                <h4 className="block-title">Responsibilities</h4>
                <ul className="list-type-one style-none mb-15">
                  <li>Collaborate daily with a multidisciplinary team of Software Engineers, Researchers, Strategists, and Project Managers.</li>
                  <li>Co-lead ideation sessions, workshops, demos, and presentations with clients on-site</li>
                  <li>Push for and create inclusive, accessible design for all</li>
                  <li>Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.</li>
                  <li>Sketch, wireframe, build IA, motion design, and run usability tests</li>
                  <li>Design pixel perfect responsive UI’s and understand that adopting common interface pattern is better for UX than reinventing the wheel</li>
                  <li>Ensure content strategy and design are perfectly in-sync</li>
                  <li>Give and receive design critique to help constantly refine and push our work</li>
                </ul>
              </div>
              <div className="post-block mt-55 lg-mt-40">
                <h4 className="block-title">Required Skills:</h4>
                <ul className="list-type-two style-none mb-15">
                  <li>You’ve been designing digital products for 2+ years.</li>
                  <li>A portfolio that exemplifies strong visual design and a focus on defining the user experience.</li>
                  <li>You’ve proudly shipped and launched several products.</li>
                  <li>You have some past experience working in an agile environment – Think two-week sprints.</li>
                  <li>Experience effectively presenting and communicating your design decisions to clients and team members</li>
                  <li>Up-to-date knowledge of design software like Figma, Sketch etc.</li>
                </ul>
              </div>
              <div className="post-block mt-55 lg-mt-40">
                <h4 className="block-title">Benefits:</h4>
                <ul className="list-type-two style-none mb-15">
                  <li>We are a remote-first company.</li>
                  <li>100% company-paid health insurance premiums for you & your dependents</li>
                  <li>Vacation stipend</li>
                  <li>Unlimited paid vacation and paid company holidays</li>
                  <li>Monthly wellness/gym stipend</li>
                </ul>
              </div>
              <a href="#" className="btn-ten fw-500 text-white text-center tran3s mt-30">Apply for this position</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsV2Area;