const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { participantCollection, participantSchema } from "./model";
const { getCollection } = require("../../lib/dbutils");
import { nextval } from "../sequence/service";
import * as NoteHelper from "../note/helper";
import { parse } from "date-fns";
import { eventCollection, eventSchema } from "../event/model";

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

export const updateParticipantRoom = async (
  space: string,
  participantId: string,
  room: string
) => {
  const model = getCollection(space, participantCollection, participantSchema);
  return await model.findByIdAndUpdate(
    participantId,
    {
      room,
    },
    { new: true, upsert: true }
  );
};

const _updateParticipantByEmail = async (space: string, data: any) => {
  const model = getCollection(space, participantCollection, participantSchema);
  let response = null;
  response = await model.findOneAndUpdate(
    {
      email: data.email,
      eventId: data.eventId,
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
  _eventId: string,
  data: any,
  userId?: string
) => {
  const model = getCollection(space, participantCollection, participantSchema);
  if (!Array.isArray(data)) {
    return null;
  }

  const eventModel = getCollection(space, eventCollection, eventSchema);

  const event = await eventModel.findOne({ _id: _eventId });

  if (!event) {
    return null;
  }

  const customFieldDefList = JSON.parse(event.customFields);
  const customFieldDefMap: any = {};
  for (let i = 0; i < customFieldDefList.length; i++) {
    customFieldDefMap[customFieldDefList[i].name] = customFieldDefList[i];
  }

  const responseList: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const {
      referenceId,
      firstName,
      lastName,
      eventId,
      email,
      telephone,
      room,
      birthDate,
      joiningDate,
      practice,
      ..._customFields
    } = data[i];
    const customFields = _formatCustomFieldsValue(
      customFieldDefMap,
      _customFields
    );
    const response = await _updateParticipantByEmail(space, {
      referenceId,
      firstName,
      lastName,
      eventId: _eventId,
      email,
      telephone,
      room,
      practice,
      customFields,
      birthDate: birthDate ? parse(birthDate, "yyyyMMdd", new Date()) : null,
      joiningDate: joiningDate
        ? parse(joiningDate, "yyyyMMdd", new Date())
        : null,
    });
    responseList.push(response);
  }

  return responseList;
};

const _formatCustomFieldsValue = (customFieldDef: any, customFields: any) => {
  if (!customFields) {
    return {};
  }
  const _customFields: any = {};
  Object.keys(customFieldDef).forEach((item) => {
    const customFieldDefItem = customFieldDef[item];
    const customFieldValue = customFields[item];
    if (!customFieldValue) {
      _customFields[item] = null;
    } else {
      switch (customFieldDefItem.datatype) {
        case "date":
          _customFields[item] = parse(customFieldValue, "yyyyMMdd", new Date());
          break;
        case "datetime":
          _customFields[item] = parse(
            customFieldValue,
            "yyyyMMddHHmm",
            new Date()
          );
          break;

        default:
          _customFields[item] = customFieldValue;
          break;
      }
    }
  });
  return _customFields;
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

  const _groupMap: any = {};
  data.forEach((item: any) => {
    if (_groupMap[item.email]) {
      _groupMap[item.email] = [..._groupMap[item.email], item.group];
    } else {
      _groupMap[item.email] = [item.group];
    }
  });

  const responseList: any[] = [];
  const _emailList = Object.keys(_groupMap);
  for (let i = 0; i < _emailList.length; i++) {
    const response = await _updateParticipantByEmail(space, {
      email: _emailList[i],
      groups: _groupMap[_emailList[i]],
    });
    responseList.push(response);
  }

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

export const getParticipantByEventId = async (
  space: string,
  eventId: string
) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.find({ eventId }).sort({ firstName: "asc" });
};

export const getParticipantByGroup = async (space: string, group: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.find({ groups: group }).sort({ firstName: "asc" });
};

export const deleteParticipant = async (space: string, id: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.remove({ _id: id });
};

export const deleteAllParticipant = async (space: string, eventId: string) => {
  const model = getCollection(space, participantCollection, participantSchema);

  return await model.remove({ eventId });
};
