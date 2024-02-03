import React from 'react';
import Link from 'next/link';
import AccordionItem from '../accordion/accordion-item';

const FaqArea = () => {
  return (
    <section className="faq-section position-relative pt-100 lg-pt-80">
      <div className="container">
        <ul className="nav nav-tabs border-0 justify-content-center" role="tablist">
          <li className="nav-item" role="presentation">
            <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#fc1" role="tab">All</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc2" role="tab">Marketing</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc3" role="tab">Buying</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc4" role="tab">User Manual</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc5" role="tab">Payments</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc6" role="tab"> Terms & Conditions</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className="nav-link" data-bs-toggle="tab" data-bs-target="#fc7" role="tab">Account</button>
          </li>
        </ul>
        <div className="bg-wrapper mt-60 lg-mt-40">
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" role="tabpanel" id="fc1">
              <div className="accordion accordion-style-two" id="accordionTwo">
                <AccordionItem id='one' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionTwo' />
                <AccordionItem isShow={true} id='two' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionTwo' />
                <AccordionItem id='three' title='What do you look for in a founding team?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionTwo' />
                <AccordionItem id='four' title='Do you recommend Pay as you go or Pre pay?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionTwo' />
                <AccordionItem id='five' title='What do I get for $0 with my plan?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionTwo' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc2">
              <div className="accordion accordion-style-two" id="accordionThree">
                <AccordionItem id='six' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionThree' />
                <AccordionItem id='seven' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionThree' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc3">
              <div className="accordion accordion-style-two" id="accordionFour">
                <AccordionItem id='eight' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFour' />
                <AccordionItem id='nine' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFour' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc4">
              <div className="accordion accordion-style-two" id="accordionFive">
                <AccordionItem id='ten' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFive' />
                <AccordionItem id='eleven' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionFive' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc5">
              <div className="accordion accordion-style-two" id="accordionSix">
                <AccordionItem id='twelve' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSix' />
                <AccordionItem id='thirteen' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSix' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc6">
              <div className="accordion accordion-style-two" id="accordionSeven">
                <AccordionItem id='fourteen' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSeven' />
                <AccordionItem id='fifteen' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionSeven' />
              </div>
            </div>

            <div className="tab-pane fade" role="tabpanel" id="fc7">
              <div className="accordion accordion-style-two" id="accordionEight">
                <AccordionItem id='sixteen' title='How does the free trial work?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionEight' />
                <AccordionItem id='seventeen' title='How do you find different criteria in your process?' desc='Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' parent='accordionEight' />
              </div>
            </div>

          </div>
        </div>

        <div className="text-center border-bottom pb-150 lg-pb-50 mt-60 lg-mt-40 wow fadeInUp">
          <div className="title-three mb-30">
            <h2 className="fw-normal">Don’t get your answer?</h2>
          </div>
          <Link href='/contact' className="btn-one">Contact Us</Link>
        </div>
      </div>
    </section>
  );
};

export default FaqArea;