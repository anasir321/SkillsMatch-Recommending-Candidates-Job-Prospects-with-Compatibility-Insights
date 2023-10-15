import { IMenuData } from "@/types/menu-data-type";

const menu_data:IMenuData[] = [
  {
    id:1,
    link:'/',
    title:'Home',
    sub_menus:[
      {link:'/',title:'Home 1'},
      {link:'/home-2',title:'Home 2'},
      {link:'/home-3',title:'Home 3'},
      {link:'/home-4',title:'Home 4'},
      {link:'/home-5',title:'Home 5'},
      {link:'/home-6',title:'Home 6'},
      {link:'/home-7',title:'Home 7'},
    ]
  },
  {
    id:2,
    link:'/job-list-v1',
    title:'Job',
    sub_menus:[
      {link:'/job-list-v1',title:'Job List style -1'},
      {link:'/job-list-v2',title:'Job List style -2'},
      {link:'/job-list-v3',title:'Job List style -3'},
      {link:'/job-grid-v1',title:'Job Grid style -1'},
      {link:'/job-grid-v2',title:'Job Grid style -2'},
      {link:'/job-grid-v3',title:'Job Grid style -3'},
      {link:'/job-details-v1',title:'Job Details v-1'},
      {link:'/job-details-v2',title:'Job Details v-2'},
      {link:'/job-wishlist',title:'Job Wishlist'},
    ]
  },
  {
    id:3,
    link:'/candidates-v1',
    title:'Explore',
    mega_menus:[
      {
        id:1,
        title:'Candidates',
        sub_menus:[
          {title:'Candidates V-1',link:'/candidates-v1'},
          {title:'Candidates V-2',link:'/candidates-v2'},
          {title:'Candidates V-3',link:'/candidates-v3'},
          {title:'Candidates V-4',link:'/candidates-v4'},
          {title:'Candidates Details v-1',link:'/candidate-profile-v1'},
          {title:'Candidates Details v-2',link:'/candidate-profile-v2'},
        ]
      },
      {
        id:2,
        title:'Company',
        sub_menus:[
          {title:'Company V-1',link:'/company-v1'},
          {title:'Company V-2',link:'/company-v2'},
          {title:'Company V-3',link:'/company-v3'},
          {title:'Company V-4',link:'/company-v4'},
          {title:'Company Details',link:'/company-details'},
        ]
      },
      {
        id:3,
        title:'Essential',
        sub_menus:[
          {title:'About Us',link:'/about-us'},
          {title:'Pricing',link:'/pricing'},
          {title:'FAQ',link:'/faq'},
          {title:'Register',link:'/register'},
        ]
      },
    ]
  },
  {
    id:4,
    link:'/blog-v1',
    title:'Blog',
    sub_menus:[
      {link:'/blog-v1',title:'Blog Standard'},
      {link:'/blog-v2',title:'Blog Grid'},
      {link:'/blog-v3',title:'Full width'},
      {link:'/blog-details',title:'Blog Details'},
    ]
  },
  {
    id:5,
    link:'/contact',
    title:'Contact'
  },
  {
    id:6,
    link:'/dashboard/employer-dashboard',
    title:'Dashboard',
    sub_menus:[
      {link:'/dashboard/candidate-dashboard',title:'Candidate Dashboard'},
      {link:'/dashboard/employ-dashboard',title:'Employer Dashboard'},
    ]
  }
]

export default menu_data;