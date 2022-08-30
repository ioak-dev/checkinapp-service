import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import {
  updateCheckin,
  registerIn,
  getCheckin,
  deleteCheckin,
  getCheckinById,
  getAvailableTracks,
  registerOut,
  registerOutAdmin,
  registerInAdmin,
  getCheckinByEvent,
  getCheckinByEventAndTrack,
  registerInReg,
  registerOutReg,
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.get(
    "/checkin/:space/:eventId/:participantId/track",
    asyncHandler(getAvailableTracks)
  );
  router.get(
    "/checkin/:space/:eventId/:participantId",
    asyncHandler(getCheckin)
  );
  router.post(
    "/checkin/:space/:eventId/:participantId/:trackId/in",
    asyncHandler(registerIn)
  );
  router.post(
    "/checkin/:space/:eventId/:participantId/:trackId/out",
    asyncHandler(registerOut)
  );
  router.post(
    "/checkin/:space/:eventId/:participantId/:trackId/register/in",
    asyncHandler(registerInReg)
  );
  router.post(
    "/checkin/:space/:eventId/:participantId/:trackId/register/out",
    asyncHandler(registerOutReg)
  );
  router.post(
    "/checkin/:space/:eventId/:participantId/:trackId/in/admin",
    asyncHandler(registerInAdmin)
  );
  router.post(
    "/checkin/:space/:eventId/:participantId/:trackId/out/admin",
    asyncHandler(registerOutAdmin)
  );
  router.put("/checkin/:space", authorizeApi, asyncHandler(updateCheckin));
  router.get("/checkin/:space", authorizeApi, asyncHandler(getCheckin));
  router.get("/checkin/:space/event/:eventId", asyncHandler(getCheckinByEvent));
  router.get(
    "/checkin/:space/event/:eventId/track/:trackId",
    asyncHandler(getCheckinByEventAndTrack)
  );
  router.get("/checkin/:space/:id", authorizeApi, asyncHandler(getCheckinById));
  router.delete("/checkin/:space/:id", asyncHandler(deleteCheckin));
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
