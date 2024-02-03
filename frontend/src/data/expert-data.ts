import { StaticImageData } from 'next/image';
import img_1 from '@/assets/images/assets/img_31.jpg';
import img_2 from '@/assets/images/assets/img_32.jpg';
import img_3 from '@/assets/images/assets/img_33.jpg';

// expert data type 
type IExpertType = {
  id: number;
  img: StaticImageData;
  name: string;
  designation: string;
}

const expert_data:IExpertType[] = [
  {
    id:1,
    img:img_1,
    name:'Diane Odom',
    designation:'UI Designer'
  },
  {
    id:2,
    img:img_2,
    name:'Julie Weaver',
    designation:'Finance'
  },
  {
    id:3,
    img:img_3,
    name:'Chris Dionne',
    designation:'Developer'
  },
  {
    id:4,
    img:img_2,
    name:'Rita Leitner',
    designation:'Marketing Expert'
  },
  {
    id:5,
    img:img_1,
    name:'Thelma Franklin',
    designation:'UI/UX Designer'
  },
]

export default expert_data;