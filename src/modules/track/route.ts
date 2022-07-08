import { asyncHandler } from "../../handler";
import { authorizeApi } from "../../middlewares";
import { updateTrack, getTrack, deleteTrack, getTrackById } from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.put("/track/:space", authorizeApi, asyncHandler(updateTrack));
  router.get("/track/:space", authorizeApi, asyncHandler(getTrack));
  router.get("/track/:space/:id", authorizeApi, asyncHandler(getTrackById));
  router.delete("/track/:space/:id", authorizeApi, asyncHandler(deleteTrack));
  // router.post("/auth/token", issueToken);
  // router.get("/auth/token/decode", authorizeApi, decodeToken);
  // router.post("/auth/logout", logout);
  // router.get("/auth/oa/session/:id", (req: any, res: any) =>
  //   validateSession(selfRealm, req, res)
  // );
};
