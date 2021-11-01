import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Authentication from "../Layout/LoginLayout/Authentication.vue";
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
import Dashboard from "../Layout/DasboardLayout/MainLayout.vue";
// check if user not login then Dashboard related page not show
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
    beforeEnter: guardMyroute,
    children: [],
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
