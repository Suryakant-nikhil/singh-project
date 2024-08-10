const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing =require("../models/listing.js");

const {validateReview, isLoggedIn,isreviewAuthor}=require("../middleware.js");

const reviewcontroller=require("../controllers/reviews.js");


//Review
//post Review Route
router.post("/",isLoggedIn,validateReview,  wrapAsync(reviewcontroller.createReview));    

//Delete Review route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewcontroller.deleteReview));
module.exports=router;
