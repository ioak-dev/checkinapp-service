import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import { backup, restore } from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.get("/backup/:space", asyncHandler(backup));
  router.post("/restore/:space", asyncHandler(restore));
};
