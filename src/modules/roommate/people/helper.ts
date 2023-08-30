import fs from "fs";
const axios = require("axios");
const ONEAUTH_REALM = process.env.ONEAUTH_REALM || "231";
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const ONEAUTH_API_KEY = process.env.ONEAUTH_API_KEY || "421c6610-0373-4f03-903a-2105c42bf9c1";
import { parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { peopleCollection, peopleSchema } from "./model";
import { getGlobalCollection } from "../../../lib/dbutils";
import { decodeAppToken, encodeAppToken } from "../../auth/helper";
import * as RequestHelper from '../request/helper';
import { convertMessage, sendMail } from "../../../lib/mailutils";
const { getCollection } = require("../../../lib/dbutils");

export const updatePeople = async (
  space: string,
  data: any,
  userId?: string
) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);
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
      password: _getPassword()
    });
  }

  return response;
};

const _updatePeopleByEmail = async (data: any) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);
  const _data = { ...data, email: data.email.toLowerCase() };
  const _existing = await model.find({ email: _data.email });
  if (_existing.length === 0) {
    _data.password = _getPassword();
  }
  let response = null;
  response = await model.findOneAndUpdate(
    {
      email: _data.email
    }, { ..._data },
    { new: true, upsert: true }
  );

  return response;
};

export const getPeople = async (userId: string) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);

  const userArray = await model.find({ _id: userId });
  if (userArray.length === 0) {
    return { statue: 401 };
  }

  const user = userArray[0];
  const gender = user.gender;

  const requests = await RequestHelper.getAllRequest();
  let blockedUsers: string[] = [userId];
  const relatedUsers: string[] = [];
  requests.forEach((item: any) => {
    if (item.status === 'approved' && item.from !== userId && item.to !== userId) {
      if (item.to !== userId) {
        blockedUsers.push(item.to);
      }
      if (item.from !== userId) {
        blockedUsers.push(item.from);
      }
    }
    if (item.from === userId || item.to === userId) {
      if (item.to !== userId) {
        relatedUsers.push(item.to);
      }
      if (item.from !== userId) {
        relatedUsers.push(item.from);
      }
    }
  })
  blockedUsers = blockedUsers.filter((item: any) => !relatedUsers.includes(item));

  const availableUsers = await model.find({ $and: [{ _id: { $nin: blockedUsers } }, { gender }] });

  return availableUsers.map((item: any) => {
    return {
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
      phone: item.phone,
      _id: item._id
    }
  })
}
// return {
//   all: allUsers.map((item: any) => {
//     return {
//       email: item.email,
//       firstName: item.firstName,
//       lastName: item.lastName,
//       _id: item._id
//     }
//   }),
//   available: allUsers.map((item: any) => {
//     return {
//       email: item.email,
//       firstName: item.firstName,
//       lastName: item.lastName,
//       _id: item._id
//     }
//   })
// }
// }

export const getPeopleById = async (space: string, id: string) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);

  const response = await model.find({ _id: id });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const getPeopleByReferenceId = async (
  space: string,
  eventId: string,
  referenceId: string
) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);

  const response = await model.find({ referenceId, eventId });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const deletePeople = async (space: string, id: string) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);

  return await model.remove({ _id: id });
};

export const deleteAllPeople = async (space: string, eventId: string) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);

  return await model.remove({ eventId });
};


export const signin = async (payload: { email: string, password: string }) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);

  const response = await model.find({ email: payload.email });

  if (response.length === 0) {
    return { status: 404 };
  }

  const user = response[0];

  if (user.password !== payload.password) {
    return { status: 401 }
  }

  const token = await encodeAppToken({
    email: user.email,
    _id: user._id,
    user_id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone
  });

  return {
    accessToken: token, email: user.email,
    _id: user._id, firstName: user.firstName, lastName: user.lastName,
    phone: user.phone
  };
}

export const token = async (payload: { token: string }) => {

  const response = await decodeAppToken(payload.token);

  return response;
}

export const uploadPeople = async (
  data: any,
) => {
  if (!Array.isArray(data)) {
    return null;
  }

  const responseList: any[] = [];
  for (let i = 0; i < data.length; i++) {
    const response = await _updatePeopleByEmail(data[i]);
    responseList.push(response);
  }

  return responseList;
};

const _getPassword = () => {
  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    'abcdefghijklmnopqrstuvwxyz0123456789@#$';

  for (let i = 1; i <= 12; i++) {
    let char = Math.floor(Math.random()
      * str.length + 1);

    pass += str.charAt(char)
  }

  return pass;
}

export const sendPassword = async (data: string[]) => {
  const model = getGlobalCollection(peopleCollection, peopleSchema);
  const appRoot = process.cwd();
  const emailBodyTemplate = fs.readFileSync(
    appRoot + "/src/emailtemplate/SendPassword.html"
  );
  for (let i = 0; i < data.length; i++) {
    const person = await model.find({ email: data[i].toLowerCase() });
    if (person.length === 1) {
      const emailBody = convertMessage(emailBodyTemplate.toString(), [
        { name: "TEMPLATE_PASSWORD", value: person[0].password },
        { name: "TEMPLATE_USER", value: person[0].firstName },
      ]);
      sendMail({
        to: data[i],
        subject: "Win annual meet choose roommate app password",
        html: emailBody,
      });
    }
  }
}