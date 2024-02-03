import React from 'react';
import Image from 'next/image';
import DashboardHeader from './dashboard-header';
import EmailReadPanel from './email-read-panel';
import EmailFooter from './email-footer';
import icon_1 from '@/assets/dashboard/images/icon/icon_32.svg';
import icon_2 from '@/assets/dashboard/images/icon/icon_33.svg';
import icon_3 from '@/assets/dashboard/images/icon/icon_34.svg';
import icon_4 from '@/assets/dashboard/images/icon/icon_35.svg';
import icon_5 from '@/assets/dashboard/images/icon/icon_26.svg';
import icon_6 from '@/assets/dashboard/images/icon/icon_27.svg';
import icon_7 from '@/assets/dashboard/images/icon/icon_10.svg';
import icon_8 from '@/assets/dashboard/images/icon/icon_29.svg';
import icon_9 from '@/assets/dashboard/images/icon/icon_30.svg';
import logo from '@/assets/dashboard/images/logo_02.png';

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const DashboardMessage = ({setIsOpenSidebar}:IProps) => {
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="row gx-0 align-items-center">
          <div className="offcanvas compose-mail-offcanvas" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="compose-new-email-container">
              <div className="new-email-header position-relative">
                <div className="btn-group">
                  <a data-bs-toggle="collapse" href="#CC-input" role="button" aria-expanded="false" aria-controls="collapseExample">Cc</a>
                  <a data-bs-toggle="collapse" href="#BCC-input" role="button" aria-expanded="false" aria-controls="collapseExample">Bcc</a>
                </div>
                <div className="input-group d-flex align-items-center">
                  <div className="text-center" style={{ width: '60px' }}>To</div>
                  <input type="email" className="flex-fill" placeholder="payoneer@inquiry.com" />
                </div>
                <div className="collapse" id="CC-input">
                  <div className="input-group d-flex align-items-center">
                    <div className="text-center" style={{ width: '60px' }}>Cc</div>
                    <input type="email" className="flex-fill" placeholder="payoneer@inquiry.com" />
                  </div>
                </div>
                <div className="collapse" id="BCC-input">
                  <div className="input-group d-flex align-items-center">
                    <div className="text-center" style={{ width: '60px' }}>Bcc</div>
                    <input type="email" className="flex-fill" placeholder="payoneer@inquiry.com" />
                  </div>
                </div>
              </div>
              <div className="compose-body">
              <textarea defaultValue={"Hi, Mary Cooper! \n \n Thanks for your invitation for the account manager position for you company. I Will back to you soon with all the require documents."}/>
              </div>

              <div className="compose-email-footer d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="insert-file position-relative me-3">
                    <Image src={icon_1} alt="icon" className="lazy-img" />
                    <input type="file" name="uploadImg" placeholder="" title="Insert File" />
                  </div>
                  <button className="insert-emoji me-3">
                    <Image src={icon_2} alt="icon" className="lazy-img" />
                  </button>
                  <div className="insert-file position-relative me-3">
                    <Image src={icon_3} alt="icon" className="lazy-img" />
                    <input type="file" name="uploadImg" placeholder="" title="Insert Image" />
                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <a href="#" className="delete-mail me-3">
                    <Image src={icon_4} alt="icon" className="lazy-img" />
                  </a>
                  <a href="#" className="reply-btn tran3s">Reply</a>
                </div>
              </div>
            </div>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="col-lg-4">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="main-title m0">Messages</h2>
              <a className="new-message-compose rounded-circle" data-bs-toggle="offcanvas" href="#offcanvasScrolling" role="button" aria-controls="offcanvasScrolling">+</a>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="message-pagination ps-lg-4 ps-xxl-5 d-flex align-items-center justify-content-between md-mt-40">
              <a href="#" className="prev-msg">
                <Image src={icon_5} alt="icon" className="lazy-img" />
              </a>
              <div className="d-flex align-items-center">
                <a href="#"><i className="bi bi-chevron-left"></i></a>
                <span>1-5 of 120</span>
                <a href="#"><i className="bi bi-chevron-right"></i></a>
              </div>
              <a href="#" className="next-msg">
                <Image src={icon_6} alt="icon" className="lazy-img" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white card-box border-20 p0 mt-30">
          <div className="message-wrapper">
            <div className="row gx-0">
              <div className="col-lg-4">
                <div className="message-sidebar pt-20">
                  <div className="ps-3 pe-3 ps-xxl-4 pe-xxl-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="page-title fw-500">Inbox</div>
                      <div className="action-dots float-end">
                        <button className="action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <span></span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li><a className="dropdown-item" href="#">Sent</a></li>
                          <li><a className="dropdown-item" href="#">Important</a></li>
                          <li><a className="dropdown-item" href="#">Draft</a></li>
                          <li><a className="dropdown-item" href="#">Trash</a></li>
                        </ul>
                      </div>
                    </div>
                    <form action="#" className="search-form mt-20 mb-20">
                      <input type="text" placeholder="Search contacts" />
                      <button>
                        <Image src={icon_7} alt="icon" className="lazy-img m-auto" />
                      </button>
                    </form>

                    <div className="message_filter d-flex align-items-center justify-content-between mb-20" id="module_btns">
                      <button className="filter_btn active">All</button>
                      <button className="filter_btn"><span style={{ background: '#FF4545' }}></span> Read</button>
                      <button className="filter_btn"><span style={{ background: '#3BDA84' }}></span> Unread</button>
                      <button className="filter_btn"><span style={{ background: '#50C0FF' }}></span> Primary</button>
                    </div>
                  </div>
                  {/* EmailReadPanel */}
                  <EmailReadPanel />
                  {/* EmailReadPanel */}
                </div>
              </div>
              <div className="col-lg-8">
                <div className="open-email-container pb-40">
                  <div className="email-header divider d-flex justify-content-between ps-4 pe-4 ps-xxl-5 pe-xxl-5">
                    <div className="sender-info d-flex align-items-center">
                      <Image src={logo} alt="logo" priority className="lazy-img logo" />
                      <div className="ps-3">
                        <div className="sender-name">Payoneer</div>
                        <div className="sender-email">payoneer@inquiry.com</div>
                      </div>
                    </div>
                    <div className="email-info">
                      <div className="time">4:45AM (3 hours ago)</div>
                      <div className="d-flex align-items-center justify-content-end">
                        <button className="delete-email"><Image src={icon_8} alt="icon" className="lazy-img" /></button>
                        <button className="reply-email ms-3 me-3"><Image src={icon_9} alt="icon" className="lazy-img" /></button>
                        <div className="action-dots float-end">
                          <button className="action-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span></span>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li><a className="dropdown-item" href="#">Reply</a></li>
                            <li><a className="dropdown-item" href="#">Fowrward</a></li>
                            <li><a className="dropdown-item" href="#">Block</a></li>
                            <li><a className="dropdown-item" href="#">Delete</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="email-body divider">
                    <div className="ps-4 pe-4 ps-xxl-5 pe-xxl-5">
                      <h2>Account Manager.</h2>
                      <p>Hello, Greeting from Uber. Hope you doing great. I am approaching to you for as our company need a great & talented account manager. </p>
                      <p>What we need from you to start:</p>
                      <ul className="style-none mb-30">
                        <li>- Your CV</li>
                        <li>- Verified Gov ID</li>
                      </ul>
                      <p>After that we need to redesign our landing page because the current one does not carry any information. If you have any question don’t hesitate to contact us.</p>
                      <p>Our Telegram <a href="#" className="fw-500">@payoneer</a> <br />Thank you!</p>
                    </div>
                  </div>

                  {/* EmailFooter */}
                  <EmailFooter />
                  {/* EmailFooter */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMessage;