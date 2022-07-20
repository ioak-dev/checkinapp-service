const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { participantCollection, participantSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as NoteHelper from "../note/helper";

export const updateParticipant = async (
  space: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, participantCollection, participantSchema);
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

export const getParticipant = async (space: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.find();
};

export const getParticipantById = async (space: string, id: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  const response = await model.find({ _id: id });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const getParticipantByReferenceId = async (
  space: string,
  referenceId: string
) => {
  const model = getCollection(space, participantCollection, participantSchema);

  const response = await model.find({ referenceId });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const deleteParticipant = async (space: string, id: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.remove({ _id: id });
};
