import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import {
  updateMessage,
  updateMessageAdmin,
  getMessage,
  deleteMessage,
  getMessageById,
  getMessageByEventId,
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.put(
    "/message/:space/admin",
    authorizeApi,
    asyncHandler(updateMessageAdmin)
  );
  router.put("/message/:space", asyncHandler(updateMessage));
  router.get("/message/:space", authorizeApi, asyncHandler(getMessage));
  router.get(
    "/message/:space/event/:eventId",
    authorizeApi,
    asyncHandler(getMessageByEventId)
  );
  router.get("/message/:space/:id", authorizeApi, asyncHandler(getMessageById));
  router.delete(
    "/message/:space/:id",
    authorizeApi,
    asyncHandler(deleteMessage)
  );
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
