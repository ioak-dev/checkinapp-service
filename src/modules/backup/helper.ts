import { getGlobalCollection } from "../../lib/dbutils";
import { peopleCollection, peopleSchema } from "../roommate/people/model";
import { roommateRequestCollection, roommateRequestSchema } from "../roommate/request/model";

const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const { getCollection } = require("../../lib/dbutils");

export const backup = async () => {
  const peopleModel = getGlobalCollection(
    peopleCollection,
    peopleSchema
  );
  const peopleData = await peopleModel.find();

  const roommateRequestModel = getGlobalCollection(
    roommateRequestCollection,
    roommateRequestSchema
  );
  const roommateRequestData = await roommateRequestModel.find();

  return {
    people: peopleData,
    request: roommateRequestData
  };
};

export const restore = async (data: any) => {
  const peopleModel = getGlobalCollection(
    peopleCollection,
    peopleSchema
  );
  await peopleModel.remove();
  const peopleData = await peopleModel.insertMany(data.people);

  const requestModel = getGlobalCollection(
    roommateRequestCollection,
    roommateRequestSchema
  );
  await requestModel.remove();
  const requestData = await requestModel.insertMany(data.request);

  return {
    people: peopleData.length,
    request: requestData.length
  };
};
