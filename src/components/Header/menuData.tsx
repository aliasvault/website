import { Menu } from "@/types/menu";

const getMenuData = (t: (key: string) => string): Menu[] => [
  {
    id: 1,
    title: t('navigation.features'),
    path: "/features",
    newTab: false,
  },
  {
    id: 2,
    title: t('navigation.pricing'),
    path: "/pricing",
    newTab: false,
  },
  {
    id: 3,
    title: t('navigation.platforms'),
    path: "/platforms",
    newTab: false,
  },
  {
    id: 4,
    title: t('navigation.blog'),
    path: "/blog",
    newTab: false,
  },
  {
    id: 5,
    title: t('navigation.contact'),
    path: "/contact",
    newTab: false,
  },
];

export default getMenuData;
