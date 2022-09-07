const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { checkinCollection, checkinSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as TrackHelper from "../track/helper";
import * as EventHelper from "../event/helper";
import { isEmptyOrSpaces } from "../../lib/Utils";
import { trackCollection, trackSchema } from "../track/model";

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
  const trackList = await TrackHelper.getCurrentTracksByEvent(space, eventId);
  const response: any[] = [];
  trackList.forEach((item: any) => {
    response.push(
      _enrichTrackForCheckinData(checkinMap, participantId, item._doc)
    );
  });
  return response;
};

const _enrichTrackForCheckinData = (
  checkinMap: any,
  participantId: string,
  track: any
) => {
  const _item = { ...track };

  _item.isLocked = !(new Date() >= track.from && new Date() <= track.to);

  const previousCheckin = checkinMap[participantId + "-" + track._id];
  if (previousCheckin) {
    _item.status = previousCheckin.to ? "closed" : "active";
  } else {
    _item.status = "new";
  }

  return _item;
};

export const registerIn = async (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string,
  code: string,
  admin?: boolean
) => {
  if (!admin && trackId !== "NA") {
    const track = await TrackHelper.getTrackById(space, trackId);
    if (track.code && track.code !== 0) {
      if (parseInt(code) !== track.code) {
        return { status: "FAILURE", errorCode: "INVALID_CODE" };
      }
    } else {
      const event = await EventHelper.getEventById(space, eventId);
      if (event.code && event.code !== 0 && parseInt(code) !== event.code) {
        return { status: "FAILURE", errorCode: "INVALID_CODE" };
      }
    }
  }

  const model = getCollection(space, checkinCollection, checkinSchema);
  const existingRecord = await model.find({
    eventId,
    participantId,
    trackId: trackId === "NA" ? null : trackId,
  });
  let response = null;
  if (existingRecord.length > 0) {
    if (trackId !== "NA") {
      response = await model.findByIdAndUpdate(
        existingRecord[0]._id,
        {
          ...existingRecord[0]._doc,
          from: new Date(),
          to: null,
        },
        { new: true, upsert: true }
      );
    }
  } else {
    response = await model.create({
      eventId,
      participantId,
      trackId: trackId === "NA" ? null : trackId,
      from: new Date(),
    });
  }

  return { status: "SUCCESS", response };
};

export const registerOut = async (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string,
  admin?: boolean
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);
  const existingRecord = await model.find({
    eventId,
    participantId,
    trackId: trackId === "NA" ? null : trackId,
  });
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

export const registerInReg = async (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);
  if (trackId !== "NA") {
    const trackModel = getCollection(space, trackCollection, trackSchema);
    const track = await trackModel.find({ _id: trackId, eventId });
    if (track.length === 1 && !isEmptyOrSpaces(track[0].exclusiveGroup)) {
      const exclusiveTracks = await trackModel.find({
        exclusiveGroup: track[0].exclusiveGroup,
        eventId,
      });
      const exclusiveTrackIds: string[] = [];
      exclusiveTracks.forEach((item: any) => exclusiveTrackIds.push(item._id));
      await model.remove({
        eventId,
        participantId,
        trackId: { $in: exclusiveTrackIds },
      });
    }
  }
  const existingRecord = await model.find({
    eventId,
    participantId,
    trackId: trackId === "NA" ? null : trackId,
  });
  let response = null;
  if (existingRecord.length > 0) {
    if (trackId !== "NA") {
      response = await model.findByIdAndUpdate(
        existingRecord[0]._id,
        {
          ...existingRecord[0]._doc,
        },
        { new: true, upsert: true }
      );
    }
  } else {
    response = await model.create({
      eventId,
      participantId,
      trackId: trackId === "NA" ? null : trackId,
      register: new Date(),
    });
  }

  return { status: "SUCCESS", response };
};

export const registerOutReg = async (
  space: string,
  eventId: string,
  participantId: string,
  trackId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);
  return await model.remove({
    eventId,
    participantId,
    trackId: trackId === "NA" ? null : trackId,
  });
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

export const getCheckinByEventId = async (space: string, eventId: string) => {
  const model = getCollection(space, checkinCollection, checkinSchema);

  return await model.find({ eventId });
};

export const getCheckin = async (
  space: string,
  eventId: string,
  participantId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);

  return await model.find({ eventId, participantId });
};

export const getCheckinByEventAndTrack = async (
  space: string,
  eventId: string,
  trackId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);

  return await model.find({
    eventId,
    trackId: trackId === "NA" ? null : trackId,
  });
};

export const getCheckinByParticipantId = async (
  space: string,
  eventId: string,
  participantId: string
) => {
  const model = getCollection(space, checkinCollection, checkinSchema);

  return await model.find({ eventId, participantId });
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
