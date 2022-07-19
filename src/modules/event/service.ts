import bcrypt from "bcrypt";
import { validateMandatoryFields } from "../../lib/validation";

import { userSchema, userCollection } from "../user/model";
import * as Helper from "./helper";
import { getCollection } from "../../lib/dbutils";

const selfRealm = 100;

export const updateEvent = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const event: any = await Helper.updateEvent(
    req.params.space,
    req.body,
    userId
  );
  res.status(200);
  res.send(event);
  res.end();
};

export const getEvent = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const eventList: any = await Helper.getEvent(req.params.space);
  res.status(200);
  res.send(eventList);
  res.end();
};

export const getEventById = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const eventList: any = await Helper.getEventById(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(eventList);
  res.end();
};

export const deleteEvent = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteEvent(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};
