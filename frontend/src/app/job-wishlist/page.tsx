import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import Header from "@/layouts/headers/header";
import FooterOne from "@/layouts/footers/footer-one";
import JobPortalIntro from "../components/job-portal-intro/job-portal-intro";
import CommonBreadcrumb from "../components/common/common-breadcrumb";
import WishlistArea from "../components/wishlist/wishlist-area";

export const metadata: Metadata = {
  title: "Job Wishlist",
};

const JobWishlistPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <Header />
        {/* header end */}

        {/* search breadcrumb start */}
        <CommonBreadcrumb
          title="Wishlist"
          subtitle="Find your desire company and get your dream job"
        />
        {/* search breadcrumb end */}

        {/* wishlist area start */}
        <WishlistArea />
        {/* wishlist area end */}

        {/* job portal intro start */}
        <JobPortalIntro top_border={true} />
        {/* job portal intro end */}

        {/* footer start */}
        <FooterOne />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default JobWishlistPage;
