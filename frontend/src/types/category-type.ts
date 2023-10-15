import { StaticImageData } from "next/image";

export interface category_dropdown {
  id: number;
  category_items: {
      id: number;
      icon: StaticImageData;
      title: string;
      count: string;
      bg_clr?: string;
  }[];
}[]

// category two 
export interface ICategoryTwo {
  id: number;
  icon: StaticImageData;
  title: React.JSX.Element;
  vacancy?: number;
  sub_title?: string;
  bg?: string;
  bg_img?: StaticImageData;
  df?: boolean;
}