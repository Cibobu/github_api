import { FC, ReactNode } from "react";
import CreatePage from "../components/pages/CreatePage";
import DashboardPage from "../components/pages/DashboardPage";
import DetailPage from "../components/pages/DetailPage";
import ListPage from "../components/pages/ListPage";

export enum Roles {
  ADMIN = "ADMIN",
  CUSTOMER_SERVICE = "CUSTOMER_SERVICE",
  MARKETING = "MARKETING"
  // sesuaikan dgn bisnis
}

export interface DashboardRoute {
  url: string;
  parentUrl?: string;
  title?: string;
  icon?: ReactNode;
  isSidebarRendered: boolean;
  component: ReactNode;
  childrens?: Array<DashboardRoute>;
  roles: Array<Roles | string>
}

const dashboardRoutes: Array<DashboardRoute> = [
  {
    url: "/home",
    title: "Dashboard Menu",
    isSidebarRendered: true,
    component: <DashboardPage />,
    roles: [Roles.ADMIN]
  },
  {
    url: "/master-data",
    title: "Master Data",
    isSidebarRendered: true,
    component: <ListPage />,
    childrens: [
      {
        url: "/master-data/list",
        title: "List",
        isSidebarRendered: true,
        component: <ListPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING]
      },
      {
        url: "/master-data/create",
        title: "Create Page",
        isSidebarRendered: false,
        component: <CreatePage />,
        roles: [Roles.ADMIN]
      },
      {
        url: "/master-data/:id/detail",
        title: "Detail Page",
        isSidebarRendered: false,
        component: <DetailPage />,
        roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING]
      },
      {
        url: "/master-data/:id/edit",
        title: "Edit Page",
        isSidebarRendered: false,
        component: <CreatePage />,
        roles: [Roles.ADMIN]
      },
    ],
    roles: [Roles.ADMIN, Roles.CUSTOMER_SERVICE, Roles.MARKETING]
  },
]

export default dashboardRoutes