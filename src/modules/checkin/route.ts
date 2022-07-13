import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import {
  updateCheckin,
  getCheckin,
  deleteCheckin,
  getCheckinById,
  getAvailableTracks,
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.get(
    "/checkin/:space/:eventId/:participantId",
    asyncHandler(getAvailableTracks)
  );
  router.put("/checkin/:space", authorizeApi, asyncHandler(updateCheckin));
  router.get("/checkin/:space", authorizeApi, asyncHandler(getCheckin));
  router.get("/checkin/:space/:id", authorizeApi, asyncHandler(getCheckinById));
  router.delete(
    "/checkin/:space/:id",
    authorizeApi,
    asyncHandler(deleteCheckin)
  );
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
