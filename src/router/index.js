import { createRouter, createWebHashHistory } from "vue-router";
import PageNotFound from "../Layout/Error/404Error.vue";
import ServerError from "../Layout/Error/500Error.vue";
import InternetError from "../Layout/Error/NoInternet.vue";
import LinkCompany from "../views/Auth/LinkCompany.vue";
import Authentication from "../Layout/Authentication.vue";
import Register from "../views/Auth/Register.vue";
import Career from "../views/Auth/Career.vue";
import Company from "../views/Auth/Company.vue";
import CompanyStep1 from "../views/Auth/Components/CompanyStep1.vue";
import CompanyStep2 from "../views/Auth/Components/CompanyStep2.vue";
import Signin from "../views/Auth/Signin.vue";
import Password from "../views/Auth/Password.vue";
import UpdatePassword from "../views/Auth/UpdatePassword.vue";
import ResetPassword from "../views/Auth/ResetPassword.vue";
import VerifyAccount from "../views/Auth/VerifyAccount.vue";
import Dashboard from "../Layout/MainLayout.vue";
import CompanyLayout from "../views/Company/CompanyLayout.vue";
import Members from "../views/Company/MemberList.vue";
import Peers from "../views/Company/Peers.vue";
import CompanyAdd from "../views/Company/CompanyAdd.vue";
import CompanyList from "../views/Company/CompanyList.vue";
import CompanyProfile from "../views/Company/CompanyProfile.vue";
import CompanyProfileEdit from "../views/Company/CompanyProfileEdit.vue";
import OverviewIndex from "../views/Overview/OverviewIndex.vue";
import OverviewLayout from "../views/Overview/OverviewLayout.vue";
import Extended from "../views/Overview/Extended.vue";
import DepartmentsCategory from "../views/Overview/DepartmentWithCategory.vue";
import DepartmentLayout from "../views/Overview/DepartmentLayout.vue";
import CategoryLayout from "../views/Overview/CategoryLayout.vue";
import CategoryOverview from "../views/Overview/CategoryOverview.vue";
import CategoryResults from "../views/Overview/CategoryResults.vue";
import CategoryTeamManagement from "../views/Overview/CategoryTeamManagement.vue";
import CategoryQuestionList from "../views/Overview/CategoryQuestionList.vue";
// import QuestionnarieLayout from "../Layout/QuestionnarieLayout.vue";
// import QuestionnarieTest from "../views/Questionnarie/QuestionnarieTest.vue";
import ProjectsLayout from "../views/Projects/ProjectsLayout.vue";
import ProjectList from "../views/Projects/ProjectList.vue";
import CreateProject from "../views/Projects/CreateProject.vue";
import FindPartner from "../views/FindPartner/FindPartner.vue";
import Resultlayout from "../views/Results/ResultLayout.vue";
import ResultLocked from "../views/Results/ResultLocked.vue";
import HelpCenterLayout from "../views/HelpCenter/HelpCenterLayout.vue";
import VideoFaq from "../views/HelpCenter/VideoFaq.vue";
import ReportProblem from "../views/HelpCenter/ReportProblem.vue";
import Glossary from "../views/HelpCenter/Glossary.vue";
import PersonalAccount from "../views/PersonalAccount/PersonalAccount.vue";
import PaymentLayout from "../views/Payment/PaymentLayout.vue";
import PaymentInvoice from "../views/Payment/PaymentInvoice.vue";
import PaymentList from "../views/Payment/PaymentList.vue";
import QuestionHint from "../views/Questionnarie/components/QuestionHint.vue";

import store from "../store/index";
import nProgress from "nprogress";
import { loadLocaleMessages, setI18nLanguage, setupI18n } from "../i18n";
import CommonService from "../Services/CommonService";
import errorhandler from "../utils/Error";
// import categoryRoutes from "./routes/category-routes";

const locale = localStorage.getItem("language") || "en";
const i18n = setupI18n({
  locale: locale, // set locale
  fallbackLocale: locale, // set fallback locale
});
loadLocaleMessages(i18n, locale);
// check if user not login then Dashboard related page not show
function guardMyroute(_to, _from, next) {
  var isAuthenticated = false;
  let user = localStorage.getItem("bWFpbCI6Inpvb");
  user = JSON.parse(user);
  if (
    user === null ||
    user === undefined ||
    user.auth_token === "" ||
    user.auth_token === null ||
    user.auth_token === undefined
  ) {
    isAuthenticated = true;
  } else {
    CommonService.getTokenValidation({ auth_token: user.auth_token }).then(
      ({ data }) => {
        if (!data.status) {
          localStorage.removeItem("bWFpbCI6Inpvb");
          // next("/user/login");
          next("/signup/signin");
        }
      }
    );
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    // next("/user/login"); // go to '/login';
    next("/signup/signin"); // go to '/login';
  } else {
    if (
      user.is_career_information_setup &&
      user.is_first_step_complete &&
      user.is_second_step_complete
    ) {
      next(); // go to '/login';
    } else if (!user.is_career_information_setup && user.invitation_id) {
      next({ name: "signup-career" });
    } else if (!user.is_first_step_complete) {
      console.log("I kk1 company first step");
      next({ name: "company-step-one" });
    } else if (!user.is_second_step_complete) {
      console.log("I kk2 company second step");
      next({ name: "company-step-two" });
    } else {
      console.log("no one will run");
      // next({ name: "signup-signin" });
    }
  }
}

