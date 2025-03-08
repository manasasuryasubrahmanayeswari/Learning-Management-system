import express, { Express } from "express";
import {
  activateUser,
  registrationUser,
  loginUser,
  logoutUser,
  getUserInfo,
  socialAuth,
  UpdateUserInfo,
  updatePassword,
  updateProfilePicture,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

userRouter.post("/activateuser", activateUser);

userRouter.post("/loginuser", loginUser);

userRouter.get("/logoutuser", isAuthenticated, logoutUser);


userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.put("/update-user-info",isAuthenticated, UpdateUserInfo);

userRouter.put("/update-user-password",isAuthenticated, updatePassword);

userRouter.put("/update-user-avatar",isAuthenticated, updateProfilePicture);

userRouter.get("/get-all-users",isAuthenticated,authorizeRoles("admin"), getAllUsers);

userRouter.put("/update-user-role-admin",isAuthenticated,authorizeRoles("admin"), updateUserRole);

userRouter.delete("/delete-user/:id",isAuthenticated,authorizeRoles("admin"), deleteUser);

export default userRouter;
