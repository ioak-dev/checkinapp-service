import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import {
  updateGroupmessage,
  updateGroupmessageAdmin,
  getGroupmessage,
  deleteGroupmessage,
  getGroupmessageById,
  getGroupmessageByEventId,
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.put(
    "/groupmessage/:space/admin",
    authorizeApi,
    asyncHandler(updateGroupmessageAdmin)
  );
  router.put("/groupmessage/:space", asyncHandler(updateGroupmessage));
  router.get(
    "/groupmessage/:space",
    authorizeApi,
    asyncHandler(getGroupmessage)
  );
  router.get(
    "/groupmessage/:space/event/:eventId",
    asyncHandler(getGroupmessageByEventId)
  );
  router.get(
    "/groupmessage/:space/:id",
    authorizeApi,
    asyncHandler(getGroupmessageById)
  );
  router.delete(
    "/groupmessage/:space/:id",
    authorizeApi,
    asyncHandler(deleteGroupmessage)
  );
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
