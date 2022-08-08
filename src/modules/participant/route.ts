import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import {
  updateParticipant,
  getParticipant,
  deleteParticipant,
  getParticipantById,
  getParticipantByReferenceId,
  getParticipantByGroup,
  uploadParticipant,
  uploadParticipantGroup,
  deleteAllParticipant,
  getParticipantByEventId,
  updateParticipantRoom,
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.put(
    "/participant/:space",
    authorizeApi,
    asyncHandler(updateParticipant)
  );
  router.post(
    "/participant/:space/:eventId/upload",
    authorizeApi,
    asyncHandler(uploadParticipant)
  );
  router.post(
    "/participant/:space/room/:participantId/:room",
    asyncHandler(updateParticipantRoom)
  );
  router.post(
    "/participant/:space/:eventId/upload/group",
    authorizeApi,
    asyncHandler(uploadParticipantGroup)
  );
  router.get("/participant/:space", authorizeApi, asyncHandler(getParticipant));
  router.get("/participant/:space/:id", asyncHandler(getParticipantById));
  router.get(
    "/participant/:space/reference/:referenceId",
    asyncHandler(getParticipantByReferenceId)
  );
  router.get(
    "/participant/:space/group/:group",
    asyncHandler(getParticipantByGroup)
  );
  router.get(
    "/participant/:space/event/:eventId",
    asyncHandler(getParticipantByEventId)
  );
  router.delete(
    "/participant/:space/:id",
    authorizeApi,
    asyncHandler(deleteParticipant)
  );
  router.delete(
    "/participant/:space/event/:eventId",
    authorizeApi,
    asyncHandler(deleteAllParticipant)
  );
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
