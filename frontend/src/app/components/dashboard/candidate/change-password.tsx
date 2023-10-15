import React from "react";


const ChangePasswordArea = () => {
  return (
    <div className="mt-45">
      <div className="position-relative">

        <h2 className="main-title">Change Password</h2>

        <div className="bg-white card-box border-20">
          <form action="#">
            <div className="row">
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Old Password*</label>
                  <input type="password" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">New Password*</label>
                  <input type="password" />
                </div>
              </div>
              <div className="col-12">
                <div className="dash-input-wrapper mb-20">
                  <label htmlFor="">Confirm Password*</label>
                  <input type="password" />
                </div>
              </div>
            </div>

            <div className="button-group d-inline-flex align-items-center">
              <a href="#" className="dash-btn-two tran3s rounded-3">
                Save & Updated
              </a>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default ChangePasswordArea;
