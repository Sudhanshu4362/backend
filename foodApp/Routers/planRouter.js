const express = require('express');
const { protectRoute, isAuthorised } = require('../helper');

const planRouter = express.Router();

//allplan -> accessible for all users
planRouter
  .route('/allPlans')
  .get(getAllPlan)

// specific plan -> available for only loggedin users
planRouter.use(protectRoute)
planRouter
  .route('/plan/:id')
  .get(getPlan)

//create,update,delete -> only for admin and owners i.e checks login but also checks for role of the user then allow thats why it is last route 
planRouter.use(isAuthorised['admin','restaurantowner'])
planRouter
  .route('/crudPlan')
  .post(createPlan)
  .patch(updatePlan)
  .delete(deletePlan)

// planRouter
//    .route()
//    .get(top3Plans)