function subRouting(_to, _from, next) {
  let staffData =
    JSON.parse(sessionStorage.getItem("OiJKV1QiLCJhbGciOiJIUzI1")) ||
    JSON.parse(localStorage.getItem("bWFpbCI6Inpvb"));
  console.log(_to, _from, staffData);

  if (staffData && Object.keys(staffData).length === 0) {
    next({ name: "signup-signin" });
  } else if (!staffData.is_first_step_complete) {
    console.log("I am in company first step");
    if (_from.name != "company-step-one") {
      next();
    } else {
      next({ name: "company-step-one" });
    }
  } else if (!staffData.is_second_step_complete) {
    if (_from.name != "company-step-two") {
      next();
    } else {
      next({ name: "company-step-two" });
    }
    console.log("I am in company step second");
  } else {
    next();
  }
}

// check if user login then sign-up related page not show
function loginGaurd(to, from, next) {
  var isAuthenticated = true;
  console.log("kk to", to.query);
  if (to.query.invitation_id != undefined) {
    localStorage.setItem("bWFInpvitedbpbUser", JSON.stringify(to.query));
  }
  let user = localStorage.getItem("bWFpbCI6Inpvb");
  // let invitedUserData = JSON.parse(localStorage.getItem("bWFInpvitedbpbUser"));
  user = JSON.parse(user);
  // console.log("invitedUserData logingaurd", invitedUserData, user);
  if (
    user === null ||
    user === undefined ||
    user.auth_token === "" ||
    user.auth_token === null ||
    user.auth_token === undefined
  ) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  if (isAuthenticated) {
    console.log("is user sigin_in");
    if (
      user.is_career_information_setup &&
      user.is_first_step_complete &&
      user.is_second_step_complete
    ) {
      if (to.query.invitation_id != undefined) {
        next({ name: "link-company-account" });
      }
      next({ name: "Dashboard" }); // go to '/login';
    } else {
      next();
    }
  } else {
    next();
  }
}
const routes = [
  {
    path: "/",
    component: Dashboard,
    name: "Dashboard",
    redirect: "/overview",
    beforeEnter: guardMyroute,
    children: [
      {
        path: "company",
        component: CompanyLayout,
        name: "company",
        redirect: "/company/company-list",
        children: [
          {
            path: "members",
            name: "company-member",
            component: Members,
          },
          {
            path: "peers",
            name: "company-peer",
            component: Peers,
          },
          {
            path: "company-setup-update",
            name: "company-update",
            component: CompanyAdd,
          },
          {
            path: "company-list",
            name: "company-list",
            component: CompanyList,
          },
          {
            path: "company-profile",
            name: "company-profile",
            component: CompanyProfile,
          },
          {
            path: "company-profile-edit",
            name: "company-profile-edit",
            component: CompanyProfileEdit,
          },
        ],
      },
      // category Routes
      {
        path: "department/:did/categories",
        component: CategoryLayout,
        name: "cateogries",
        redirect: "/categories/",
        children: [
          {
            path: ":id/overview",
            component: CategoryOverview,
            name: "category-overview",
          },
          {
            path: ":id/qustionlist",
            component: CategoryQuestionList,
            name: "category-qustionlist",
          },
          {
            path: ":id/results",
            component: CategoryResults,
            name: "category-results",
          },
          {
            path: ":id/team-management",
            component: CategoryTeamManagement,
            name: "category-team_management",
          },
        ],
      },
      // results routes
      {
        path: "results",
        component: Resultlayout,
        name: "results",
        redirect: "/results/results-score",
        children: [
          {
            path: "results-score",
            component: ResultLocked,
            name: "results-score",
          },
        ],
      },
      // help Center routes
      {
        path: "help-center",
        component: HelpCenterLayout,
        name: "help-center",
        redirect: "/help-center/video-faq",
        children: [
          {
            path: "video-faq",
            component: VideoFaq,
            name: "video-faq",
          },
          {
            path: "report-problem",
            component: ReportProblem,
            name: "report-problem",
          },
          {
            path: "glossary",
            component: Glossary,
            name: "glossary",
          },
        ],
      },
      // project routes
      {
        path: "projects",
        component: ProjectsLayout,
        name: "projects",
        redirect: "/projects/project-list",
        children: [
          {
            path: "project-list",
            component: ProjectList,
            name: "project-list",
          },
          {
            path: "create-project",
            component: CreateProject,
            name: "create-project",
          },
        ],
      },

      // departments routes
      {
        path: "departments",
        component: DepartmentLayout,
        name: "departments",
        redirect: "/departments/",
        children: [
          {
            path: ":id?/categories",
            component: DepartmentsCategory,
            name: "department-category",
          },
        ],
      },
      // payments routes
      {
        path: "payments",
        component: PaymentLayout,
        name: "payments",
        redirect: "/payments/history",
        children: [
          {
            path: "invoice",
            component: PaymentInvoice,
            name: "payment-invoice",
          },
          {
            path: "history",
            component: PaymentList,
            name: "payment-history",
          },
        ],
      },
      // personal account routes
      {
        path: "personal-account",
        component: PersonalAccount,
        name: "personal-account",
      },
      {
        path: "hint",
        component: QuestionHint,
      },
      // find Partners
      {
        path: "find-partner",
        component: FindPartner,
        name: "find-partner",
      },
      // overview pages
      {
        path: "overview",
        component: OverviewLayout,
        name: "overview",
        redirect: "/overview/index",
        children: [
          {
            path: "index",
            component: OverviewIndex,
            name: "overview-home",
          },
          {
            path: "extended",
            component: Extended,
            name: "overview-extended",
          },
        ],
      },
    ],
  },
  // {
  //   path: "/:departmentid/questionnarie/:categoryId",
  //   component: QuestionnarieLayout,
  //   beforeEnter: guardMyroute,
  //   name: "questionnarie",
  //   redirect: "/questionnarie/questionnarie-test",
  //   children: [
  //     {
  //       path: "questionnarie-test",
  //       component: QuestionnarieTest,
  //       name: "questionnarie-test",
  //     },
  //   ],
  // },
  {
    path: "/signup",
    redirect: "/signup/register",
    component: Authentication,

    children: [
      {
        path: "register",
        name: "signup-register",
        beforeEnter: loginGaurd,
        component: Register,
      },
      {
        path: "career",
        name: "signup-career",
        component: Career,
      },
      {
        path: "company",
        name: "signup-company",
        redirect: "/signup/company/step_one",
        component: Company,
        children: [
          {
            path: "step_one",
            name: "company-step-one",
            beforeEnter: subRouting,
            component: CompanyStep1,
          },
          {
            path: "step_two",
            name: "company-step-two",
            beforeEnter: subRouting,
            component: CompanyStep2,
          },
        ],
      },

      {
        path: "signin",
        name: "signup-signin",
        beforeEnter: loginGaurd,
        component: Signin,
      },
      {
        path: "password",
        name: "signin-password",

        beforeEnter: loginGaurd,
        component: Password,
      },
      {
        path: "update-password",
        name: "signin-update-password",
        beforeEnter: loginGaurd,
        component: UpdatePassword,
      },
      {
        path: "reset-password",
        name: "reset-forget-password",
        beforeEnter: loginGaurd,
        component: ResetPassword,
      },
      {
        path: "verify-account",
        name: "signin-verify-account",

        beforeEnter: loginGaurd,
        component: VerifyAccount,
      },
      {
        path: "link-company",
        name: "link-company-account",
        component: LinkCompany,
      },
    ],
  },

  {
    path: "/404",
    name: "page-not-found",
    component: PageNotFound,
  },
  {
    path: "/500",
    name: "server-error",
    component: ServerError,
  },
  {
    path: "/no-internet",
    name: "internet-error",
    component: InternetError,
  },

  {
    path: "/:catchAll(.*)",
    name: "page-not-found",
    component: PageNotFound,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // mode: history,
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.

  console.log(from);
  if (to.name) {
    // Start the route progress bar.
    nProgress.start();
  }
  next();
});

router.beforeEach(async (to, from, next) => {
  if (navigator.onLine) {
    console.log("");
  } else {
    errorhandler("No Internet ! You are offline");
  }
  const paramsLocale = localStorage.getItem("language") || "en";
  // load locale messages
  if (!i18n.global.availableLocales.includes(paramsLocale)) {
    await loadLocaleMessages(i18n, paramsLocale);
  }
  // set i18n language
  setI18nLanguage(i18n, paramsLocale);
  return next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  console.log(from);
  let routeArr = to.path.split("/").filter((e) => String(e).trim());

  console.log(routeArr[0]);
  store.commit("getActiveMenu", routeArr[0]);
  const el = document.body;
  let activePage = to.path.split("/")[1];
  if (activePage === "signup") {
    let activeSubPage = to.path.split("/")[2];
    if (activeSubPage === "verify-account") {
      el.classList.add("auth_verify_account");
    } else {
      el.classList.remove("auth_verify_account");
    }
    el.classList.add("auth_pages");
  } else {
    el.classList.remove("auth_verify_account");
    el.classList.remove("auth_pages");
  }
  nProgress.done();
});

export default router;
