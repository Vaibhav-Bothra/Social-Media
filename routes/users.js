const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.get("/", userController.user);
router.get(
  "/profile/:id",
  passport.checkAuthentication,
  userController.profile
);
router.get("/signin", passport.alreadyAuthenticated, userController.signIn);
router.get("/signup", passport.alreadyAuthenticated, userController.signUp);
router.get("/signout", userController.signOut);

router.post("/update/:id", passport.checkAuthentication, userController.update);
router.post("/create", userController.create);
// use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userController.createSession
);

module.exports = router;
