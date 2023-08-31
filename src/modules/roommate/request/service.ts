import bcrypt from "bcrypt";
import * as Helper from "./helper";

const selfRealm = 100;

export const createRequest = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const roommateRequest: any = await Helper.createRequest(
    req.body,
    userId
  );
  res.status(200);
  res.send(roommateRequest);
  res.end();
};

export const revokeRequest = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const roommateRequest: any = await Helper.revokeRequest(
    req.params.id,
    userId
  );
  res.status(200);
  res.send(roommateRequest);
  res.end();
};

export const approveRequest = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const roommateRequest: any = await Helper.approveRequest(
    req.params.id,
    userId
  );
  res.status(200);
  res.send(roommateRequest);
  res.end();
};

export const rejectRequest = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const roommateRequest: any = await Helper.rejectRequest(
    req.params.id,
    userId
  );
  res.status(200);
  res.send(roommateRequest);
  res.end();
};

export const updateRequestDeclaration = async (req: any, res: any) => {
  const roommateRequest: any = await Helper.updateRequestDeclaration(

    req.params.eventId,
    req.params.roommateRequestId,
    req.params.declaration,
    req.params.value
  );
  res.status(200);
  res.send(roommateRequest);
  res.end();
};

export const getRequest = async (req: any, res: any) => {
  const userId = req.user?.user_id;
  const roommateRequestList: any = await Helper.getRequest(userId);
  res.status(200);
  res.send(roommateRequestList);
  res.end();
};

export const getRequestById = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const roommateRequestList: any = await Helper.getRequestById(

    req.params.id
  );
  res.status(200);
  res.send(roommateRequestList);
  res.end();
};

export const getRequestByReferenceId = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const roommateRequestList: any = await Helper.getRequestByReferenceId(

    req.params.eventId,
    req.params.referenceId
  );
  res.status(200);
  res.send(roommateRequestList);
  res.end();
};

export const deleteRequest = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteRequest(

    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};

export const deleteAllRequest = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteRequest(

    req.params.eventId
  );
  res.status(200);
  res.send(outcome);
  res.end();
};

export const getReport = async (req: any, res: any) => {
  const response: any = await Helper.getReport();
  res.status(200);
  res.send(response);
  res.end();
};