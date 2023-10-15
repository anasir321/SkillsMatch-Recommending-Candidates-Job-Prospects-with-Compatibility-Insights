import { StaticImageData } from "next/image";

export interface IBlogDataType {
  id: number;
  img: StaticImageData;
  grid_img?: StaticImageData;
  img_full?: StaticImageData;
  tags: string[];
  title: string;
  author: string;
  date:string;
  featured?:boolean;
  desc:string;
  blog:string;
}
