const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { checkinCollection, checkinSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as TrackHelper from "../track/helper";

export const getAvailableTracks = async (
  space: string,
  eventId: string,
  participantId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);
  const checkinList = await model.find({ eventId, participantId });
  const checkinMap: any = {};
  checkinList.forEach((item: any) => {
    checkinMap[item.participantId + "-" + item.trackId] = item;
  });
  console.log(checkinMap);
  const trackList = await TrackHelper.getCurrentTracksByEvent(space, eventId);
  const response: any[] = [];
  trackList.forEach((item: any) => {
    const previousCheckin = checkinMap[participantId + "-" + item._id];
    console.log(participantId + "-" + item._id);
    console.log(previousCheckin);
    const _item = { ...item._doc };
    if (previousCheckin) {
      _item.status = previousCheckin.to ? "closed" : "active";
    } else {
      _item.status = "new";
    }
    response.push(_item);
  });
  return response;
};

export const registerIn = async (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);
  const existingRecord = await model.find({ eventId, participantId, trackId });
  let response = null;
  if (existingRecord.length > 0) {
    response = await model.findByIdAndUpdate(
      existingRecord[0]._id,
      {
        ...existingRecord[0]._doc,
        to: null,
      },
      { new: true, upsert: true }
    );
  } else {
    response = await model.create({
      eventId,
      participantId,
      trackId,
      from: new Date(),
    });
  }

  return response;
};

export const registerOut = async (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);
  const existingRecord = await model.find({ eventId, participantId, trackId });
  let response = null;
  if (existingRecord.length > 0) {
    response = await model.findByIdAndUpdate(
      existingRecord[0]._id,
      {
        ...existingRecord[0]._doc,
        to: new Date(),
      },
      { new: true, upsert: true }
    );
  }

  return response;
};

export const updateCheckin = async (
  space: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);
  let response = null;
  if (data._id) {
    response = await model.findByIdAndUpdate(
      data._id,
      {
        ...data,
      },
      { new: true, upsert: true }
    );
  } else {
    response = await model.create({
      ...data,
    });
  }

  return response;
};

export const getCheckin = async (space: string) => {
  const model = getCollection(space, checkinCollection, checkinSchema);

  return await model.find();
};

export const getCheckinById = async (space: string, id: string) => {
  const model = getCollection(space, checkinCollection, checkinSchema);

  const response = await model.find({ _id: id });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const deleteCheckin = async (space: string, id: string) => {
  const model = getCollection(space, checkinCollection, checkinSchema);

  return await model.remove({ _id: id });
};
