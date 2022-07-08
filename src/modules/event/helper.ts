const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { eventCollection, eventSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as NoteHelper from "../note/helper";

export const updateEvent = async (
  space: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, eventCollection, eventSchema);
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

export const getEvent = async (space: string) => {
  const model = getCollection(space, eventCollection, eventSchema);

  return await model.find();
};

export const getEventById = async (space: string, id: string) => {
  const model = getCollection(space, eventCollection, eventSchema);

  const response = await model.find({ _id: id });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const deleteEvent = async (space: string, id: string) => {
  const model = getCollection(space, eventCollection, eventSchema);

  return await model.remove({ _id: id });
};
