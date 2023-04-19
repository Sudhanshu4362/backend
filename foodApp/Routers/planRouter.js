const express = require('express');
const { protectRoute, isAuthorised } = require('../helper');
const planRouter = express.Router();
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3Plans} = require("../controller/planController")

//allplan -> accessible for all users
planRouter
  .route('/all')
  .get(getAllPlans)

planRouter
  .route('/top3')
  .get(top3Plans)

// specific plan -> available for only loggedin users
planRouter.use(protectRoute)
planRouter
  .route('/single/:id')
  .get(getPlan)

//create,update,delete -> only for admin and owners i.e checks login but also checks for role of the user then allow thats why it is last route 
planRouter.use(isAuthorised(['admin', 'restaurantowner']))
planRouter
    .route("/crud")
    .post(createPlan);

planRouter
    .route('/crud/:id')
    .patch(updatePlan)
    .delete(deletePlan)


  module.exports = planRouter;