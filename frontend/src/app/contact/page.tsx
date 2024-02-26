import React from "react";
import { Metadata } from "next";
import Header from "@/layouts/headers/header";
import Wrapper from "@/layouts/wrapper";
import FooterOne from "@/layouts/footers/footer-one";
import MapArea from "../components/contact/map-area";
import ContactArea from "../components/contact/contact-area";

export const metadata: Metadata = {
  title: "Contact",
};

const ContactPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/*MapArea start */}
        <MapArea />
        {/*MapArea end */}

        {/* contact area start */}
        <ContactArea />
        {/* contact area end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default ContactPage;
