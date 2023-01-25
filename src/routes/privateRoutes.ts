import React from "react";
import ComposeInternalLayouts from "../components/HOC/ComposeInternalLayouts";

const Dashboard = React.lazy(() => import("../pages/user//DashboardMain"));
const Profile = React.lazy(() => import("../pages/user/ProfileMain"));
const EditProfile = React.lazy(() => import("../pages/user/ProfileEdit"));
const BoardDetail = React.lazy(() => import("../pages/user/BoardDetail"));

// const import DashboardMain from "./pages/user/DashboardMain";
// import Profile from "./pages/user/Profile";
// import User from "./pages/user/User";
// import ProfileEdit from "./pages/user/ProfileEdit";
// import ProfileMain from "./pages/user/ProfileMain";
// import ProtectRoute from "./components/ProtectRoute";
// import PageNotFound from "./components/PageNotFound";
// import BoardDetail from "./components/BoardDetail";

const privateRoutes = [
  {
    path: "dashboard",
    component: ComposeInternalLayouts(Dashboard),
  },

  {
    path: "profile",
    component: ComposeInternalLayouts(Profile),
  },

  {
    path: "edit",
    component: ComposeInternalLayouts(EditProfile),
  },

  {
    path: "board/:boardId",
    component: ComposeInternalLayouts(BoardDetail),
  },
];

export default privateRoutes;
