"use client"
import React from 'react';
import { IJobType } from '@/types/job-data-type';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

interface jobDetails {
	job_id: number;
	job_title: string;
	companyHR_id: number;
	job_description: string;
	job_location: string;
	soft_skills_required: string;
	work_experience_required: string;
	education_required: string;
	job_type: string;
	skills_required: string;
	work_type: string;
	salary: number;
	job_status: string;
	date_posted: string;
  }

const JobDetailsV1Area = ({job}:{job:IJobType}) => {

	const searchParams = useSearchParams();
	const [jobData, setJobData] = useState<jobDetails>({
		job_id: 0,
		job_title: "",
		companyHR_id: 0,
		job_description: "",
		job_location: "",
		soft_skills_required: "",
		work_experience_required: "",
		education_required: "",
		job_type: "",
		skills_required: "",
		work_type: "",
		salary: 0,
		job_status: "",
		date_posted: ""
	});
	const [companyDetails, setCompanyDetails] = useState<any>({});
	const [profilePicture, setProfilePicture] = useState<string>("");
	const job_id = searchParams.get('job_id');
	console.log("job_id: ", job_id);

	useEffect(() => {

		const fetchCompanyDetails = async () => {
			try {
			  if(jobData.companyHR_id){
				const response = await axios.get(`http://localhost:5000/api/auth/getCompanyDetailsUsingId/${jobData.companyHR_id}`);
				// console.log("fetchCompanyDetails :: response: ", response.data.data.company);
				setCompanyDetails(response.data.data.company);
				console.log("companyDetails: ", companyDetails)
			  }
			} catch (error) {
			  console.log("fetchCompanyDetails :: error: ", error);
			}
		  }

		  const fetchProfilePicture = async () => {
			try {
			  const response = await axios.get(`http://localhost:5000/api/auth/getCompanyProfilePictureUsingId/${companyDetails.companyHR_id}`);
			  console.log("response: ", response.data.data.filePath);
			  if(response.status === 200){
				// construct full url based on relative path
				const fullUrl = `http://localhost:5000/${response.data.data.filePath}`
	  
				// set profile picture
				setProfilePicture(fullUrl);
			  }
			} catch (error) {
			  console.log("fetchProfilePicture :: error fetching profile picture ", error)
			}
		  }

		// get job details by job_id
		const getJobDetailsUsingId = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/auth/getJobDetailsUsingId/${job_id}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						}
					}
				)
				if(response.status === 200){
					console.log("response.data.data.job: ", response.data.data.job);
					setJobData(response.data.data.job);
				}
			} catch (error) {
				console.log("Error in getJobDetailsUsingId: ", error);
			}
		}
		getJobDetailsUsingId();
		fetchCompanyDetails();
		fetchProfilePicture();
	}, [])

  return (
    <section className="job-details pt-100 lg-pt-80 pb-130 lg-pb-80">
			<div className="container">
				<div className="row">
					<div className="col-xxl-9 col-xl-8">
						<div className="details-post-data me-xxl-5 pe-xxl-4">
							{/* <div className="post-date">{jobData.date_posted} by <a href="#" className="fw-500 text-dark">{job.company}</a></div> */}
							<div className="post-date">Posted on {jobData.date_posted} by <a href="#" className="fw-500 text-dark"> {companyDetails.company_name} </a></div>
							<h3 className="post-title">{jobData.job_title}</h3>
							<ul className="share-buttons d-flex flex-wrap style-none">
								<li><a href={companyDetails?.company_facebook} className="d-flex align-items-center justify-content-center">
									<i className="bi bi-facebook"></i>
									<span>Facebook</span>
								</a></li>
								<li><a href={companyDetails?.company_twitter} className="d-flex align-items-center justify-content-center">
									<i className="bi bi-twitter"></i>
									<span>Twitter</span>
								</a></li>
								<li><a href={companyDetails?.company_linkedin} className="d-flex align-items-center justify-content-center">
									<i className="bi bi-linkedin"></i>
									<span>Linkedin</span>
								</a></li>
								<li><a href={companyDetails?.company_instagram} className="d-flex align-items-center justify-content-center">
									<i className="bi bi-instagram"></i>
									<span>Instagram</span>
								</a></li>
							</ul>

							{/* <div className="post-block border-style mt-50 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">1</div>
									<h4 className="block-title">Overview</h4>
								</div>
								<p>{job.overview}</p>
							</div> */}
							<div className="post-block border-style mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">1</div>
									<h4 className="block-title">Job Description</h4>
								</div>
								{/* <p>As a <a href="#">Product Designer</a> at WillowTree, you’ll give form to ideas by being the voice and owner of product decisions. You’ll drive the design direction, and then make it happen!</p>
								<p>We understand our responsibility to create a diverse, equitable, and inclusive place within the tech industry, while pushing to make our industry more representative. </p> */}
								<p>{jobData.job_description}</p>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">2</div>
									<h4 className="block-title">Skills Required</h4>
								</div>
								<ul className="list-type-one style-none mb-15">
									{/* <li>Collaborate daily with a multidisciplinary team of Software Engineers, Researchers, Strategists, and Project Managers.</li>
									<li>Co-lead ideation sessions, workshops, demos, and presentations with clients on-site</li>
									<li>Push for and create inclusive, accessible design for all</li>
									<li>Maintain quality of the design process and ensure that when designs are translated into code they accurately reflect the design specifications.</li>
									<li>Sketch, wireframe, build IA, motion design, and run usability tests</li>
									<li>Design pixel perfect responsive UI’s and understand that adopting common interface pattern is better for UX than reinventing the wheel</li>
									<li>Ensure content strategy and design are perfectly in-sync</li>
									<li>Give and receive design critique to help constantly refine and push our work</li> */}
									{jobData.skills_required.split(',').map(skill => (
										<li key={skill.trim()}>{skill.trim()}</li>
									))}
								</ul>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">3</div>
									<h4 className="block-title">Soft Skills Required:</h4>
								</div>
								<ul className="list-type-two style-none mb-15">
									{/* <li>You’ve been designing digital products for 2+ years.</li>
									<li>A portfolio that exemplifies strong visual design and a focus on defining the user experience.</li>
									<li>You’ve proudly shipped and launched several products.</li>
									<li>You have some past experience working in an agile environment – Think two-week sprints.</li>
									<li>Experience effectively presenting and communicating your design decisions to clients and team members</li>
									<li>Up-to-date knowledge of design software like Figma, Sketch etc.</li> */}
									{jobData.soft_skills_required.split(',').map(skill => (
										<li key={skill.trim()}>{skill.trim()}</li>
									))}
								</ul>
							</div>
							<div className="post-block border-style mt-40 lg-mt-30">
								<div className="d-flex align-items-center">
									<div className="block-numb text-center fw-500 text-white rounded-circle me-2">4</div>
									<h4 className="block-title">Education Required:</h4>
								</div>
								<p>{jobData.education_required}</p>
								{/* <ul className="list-type-two style-none mb-15">
									<li>We are a remote-first company.</li>
									<li>100% company-paid health insurance premiums for you & your dependents</li>
									<li>Vacation stipend</li>
									<li>Unlimited paid vacation and paid company holidays</li>
									<li>Monthly wellness/gym stipend</li>
								</ul> */}
							</div>
						</div>
					</div>

					<div className="col-xxl-3 col-xl-4">
						<div className="job-company-info ms-xl-5 ms-xxl-0 lg-mt-50">
							{/* <Image src={job.logo} alt="logo" className="lazy-img m-auto logo" width={60} height={60}/> */}
							{profilePicture 
								? <img src={profilePicture} alt="Profile Picture" className="lazy-img m-auto logo" width={60} height={60} />
								: <Image src={job.logo} alt="logo" className="lazy-img m-auto logo" width={60} height={60}/>
							}
							<div className="text-md text-dark text-center mt-15 mb-20 text-capitalize">{companyDetails?.company_name}</div>
							<a href={companyDetails?.company_website} className="website-btn tran3s">Visit website</a>

							<div className="border-top mt-40 pt-40">
								<ul className="job-meta-data row style-none">
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Salary</span>
										<div>{jobData.salary}/month</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Experience required</span>
										<div>{jobData.work_experience_required} years</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Location</span>
										<div>{jobData.job_location}</div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Job Type</span>
										<div>{jobData.job_type}</div>
									</li>
									<li className="col-xl-7 col-md-4 col-sm-6">
										<span>Date</span>
										<div>{jobData.date_posted}  </div>
									</li>
									<li className="col-xl-5 col-md-4 col-sm-6">
										<span>Work Type</span>
										<div>{jobData.work_type}</div>
									</li>
								</ul>
								{/* <div className="job-tags d-flex flex-wrap pt-15">
									{job.tags && job.tags.map((t,i) => (
									<a key={i} href="#">{t}</a>
									))}
								</div> */}
								<a href="#" className="btn-one w-100 mt-25">Apply Now</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
  );
};

export default JobDetailsV1Area;