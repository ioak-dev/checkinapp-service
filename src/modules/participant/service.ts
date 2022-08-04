import bcrypt from "bcrypt";
import { validateMandatoryFields } from "../../lib/validation";

import { userSchema, userCollection } from "../user/model";
import * as Helper from "./helper";
import { getCollection } from "../../lib/dbutils";

const selfRealm = 100;

export const updateParticipant = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const participant: any = await Helper.updateParticipant(
    req.params.space,
    req.body,
    userId
  );
  res.status(200);
  res.send(participant);
  res.end();
};

export const uploadParticipant = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const participant: any = await Helper.uploadParticipant(
    req.params.space,
    req.params.eventId,
    req.body,
    userId
  );
  res.status(200);
  res.send(participant);
  res.end();
};

export const uploadParticipantGroup = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const participant: any = await Helper.uploadParticipantGroup(
    req.params.space,
    req.params.eventId,
    req.body,
    userId
  );
  res.status(200);
  res.send(participant);
  res.end();
};

export const getParticipant = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const participantList: any = await Helper.getParticipant(req.params.space);
  res.status(200);
  res.send(participantList);
  res.end();
};

export const getParticipantById = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const participantList: any = await Helper.getParticipantById(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(participantList);
  res.end();
};

export const getParticipantByReferenceId = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const participantList: any = await Helper.getParticipantByReferenceId(
    req.params.space,
    req.params.referenceId
  );
  res.status(200);
  res.send(participantList);
  res.end();
};

export const getParticipantByGroup = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const participantList: any = await Helper.getParticipantByGroup(
    req.params.space,
    req.params.group
  );
  res.status(200);
  res.send(participantList);
  res.end();
};

export const deleteParticipant = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteParticipant(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};
