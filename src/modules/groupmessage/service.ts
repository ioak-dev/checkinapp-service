import bcrypt from "bcrypt";
import { validateMandatoryFields } from "../../lib/validation";

import { userSchema, userCollection } from "../user/model";
import * as Helper from "./helper";
import { getCollection } from "../../lib/dbutils";

const selfRealm = 100;

export const updateGroupmessage = async (req: any, res: any) => {
  const groupmessage: any = await Helper.updateGroupmessage(
    req.params.space,
    req.body,
    false
  );
  res.status(200);
  res.send(groupmessage);
  res.end();
};

export const updateGroupmessageAdmin = async (req: any, res: any) => {
  const groupmessage: any = await Helper.updateGroupmessage(
    req.params.space,
    req.body,
    true
  );
  res.status(200);
  res.send(groupmessage);
  res.end();
};

export const getGroupmessage = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const groupmessageList: any = await Helper.getGroupmessage(req.params.space);
  res.status(200);
  res.send(groupmessageList);
  res.end();
};

export const getGroupmessageByEventId = async (req: any, res: any) => {
  const groupmessageList: any = await Helper.getGroupmessageByEventId(
    req.params.space,
    req.params.eventId,
    req.params.group
  );
  res.status(200);
  res.send(groupmessageList);
  res.end();
};

export const getGroupmessageById = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const groupmessageList: any = await Helper.getGroupmessageById(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(groupmessageList);
  res.end();
};

export const deleteGroupmessage = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteGroupmessage(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};
