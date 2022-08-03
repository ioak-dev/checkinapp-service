import bcrypt from "bcrypt";
import { validateMandatoryFields } from "../../lib/validation";

import { userSchema, userCollection } from "../user/model";
import * as Helper from "./helper";
import { getCollection } from "../../lib/dbutils";

const selfRealm = 100;

export const updateMessage = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const message: any = await Helper.updateMessage(
    req.params.space,
    req.body,
    userId
  );
  res.status(200);
  res.send(message);
  res.end();
};

export const getMessage = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const messageList: any = await Helper.getMessage(req.params.space);
  res.status(200);
  res.send(messageList);
  res.end();
};

export const getMessageById = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const messageList: any = await Helper.getMessageById(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(messageList);
  res.end();
};

export const deleteMessage = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteMessage(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};
