const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const User=require("../models/user.js")


module.exports.rendersignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({email,username});
        const regiseteredUser= await User.register(newUser,password);  
        console.log(regiseteredUser);   
        req.login(regiseteredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
       
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.renderloginForm=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login= async(req,res)=>{
    req.flash("success","Welcome  back to Wanderlust! You are logged in!");
    let redirectUrl=res.locals.redirectUrl ||"/listings";
    res.redirect(redirectUrl);   
};


module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
};