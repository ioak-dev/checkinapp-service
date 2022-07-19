import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import { updateEvent, getEvent, deleteEvent, getEventById } from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.put("/event/:space", authorizeApi, asyncHandler(updateEvent));
  router.get("/event/:space", authorizeApi, asyncHandler(getEvent));
  router.get("/event/:space/:id", asyncHandler(getEventById));
  router.delete("/event/:space/:id", authorizeApi, asyncHandler(deleteEvent));
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
