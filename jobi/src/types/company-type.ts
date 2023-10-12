import { StaticImageData } from 'next/image';

export interface ICompany {
  id:number;
  img:StaticImageData;
  name:string;
  location:string;
  vacancy:number;
  isFav?:boolean;
}