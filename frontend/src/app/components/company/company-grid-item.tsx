// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { ICompany } from "@/types/company-type";

// const CompanyGridItem = ({ item }: { item: ICompany }) => {
//   return (
//     <div
//       className={`company-grid-layout ${item.isFav ? "favourite" : ""} mb-30`}
//     >
//       <Link href="/company-details"
//         className="company-logo me-auto ms-auto rounded-circle"
//       >
//         <Image src={item.img} alt="image" className="lazy-img rounded-circle" />
//       </Link>
//       <h5 className="text-center">
//         <Link href="/company-details" className="company-name tran3s">
//           {item.name}
//         </Link>
//       </h5>
//       <p className="text-center mb-auto">{item.location}</p>
//       <div className="bottom-line d-flex">
//         <Link href="/company-details">{item.vacancy} Vacancy</Link>
//         <Link href="/company-details">
//           <i className="bi bi-bookmark-dash"></i> Save
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CompanyGridItem;

import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";

interface CompanyModel {
  company_id: number;
  company_name: string;
  companyHR_id: number;
  company_location: string;
  company_email: string;
  company_website: string | null;
  company_linkedin: string | null;
  company_description: string | null;
  company_logo: string | null;
}

const CompanyGridItem = ({ item, style_2=false }: { item: CompanyModel; style_2?:boolean}) => {

  console.log("CompanyHR_id: ", item.companyHR_id);
  const [profilePicture, setProfilePicture] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/getCompanyProfilePictureUsingId/${item.companyHR_id}`);
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
    fetchProfilePicture();
  }, [item.companyHR_id])

  return (
    <div
      className={`company-grid-layout ${true ? "favourite" : ""} mb-30`}
    >
      <Link 
        href={`/company-details?id=${item.companyHR_id}`}
        className="company-logo me-auto ms-auto rounded-circle">

        {profilePicture && (
          <img src={profilePicture} alt="Profile Picture" className="lazy-img rounded-circle" />
        )}
        
      </Link>
      <h5 className="text-center">
        <Link href={`/company-details?id=${item.companyHR_id}`} className="company-name tran3s">
          {item.company_name}
        </Link>
      </h5>
      <p className="text-center mb-auto">{item.company_location}</p>
      <div className="bottom-line d-flex">
      {/* displaying company id for now but later will have to add actual number of jobs (vacancy) */}
        <Link href={`/company-details?id=${item.companyHR_id}`}>{item.companyHR_id} Vacancy</Link> 
        <Link href={`/company-details?id=${item.companyHR_id}`}>
          <i className="bi bi-bookmark-dash"></i> Save
        </Link>
      </div>
    </div>
  );
};

export default CompanyGridItem;
