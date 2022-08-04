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

const _updateParticipantByEmail = async (space: string, data: any) => {
  const model = getCollection(space, participantCollection, participantSchema);
  let response = null;
  response = await model.findOneAndUpdate(
    {
      email: data.email,
    },
    {
      ...data,
    },
    { new: true, upsert: true }
  );

  return response;
};

export const uploadParticipant = async (
  space: string,
  eventId: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, participantCollection, participantSchema);
  if (!Array.isArray(data)) {
    return null;
  }

  const responseList: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const response = await _updateParticipantByEmail(space, {
      ...data[i],
      eventId,
    });
    responseList.push(response);
  }

  return responseList;
};

export const uploadParticipantGroup = async (
  space: string,
  eventId: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, participantCollection, participantSchema);
  if (!Array.isArray(data)) {
    return null;
  }

  const responseList: any[] = [];

  return responseList;
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

export const getParticipantByGroup = async (space: string, group: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.find({ groups: group });
};

export const deleteParticipant = async (space: string, id: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.remove({ _id: id });
};
