import React from 'react';
import Image from 'next/image';
import icon_1 from '@/assets/dashboard/images/icon/icon_32.svg';
import icon_2 from '@/assets/dashboard/images/icon/icon_33.svg';
import icon_3 from '@/assets/dashboard/images/icon/icon_34.svg';
import icon_4 from '@/assets/dashboard/images/icon/icon_35.svg';
import icon_5 from '@/assets/dashboard/images/icon/icon_31.svg';

const EmailFooter = () => {
  return (
    <div className="email-footer">
      <div className="ps-4 pe-4 ps-xxl-5 pe-xxl-5">
        <div className="attachments mb-30">
          <div className="d-flex justify-content-between mb-5">
            <h6 className="m0">2 Attachment</h6>
            <a href="#" className="all-download">Download All</a>
          </div>
          <div className="d-flex">
            <a href="#" className="file tran3s d-flex align-items-center mt-10" download>
              <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                <Image src={icon_5} alt="icon" className="lazy-img" />
              </div>
              <div className="ps-2">
                <div className="file-name">project-details.pdf</div>
                <div className="file-size">2.3mb</div>
              </div>
            </a>
            <a href="#" className="file tran3s d-flex align-items-center mt-10" download>
              <div className="icon rounded-circle d-flex align-items-center justify-content-center">
                <Image src={icon_5} alt="icon" className="lazy-img" /></div>
              <div className="ps-2">
                <div className="file-name">form.pdf</div>
                <div className="file-size">1.3mb</div>
              </div>
            </a>
          </div>
        </div>

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
            <textarea defaultValue={"Hi, Mary Cooper! \n Thanks for your invitation for the account manager position for you company. I Will back to you soon with all the require documents."}/>
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
              <a href="#" className="delete-mail me-3"><Image src={icon_4} alt="icon" className="lazy-img" /></a>
              <a href="#" className="reply-btn tran3s">Reply</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailFooter;