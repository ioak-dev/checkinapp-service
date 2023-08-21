const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
import { parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { roommateRequestCollection, roommateRequestSchema } from "./model";
import { getGlobalCollection } from "../../../lib/dbutils";

export const createRequest = async (
  data: any,
  userId?: string
) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);
  const requestsToBlockedUsers = await model.find({
    $or: [
      { $and: [{ from: data.from }, { status: "approved" }] },
      { $and: [{ from: data.to }, { status: "approved" }] },
      { $and: [{ to: data.from }, { status: "approved" }] },
      { $and: [{ to: data.to }, { status: "approved" }] }
    ]
  })
  if (requestsToBlockedUsers.length > 0) {
    return { status: "user not available" }
  }
  let response = null;
  if (data._id) {
    response = await model.findByIdAndUpdate(
      data._id,
      {
        ...data, status: 'requested'
      },
      { new: true, upsert: true }
    );
  } else {
    response = await model.create({
      ...data, status: 'requested'
    });
  }

  return response;
};

export const revokeRequest = async (
  id: any,
  userId?: string
) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);
  let response = null;
  return await model.deleteMany({ _id: id });
};

export const approveRequest = async (
  id: any,
  userId?: string
) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);
  const requestList = await model.find({ _id: id });
  if (requestList.length === 0) {
    return { status: 404 }
  }

  const request = requestList[0];

  const existingApprovedRequests = await model.find({
    $or: [
      { $and: [{ from: request.from }, { status: 'approved' }] },
      { $and: [{ from: request.to }, { status: 'approved' }] },
      { $and: [{ to: request.from }, { status: 'approved' }] },
      { $and: [{ to: request.to }, { status: 'approved' }] }]
  })

  if (existingApprovedRequests.length > 0) {
    return { status: "already exists" }
  }

  let response = null;
  response = await model.findByIdAndUpdate(
    id,
    {
      status: 'approved'
    },
    {}
  );

  await model.deleteMany({
    $or: [
      { $and: [{ from: request.from }, { status: 'requested' }] },
      { $and: [{ from: request.to }, { status: 'requested' }] },
      { $and: [{ to: request.from }, { status: 'requested' }] },
      { $and: [{ to: request.to }, { status: 'requested' }] }
    ]
  })

  return response;
};

export const rejectRequest = async (
  id: any,
  userId?: string
) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);
  let response = null;
  response = await model.findByIdAndUpdate(
    id,
    {
      status: 'rejected'
    },
    {}
  );

  return response;
};

export const updateRequestDeclaration = async (
  eventId: string,
  roommateRequestId: string,
  declaration: string,
  value: string
) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);
  const _toUpdate = {
    [declaration === "first" ? "firstDeclaration" : "secondDeclaration"]:
      value === "Y",
  };
  return await model.findOneAndUpdate(
    { eventId, _id: roommateRequestId },
    _toUpdate,
    {
      new: true,
      upsert: true,
    }
  );
};

export const getRequest = async (userId: string) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);

  return await model.find({ $or: [{ from: userId }, { to: userId }] });
};

export const getAllRequest = async () => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);

  return await model.find();
};

export const getRequestById = async (id: string) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);

  const response = await model.find({ _id: id });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const getRequestByReferenceId = async (

  eventId: string,
  referenceId: string
) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);

  const response = await model.find({ referenceId, eventId });
  if (response.length > 0) {
    return response[0];
  }
  return null;
};

export const deleteRequest = async (id: string) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);

  return await model.remove({ _id: id });
};

export const deleteAllRequest = async (eventId: string) => {
  const model = getGlobalCollection(roommateRequestCollection, roommateRequestSchema);

  return await model.remove({ eventId });
};
