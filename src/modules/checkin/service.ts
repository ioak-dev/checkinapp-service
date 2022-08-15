import bcrypt from "bcrypt";
import { validateMandatoryFields } from "../../lib/validation";

import { userSchema, userCollection } from "../user/model";
import * as Helper from "./helper";
import { getCollection } from "../../lib/dbutils";

const selfRealm = 100;

export const getAvailableTracks = async (req: any, res: any) => {
  const checkinList: any = await Helper.getAvailableTracks(
    req.params.space,
    req.params.eventId,
    req.params.participantId
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const registerIn = async (req: any, res: any) => {
  const checkinList: any = await Helper.registerIn(
    req.params.space,
    req.params.eventId,
    req.params.participantId,
    req.params.trackId,
    req.query.code
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const registerOutAdmin = async (req: any, res: any) => {
  const checkinList: any = await Helper.registerOut(
    req.params.space,
    req.params.eventId,
    req.params.participantId,
    req.params.trackId,
    true
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const registerInAdmin = async (req: any, res: any) => {
  const checkinList: any = await Helper.registerIn(
    req.params.space,
    req.params.eventId,
    req.params.participantId,
    req.params.trackId,
    req.query.code,
    true
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const registerOut = async (req: any, res: any) => {
  const checkinList: any = await Helper.registerOut(
    req.params.space,
    req.params.eventId,
    req.params.participantId,
    req.params.trackId
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const updateCheckin = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const checkin: any = await Helper.updateCheckin(
    req.params.space,
    req.body,
    userId
  );
  res.status(200);
  res.send(checkin);
  res.end();
};

export const getCheckin = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const checkinList: any = await Helper.getCheckin(req.params.space);
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const getCheckinByEvent = async (req: any, res: any) => {
  const checkinList: any = await Helper.getCheckin(req.params.space);
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const getCheckinByEventAndTrack = async (req: any, res: any) => {
  const checkinList: any = await Helper.getCheckinByEventAndTrack(
    req.params.space,
    req.params.eventId,
    req.params.trackId
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const getCheckinByParticipantId = async (req: any, res: any) => {
  const checkinList: any = await Helper.getCheckinByParticipantId(
    req.params.space,
    req.params.eventId,
    req.params.participantId
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const getCheckinById = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const checkinList: any = await Helper.getCheckinById(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(checkinList);
  res.end();
};

export const deleteCheckin = async (req: any, res: any) => {
  const outcome: any = await Helper.deleteCheckin(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};
