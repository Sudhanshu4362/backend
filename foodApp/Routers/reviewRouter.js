const express = required("express");
const reviewRouter = express.Router();

const { protectRoute, isAuthorised } = require('../helper');

reviewRouter
   .route("/all")
   .get(getAllReviews);

reviewRouter
   .route("/top3")
   .get(top3Review);

reviewRouter
   .route("/:id")
   .get(getPlanReview);


reviewRouter
   .route("")
   .post(createReview);

reviewRouter
   .route("")
   .patch(updateReview)
   .delete(deleteReview);


module.exports = reviewRouter