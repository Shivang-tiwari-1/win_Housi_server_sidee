
const { body, Expres } = require("express-validator");
const upload = require("../Middleware/Multer.Middleware");
const ApiError = require("../Utils/ApiError.Utils");
const { create_user, GenerateOtp, login_user_otp } = require("../Controller/Authentication.Controller");
const router = require("express").Router();

router.post(
  "/createuser",
  upload.none(),
  [
    body("name")
      .custom((value) => {
        if (!value || value.trim().length <= 3) {
          throw new ApiError("Name is too short");
        } else {
          return true;
        }
      })
      .withMessage("Name is too short"),

    body("email").isEmail().withMessage("Invalid email address"),

    body("password").isLength({ min: 5 }).withMessage("Password is too short"),

    body("phone")
      .custom((value) => {
        if (!value && value.trim().length < 10) {
          throw new ApiError("invalid phone number");
        } else {
          return true;
        }
      })
      .withMessage("invalid phone number"),
    body("address")
      .custom((value) => {
        if (!value) {
          throw new ApiError("address field is required");
        } else {
          return true;
        }
      })
      .withMessage("address field is required"),
    body("role")
      .custom((value) => {
        if (!value) {
          throw new ApiError("role is required");
        } else {
          return true;
        }
      })
      .withMessage("role is required"),
  ],
  create_user
);
router.post("/otp_generate", upload.none(), GenerateOtp);
router.post(
  "/otp_Login",
  upload.none(),
  [
    body("phone").custom((value) => {
      if (value.length < 10) {
        throw new ApiError(401, "phone number should be of 10 digits");
      }
    }),
    body("otp").custom((value) => {
      if (value.length < 6) {
        throw new ApiError(401, "OTP should be of 6 digits");
      }
    }),
  ],
  login_user_otp
);
module.exports = router;
