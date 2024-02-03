import React from 'react';
import DashboardHeader from './dashboard-header';
import JobAlertItem from './job-alert-item';
import ShortSelect from '../../common/short-select';

// props type 
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}
const JobAlertArea = ({setIsOpenSidebar}:IProps) => {
  return (
    <div className="dashboard-body">
      <div className="position-relative">
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <div className="d-flex align-items-center justify-content-between mb-40 lg-mb-30">
          <h2 className="main-title m0">Job Alerts</h2>
          <div className="short-filter d-flex align-items-center">
            <div className="text-dark fw-500 me-2">Short by:</div>
            <ShortSelect/>
          </div>
        </div>

        <div className="bg-white card-box border-20">
          <div className="table-responsive">
            <table className="table job-alert-table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Alert </th>
                  <th scope="col">Job</th>
                  <th scope="col">Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="border-0">
                <JobAlertItem title='Product Designer' location='Yearly Salary . Germany' duration='Fulltime' category='Design, Product' found='2' time='Weekly' />

                <JobAlertItem title='Marketing' location='Weekly Salary . United kingdom' duration='Part-Time' category='Account, Marketing' found='13' time='Monthly' />

                <JobAlertItem title='Hotel Manager' location='Yearly Salary . Germany' duration='Fulltime' category='Design, Product' found='7' time='Daily' />

                <JobAlertItem title='Developer' location='Monthly Salary . United States' duration='Fulltime' category='Account, Finance' found='3' time='Weekly' />

                <JobAlertItem title='Account Manager' location='Hourly Salary . Spain' duration='Part-Time' category='Account, Finance' found='9' time='Monthly' />

              </tbody>
            </table>
          </div>
        </div>


        <div className="dash-pagination d-flex justify-content-end mt-30">
          <ul className="style-none d-flex align-items-center">
            <li><a href="#" className="active">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li>..</li>
            <li><a href="#">7</a></li>
            <li><a href="#"><i className="bi bi-chevron-right"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JobAlertArea;