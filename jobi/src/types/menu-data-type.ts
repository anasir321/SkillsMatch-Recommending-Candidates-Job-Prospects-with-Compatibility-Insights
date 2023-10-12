export interface IMenuData {
  id: number;
  link: string;
  title: string;
  sub_menus?: {
      link: string;
      title: string;
  }[];
  mega_menus?: {
    id: number;
    title: string;
    sub_menus: {
        title: string;
        link: string;
    }[];
}[]
}