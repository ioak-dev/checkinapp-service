import { asyncHandler } from "../../../handler";
import { authorizeApi, authorizeLocalApi } from "../../../middlewares";
import {
  createRequest,
  getRequest,
  deleteRequest,
  revokeRequest,
  approveRequest,
  rejectRequest,
  getReport
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.post(
    "/roommate/request",
    authorizeLocalApi,
    asyncHandler(createRequest)
  );
  router.post(
    "/roommate/request/revoke/:id",
    authorizeLocalApi,
    asyncHandler(revokeRequest)
  );
  router.post(
    "/roommate/request/approve/:id",
    authorizeLocalApi,
    asyncHandler(approveRequest)
  );
  router.post(
    "/roommate/request/reject/:id",
    authorizeLocalApi,
    asyncHandler(rejectRequest)
  );
  router.get("/roommate/request", authorizeLocalApi, asyncHandler(getRequest));
  router.get("/roommate/report", asyncHandler(getReport));
  router.delete(
    "/roommate/request/:id",
    authorizeApi,
    asyncHandler(deleteRequest)
  );
};
