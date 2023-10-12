import img_1 from '@/assets/images/logo/media_29.png';
import img_2 from '@/assets/images/logo/media_30.png';
import img_3 from '@/assets/images/logo/media_31.png';
import img_4 from '@/assets/images/logo/media_38.png';
import img_5 from '@/assets/images/logo/media_39.png';
import img_6 from '@/assets/images/logo/media_40.png';
import img_7 from '@/assets/images/logo/media_41.png';
import img_8 from '@/assets/images/logo/media_32.png';
import img_9 from '@/assets/images/logo/media_42.png';
import { ICompany } from './../types/company-type';

const company_data:ICompany[] = [
  {
    id:1,
    img:img_1,
    name:'Payoneer',
    location:'New York',
    vacancy:3,
    isFav:true
  },
  {
    id:2,
    img:img_2,
    name:'Medium',
    location:'Washington',
    vacancy:5
  },
  {
    id:3,
    img:img_3,
    name:'Linkedin',
    location:'California, CA',
    vacancy:7
  },
  {
    id:4,
    img:img_4,
    name:'Radiant',
    location:'Spain, Bercelona',
    vacancy:4,
    isFav:true,
  },
  {
    id:5,
    img:img_5,
    name:'Panoroma',
    location:'USA,Alaska',
    vacancy:15,
    isFav:true,
  },
  {
    id:6,
    img:img_6,
    name:'Colorrib',
    location:'New York',
    vacancy:6
  },
  {
    id:7,
    img:img_7,
    name:'Alpha',
    location:'UK,London',
    vacancy:3
  },
  {
    id:8,
    img:img_8,
    name:'Apex',
    location:'Mountain View',
    vacancy:10
  },
  {
    id:9,
    img:img_9,
    name:'Bootstrap',
    location:'Germany, Berlin',
    vacancy:5,
    isFav:true
  },
  {
    id:10,
    img:img_6,
    name:'Dribbble',
    location:'New York',
    vacancy:2
  },
  {
    id:11,
    img:img_2,
    name:'KFC',
    location:'Washington',
    vacancy:9
  },
  {
    id:12,
    img:img_8,
    name:'MacDonald’s',
    location:'Mountain View',
    vacancy:6
  }
]

export default company_data;