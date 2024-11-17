import SideBar from "@/components/SidebarPlugin";
import Notify from "@/components/NotificationPlugin";
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import RTLPlugin from "./RTLPlugin";

//css assets
import "@/assets/sass/black-dashboard.scss";
import "@/assets/css/nucleo-icons.css";
import "@/assets/demo/demo.css";

export default {
  install(app) {
    app.use(GlobalComponents);
    app.use(GlobalDirectives);
    app.use(SideBar);
    app.use(Notify);
    app.use(RTLPlugin);
  },
};

