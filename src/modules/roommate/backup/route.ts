import { asyncHandler } from "../../../handler";
import { authorizeApi } from "../../../middlewares";
import { backup, restore } from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.get("/roommate/backup", asyncHandler(backup));
  router.post("/roommate/restore", asyncHandler(restore));
};
