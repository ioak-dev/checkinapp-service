const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { checkinCollection, checkinSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as NoteHelper from "../note/helper";

export const getAvailableTracks = async (
  space: string,
  eventId: string,
  participantId: string
) => {
  console.log(space, eventId, participantId);
  return [];
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
