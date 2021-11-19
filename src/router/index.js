import { createRouter, createWebHashHistory } from "vue-router";
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
    next();
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
    next({ name: "Dashboard" }); // go to '/login';
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
            path: "company-edit",
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
        path: "category-home",
        component: CategoryLayout,
        name: "cateogry-home",
        redirect: "/category-home/category-overview",
        children: [
          {
            path: "category-overview",
            component: CategoryOverview,
            name: "category-overview",
          },
          {
            path: "category-qustionlist",
            component: CategoryQuestionList,
            name: "category-qustionlist",
          },
          {
            path: "category-results",
            component: CategoryResults,
            name: "category-results",
          },
          {
            path: "category-team_management",
            component: CategoryTeamManagement,
            name: "category-team_management",
          },
        ],
      },
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
      {
        path: "department-home",
        component: DepartmentLayout,
        name: "department-home",
        redirect: "/department-home/department-category",
        children: [
          {
            path: "department-category",
            component: DepartmentsCategory,
            name: "department-category",
          },
        ],
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
    path: "/questionnarie",
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
});

export default router;
