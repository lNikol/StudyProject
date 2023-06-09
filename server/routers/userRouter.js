const { check } = require("express-validator");
const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const userController = require("../controllers/userController");

router.post(
  "/registration",
  check("username", "Name cannot be empty").notEmpty(),
  check("password", "Password length from 4 to 20").isLength({
    min: 4,
    max: 20,
  }),
  userController.registration
);

router.post("/login", userController.login);

router.post(
  "/logout",
  roleMiddleware(["USER", "ADMIN"]),
  userController.logout
);

router.put(
  "/changePassword",
  roleMiddleware(["USER", "ADMIN"]),
  userController.changePassword
);

router.put(
  "/changeName",
  roleMiddleware(["USER", "ADMIN"]),
  userController.changeName
);

router.post(
  "/createCard",
  roleMiddleware(["USER", "ADMIN"]),
  check("cardname", "cardname length from 1 to 64").isLength({
    min: 1,
    max: 64,
  }),
  userController.createCard
);

router.delete(
  "/deleteAccount",
  roleMiddleware(["USER", "ADMIN"]),
  userController.deleteAccount
);

router.get(
  "/refresh",
  roleMiddleware(["USER", "ADMIN"]),
  userController.refresh
);
router.post(
  "/userById",
  roleMiddleware(["USER", "ADMIN"]),
  userController.getUserById
);

router.post(
  "/sendExample",
  roleMiddleware(["USER", "ADMIN"]),
  userController.sendExample
);

// router.post(
//   "/searchCard",
//   roleMiddleware(["USER", "ADMIN"]),
//   userController.searchCard
// );

router.post(
  "/communityCards",
  roleMiddleware(["USER", "ADMIN"]),
  userController.getCommunityCards
);

module.exports = router;
