import { asyncHandler } from "../../../handler";
import { authorizeApi, authorizeLocalApi } from "../../../middlewares";
import {
  updatePeople,
  getPeople,
  deletePeople,
  getPeopleById,
  signin,
  token,
  uploadPeople,
  sendPassword
} from "./service";

const selfRealm = 100;

module.exports = function (router: any) {
  router.post(
    "/roommate/auth/signin",
    asyncHandler(signin)
  );
  router.post(
    "/roommate/auth/token",
    asyncHandler(token)
  );
  router.post(
    "/roommate/people/upload",
    asyncHandler(uploadPeople)
  );
  router.post(
    "/roommate/auth/send-password",
    asyncHandler(sendPassword)
  );
  router.put(
    "/roommate/people",
    authorizeLocalApi,
    asyncHandler(updatePeople)
  );
  router.get("/roommate/people", authorizeLocalApi, asyncHandler(getPeople));
  router.get("/roommate/people/:id", asyncHandler(getPeopleById));
  router.delete(
    "/roommate/people/:id",
    authorizeApi,
    asyncHandler(deletePeople)
  );
};
