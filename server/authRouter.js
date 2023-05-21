const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const roleMiddleware = require("./middleware/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Name cannot be empty").notEmpty(),
    check("password", "Password length from 4 to 10").isLength({
      min: 4,
      max: 10,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);
router.get("/cards", roleMiddleware(["USER"]), controller.getCards);
router.post("/createCard", controller.createCard);
//router.post('sendExample',controller.sendExample)
module.exports = router;
