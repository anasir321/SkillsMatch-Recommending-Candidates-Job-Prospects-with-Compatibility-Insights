import React from "react";
import Image from "next/image";
import icon_1 from '@/assets/images/icon/icon_57.svg';
import icon_2 from '@/assets/images/icon/icon_58.svg';
import icon_3 from '@/assets/images/icon/icon_59.svg';
import ContactForm from "../forms/contact-form";

const ContactArea = () => {
  return (
    <section className="contact-us-section pt-100 lg-pt-80">
      <div className="container">
        <div className="border-bottom pb-150 lg-pb-80">
          <div className="title-one text-center mb-70 lg-mb-40">
            <h2>Get in touch</h2>
          </div>
          <div className="row">
            <div className="col-xl-10 m-auto">
              <div className="row">
                <div className="col-md-4">
                  <div className="address-block-one text-center mb-40 wow fadeInUp">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <Image src={icon_1} alt="icon" />
                    </div>
                    <h5 className="title">Our Address</h5>
                    <p>
                      Bass Hill Plaza Medical Centre <br />
                      Sydney, Australia
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="address-block-one text-center mb-40 wow fadeInUp">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <Image src={icon_2} alt="icon" />
                    </div>
                    <h5 className="title">Contact Info</h5>
                    <p>
                      Open a chat or give us call at <br />
                      <a href="tel:310.841.5500" className="call">
                        310.841.5500
                      </a>
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="address-block-one text-center mb-40 wow fadeInUp">
                    <div className="icon rounded-circle d-flex align-items-center justify-content-center m-auto">
                      <Image src={icon_3} alt="icon" />
                    </div>
                    <h5 className="title">Live Support</h5>
                    <p>
                      live chat service <br />
                      <a href="#" className="webaddress">
                        www.jobilivechat.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-9 m-auto">
              <div className="form-style-one mt-85 lg-mt-50 wow fadeInUp">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
