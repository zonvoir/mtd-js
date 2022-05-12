import CategoryLayout from "../../views/Overview/CategoryLayout.vue";
import CategoryOverview from "../../views/Overview/CategoryOverview.vue";
import CategoryResults from "../../views/Overview/CategoryResults.vue";
import CategoryTeamManagement from "../../views/Overview/CategoryTeamManagement.vue";
import CategoryQuestionList from "../../views/Overview/CategoryQuestionList.vue";

const categoryRoutes = {
  path: "department/:did/categories",
  component: CategoryLayout,
  name: "cateogries",
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
};

export default categoryRoutes;
