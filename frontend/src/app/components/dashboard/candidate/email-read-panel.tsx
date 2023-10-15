import React from "react";
import Image from "next/image";
import icon from '@/assets/dashboard/images/icon/icon_28.svg';

const EmailReadPanel = () => {
  return (
    <div className="email-read-panel">
      <div className="email-list-item ps-3 pe-3 ps-xxl-4 pe-xxl-4 read">
        <div className="email-short-preview position-relative">
          <div className="d-flex align-items-center justify-content-between">
            <div className="sender-name">Jenny Rio.</div>
            <div className="date">Aug 22</div>
          </div>
          <div className="mail-sub">Work inquiry from google.</div>
          <div className="mail-text">
            Hello, This is Jenny from google. We’r the largest online platform
            offer...
          </div>
          <div className="attached-file-preview d-flex align-items-center mt-15">
            <div className="file d-flex align-items-center me-2">
              <Image
                src={icon}
                alt="icon"
                className="lazy-img me-2"
              />
              <span>details.pdf</span>
            </div>
          </div>
        </div>
      </div>

      <div className="email-list-item ps-3 pe-3 ps-xxl-4 pe-xxl-4 primary selected">
        <div className="email-short-preview position-relative">
          <div className="d-flex align-items-center justify-content-between">
            <div className="sender-name">Hasan Islam.</div>
            <div className="date">May 22</div>
          </div>
          <div className="mail-sub">Account Manager</div>
          <div className="mail-text">
            Hello, Greeting from Uber. Hope you doing great. I am approcing to
            you for..
          </div>
          <div className="attached-file-preview d-flex align-items-center mt-15">
            <div className="file d-flex align-items-center me-2">
              <Image
                src={icon}
                alt="icon"
                className="lazy-img me-2"
              />
              <span>details.pdf</span>
            </div>
            <div className="file d-flex align-items-center me-2">
              <Image
                src={icon}
                alt="icon"
                className="lazy-img me-2"
              />
              <span>form.pdf</span>
            </div>
          </div>
        </div>
      </div>

      <div className="email-list-item ps-3 pe-3 ps-xxl-4 pe-xxl-4">
        <div className="email-short-preview position-relative">
          <div className="d-flex align-items-center justify-content-between">
            <div className="sender-name">Jannatul Ferdaus.</div>
            <div className="date">Jun 22</div>
          </div>
          <div className="mail-sub">Product Designer Opportunities</div>
          <div className="mail-text">
            Hello, This is Jannat from HuntX. We offer business solution to our
            client..
          </div>
        </div>
      </div>

      <div className="email-list-item ps-3 pe-3 ps-xxl-4 pe-xxl-4 read">
        <div className="email-short-preview position-relative">
          <div className="d-flex align-items-center justify-content-between">
            <div className="sender-name">Jakie Chan</div>
            <div className="date">NOV 22</div>
          </div>
          <div className="mail-sub">Hunting Marketing Specialist</div>
          <div className="mail-text">
            Hello, We’r the well known Real Estate Inc provide best
            interior/exterior solut...
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailReadPanel;
