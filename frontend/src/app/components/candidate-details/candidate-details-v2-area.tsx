"use client"
import React,{useState} from 'react';
import EmailSendForm from '../forms/email-send-form';
import CandidateBio from './bio';
import CandidateProfileSlider from './candidate-profile-slider';
import WorkExperience from './work-experience';
import Skills from './skills';
import VideoPopup from '../common/video-popup';

const CandidateDetailsV2Area = () => {
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  return (
    <>
      <section className="candidates-profile bg-color pt-100 lg-pt-70 pb-150 lg-pb-80">
        <div className="container">
          <div className="row">
            <div className="col-xxl-9 col-lg-8">
              <div className="candidates-profile-details me-xxl-5 pe-xxl-4">
                <div className="inner-card mb-65 lg-mb-40">
                  <h3 className="title">Overview</h3>
                  <p>Hello my name is Ariana Gande Connor and I’m a Financial Supervisor from Netherlands, Rotterdam. In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non consequat enim. Sed vitae aliquam velit. Aliquam Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. </p> <br/>
                    <p>Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec.</p>
                </div>
                <h3 className="title">Intro</h3>
                <div className="video-post d-flex align-items-center justify-content-center mt-25 lg-mt-20 mb-75 lg-mb-50">
                  <a className="fancybox rounded-circle video-icon tran3s text-center" 
                   onClick={() => setIsVideoOpen(true)} style={{ cursor: 'pointer' }}>
                    <i className="bi bi-play"></i>
                  </a>
                </div>
                <div className="inner-card mb-75 lg-mb-50">
                  <h3 className="title">Education</h3>
                  <div className="time-line-data position-relative pt-15">
                    <div className="info position-relative">
                      <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">1</div>
                      <div className="text_1 fw-500">University of Boston</div>
                      <h4>Bachelor Degree of Design</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum primis</p>
                    </div>
                    <div className="info position-relative">
                      <div className="numb fw-500 rounded-circle d-flex align-items-center justify-content-center">2</div>
                      <div className="text_1 fw-500">Design Collage</div>
                      <h4>UI/UX Design Course</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                    </div>
                  </div>
                </div>
                <div className="inner-card mb-75 lg-mb-50">
                  <h3 className="title">Skills</h3>
                  {/* skill area */}
                  <Skills />
                  {/* skill area */}
                </div>
                <div className="inner-card mb-60 lg-mb-50">
                  <h3 className="title">Work Experience</h3>
                  {/* WorkExperience */}
                  <WorkExperience />
                  {/* WorkExperience */}
                </div>
                <div className="inner-card">
                  <h3 className="title">Portfolio</h3>
                  {/* Candidate Profile Slider */}
                  <CandidateProfileSlider />
                  {/* Candidate Profile Slider */}
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-4">
              <div className="cadidate-profile-sidebar ms-xl-5 ms-xxl-0 md-mt-60">
                <div className="cadidate-bio bg-wrapper mb-60 md-mb-40">
                  {/* CandidateBio */}
                  <CandidateBio />
                  {/* CandidateBio */}
                  <a href="#" className="btn-ten fw-500 text-white w-100 text-center tran3s mt-15">Download CV</a>
                </div>
                <h4 className="sidebar-title">Location</h4>
                <div className="map-area mb-60 md-mb-40">
                  <div className="gmap_canvas h-100 w-100">
                    <iframe className="gmap_iframe h-100 w-100" src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=bass hill plaza medical centre&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
                  </div>
                </div>
                <h4 className="sidebar-title">Email James Brower.</h4>
                <div className="email-form bg-wrapper">
                  <p>Your email address & profile will be shown to the recipient.</p>
                  <EmailSendForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoPopup isVideoOpen={isVideoOpen} setIsVideoOpen={setIsVideoOpen} videoId={'-6ZbrfSRWKc'} />
      {/* video modal end */}
    </>
  );
};

export default CandidateDetailsV2Area;