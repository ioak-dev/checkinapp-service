import bcrypt from "bcrypt";
import { validateMandatoryFields } from "../../lib/validation";

import { userSchema, userCollection } from "../user/model";
import * as Helper from "./helper";
import { getCollection } from "../../lib/dbutils";

const selfRealm = 100;

export const updateTrack = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const track: any = await Helper.updateTrack(
    req.params.space,
    req.body,
    userId
  );
  res.status(200);
  res.send(track);
  res.end();
};

export const uploadTrack = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const track: any = await Helper.uploadTrack(
    req.params.space,
    req.params.eventId,
    req.body,
    userId
  );
  res.status(200);
  res.send(track);
  res.end();
};

export const getTrack = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const trackList: any = await Helper.getTrack(req.params.space);
  res.status(200);
  res.send(trackList);
  res.end();
};

export const getTrackById = async (req: any, res: any) => {
  const trackList: any = await Helper.getTrackById(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(trackList);
  res.end();
};

export const getTrackByEventId = async (req: any, res: any) => {
  const trackList: any = await Helper.getTrackByEventId(
    req.params.space,
    req.params.eventId
  );
  res.status(200);
  res.send(trackList);
  res.end();
};

export const deleteTrack = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteTrack(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};

export const deleteAllTrack = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deleteAllTrack(
    req.params.space,
    req.params.eventId
  );
  res.status(200);
  res.send(outcome);
  res.end();
};
