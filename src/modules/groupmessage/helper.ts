const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { groupmessageCollection, groupmessageSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as NoteHelper from "../note/helper";

export const updateGroupmessage = async (
  space: string,
  data: any,
  admin: boolean
) => {
  const model = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );
  let response = null;
  if (data._id) {
    response = await model.findByIdAndUpdate(
      data._id,
      {
        ...data,
        admin,
      },
      { new: true, upsert: true }
    );
  } else {
    response = await model.create({
      ...data,
      admin,
    });
  }

  return response;
};

export const getGroupmessage = async (space: string) => {
  const model = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );

  return await model.find();
};

export const getGroupmessageByEventId = async (
  space: string,
  eventId: string
) => {
  const model = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );

  return await model.find({ eventId });
};

export const getGroupmessageById = async (space: string, id: string) => {
  const model = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );

  const response = await model.find({ _id: id });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const deleteGroupmessage = async (space: string, id: string) => {
  const model = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );

  return await model.remove({ _id: id });
};

export const getCurrentGroupmessagesByEvent = async (
  space: string,
  eventId: string
) => {
  const model = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );
  return await model
    .find({
      $and: [
        { eventId },
        // { from: { $lte: new Date() } },
        // { to: { $gte: new Date() } },
      ],
    })
    .sort({ from: "asc" });
};
