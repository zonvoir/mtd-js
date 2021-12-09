import { createRouter, createWebHashHistory } from "vue-router";
// createWebHashHistory
// import Home from "../views/Home.vue";
import Authentication from "../Layout/Authentication.vue";
import Register from "../views/Auth/Register.vue";
import Career from "../views/Auth/Career.vue";
import Company from "../views/Auth/Company.vue";
import Signin from "../views/Auth/Signin.vue";
import Password from "../views/Auth/Password.vue";
import UpdatePassword from "../views/Auth/UpdatePassword.vue";
import InvitedUser from "../views/Auth/InvitedUser.vue";
import InvitedCareer from "../views/Auth/InvitedCareer.vue";
import VerifyAccount from "../views/Auth/VerifyAccount.vue";
import VerifyEmail from "../views/Auth/EmailConfirmation.vue";
import Dashboard from "../Layout/MainLayout.vue";
import CompanyLayout from "../views/Company/CompanyLayout.vue";
import Members from "../views/Company/MemberList.vue";
import CompanyEdit from "../views/Company/CompanyEdit.vue";
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
import QuestionnarieLayout from "../Layout/QuestionnarieLayout.vue";
import QuestionnarieTest from "../views/Questionnarie/QuestionnarieTest.vue";
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
import nProgress from "nprogress";
import { loadLocaleMessages, setI18nLanguage, setupI18n } from "../i18n";

const locale = localStorage.getItem("language") || "en";
const i18n = setupI18n({
  locale: locale, // set locale
  fallbackLocale: locale, // set fallback locale
});
loadLocaleMessages(i18n, locale);
// check if user not login then Dashboard related page not showsrc\views\Results\ResultLocked.vue
function guardMyroute(to, from, next) {
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
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    next("/signup/signin"); // go to '/login';
  } else {
    if (user.is_career_information_setup && user.is_company_setup) {
      next(); // go to '/login';
    } else {
      next({ name: "signup-career" });
    }
    // next();
  }
}

// check if user login then sign-up related page not show
function loginGaurd(to, from, next) {
  var isAuthenticated = true;
  let user = localStorage.getItem("bWFpbCI6Inpvb");
  user = JSON.parse(user);
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
    if (user.is_career_information_setup && user.is_company_setup) {
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
            path: "company-setup-update",
            name: "company-update",
            component: CompanyEdit,
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
      // {
      //   path: "department/:did/",
      //   component: DepartmentLayout,
      //   name: "departments",
      //   redirect: "/department/",
      //   children: [
      //     {
      //       path: "categories/:id?",
      //       component: DepartmentsCategory,
      //       name: "department-category",
      //     },
      //   ],
      // },
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
      {
        path: "find-partner",
        component: FindPartner,
        name: "find-partner",
      },
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
  {
    path: "/:departmentid/questionnarie/:categoryId",
    component: QuestionnarieLayout,
    name: "questionnarie",
    redirect: "/questionnarie/questionnarie-test",
    children: [
      {
        path: "questionnarie-test",
        component: QuestionnarieTest,
        name: "questionnarie-test",
      },
    ],
  },
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
        component: Company,
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
        component: UpdatePassword,
      },
      {
        path: "invited-user",
        name: "signup-invited-user",
        component: InvitedUser,
      },
      {
        path: "invited-career",
        name: "signup-invited-career",
        component: InvitedCareer,
      },
      {
        path: "verify-account",
        name: "signin-verify-account",

        beforeEnter: loginGaurd,
        component: VerifyAccount,
      },
      {
        path: "email-verified",

        beforeEnter: loginGaurd,
        component: VerifyEmail,
      },
    ],
  },
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
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
  console.log(to, from);
  nProgress.done();
});

export default router;
