import React from "react";
import Link from "next/link";
import AccordionItem from "../accordion/accordion-item";

// faq data
const faq_data: {
  id: string;
  title: string;
  desc: string;
  isShow?: boolean;
  parent: string;
}[] = [
    {
      id: "One",
      title: "How does the free trial work?",
      desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      isShow: true,
      parent: "accordionTwo",
    },
    {
      id: "Two",
      title: "How do you find different criteria in your process?",
      desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      parent: "accordionTwo",
    },
    {
      id: "Three",
      title: "What do you look for in a founding team?",
      desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      parent: "accordionTwo",
    },
    {
      id: "Four",
      title: "Do you recommend Pay as you go or Pre pay?",
      desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      parent: "accordionTwo",
    },
    {
      id: "Five",
      title: "What do I get for $0 with my plan?",
      desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      parent: "accordionTwo",
    },
  ];

export function FaqItems() {
  return (
    <div className="accordion accordion-style-two" id="accordionTwo">
      {faq_data.map((f) => (
        <AccordionItem
          key={f.id}
          id={f.id}
          isShow={f.isShow}
          title={f.title}
          desc={f.desc}
          parent={f.parent}
        />
      ))}
    </div>
  )
}
const FaqOne = () => {
  return (
    <>
      <section className="faq-section position-relative mt-180 xl-mt-150 lg-mt-100 mb-150 lg-mb-100">
        <div className="container">
          <div className="title-one text-center">
            <h2 className="text-dark wow fadeInUp" data-wow-delay="0.3s">Questions & Answers</h2>
          </div>
          <div className="bg-wrapper mt-60 lg-mt-40">
            <FaqItems/>
          </div>
          <div className="text-center mt-50 sm-mt-40 wow fadeInUp">
            <div className="btn-eight style-two fw-500">
              Don’t find the answer? We can help.{" "}
              <Link href="/faq">Click here</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqOne;
