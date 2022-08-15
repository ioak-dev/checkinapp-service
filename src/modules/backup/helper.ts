import { checkinCollection, checkinSchema } from "../checkin/model";
import { eventCollection, eventSchema } from "../event/model";
import {
  groupmessageCollection,
  groupmessageSchema,
} from "../groupmessage/model";
import { messageCollection, messageSchema } from "../message/model";
import { participantCollection, participantSchema } from "../participant/model";
import { trackCollection, trackSchema } from "../track/model";

const axios = require("axios");
const ONEAUTH_API = process.env.ONEAUTH_API || "http://localhost:4010/api";
const { getCollection } = require("../../lib/dbutils");

export const backup = async (space: string) => {
  const participantModel = getCollection(
    space,
    participantCollection,
    participantSchema
  );
  const participantData = await participantModel.find();

  const eventModel = getCollection(space, eventCollection, eventSchema);
  const eventData = await eventModel.find();

  const checkinModel = getCollection(space, checkinCollection, checkinSchema);
  const checkinData = await checkinModel.find();

  const trackModel = getCollection(space, trackCollection, trackSchema);
  const trackData = await trackModel.find();

  const messageModel = getCollection(space, messageCollection, messageSchema);
  const messageData = await messageModel.find();

  const groupMessageModel = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );
  const groupMessageData = await groupMessageModel.find();

  return {
    participant: participantData,
    event: eventData,
    checkin: checkinData,
    track: trackData,
    message: messageData,
    groupMessage: groupMessageData,
  };
};

export const restore = async (space: string, data: any) => {
  const eventModel = getCollection(space, eventCollection, eventSchema);
  await eventModel.remove();
  const eventData = await eventModel.insertMany(data.event);

  const participantModel = getCollection(
    space,
    participantCollection,
    participantSchema
  );
  await participantModel.remove();
  const participantData = await participantModel.insertMany(data.participant);

  const checkinModel = getCollection(space, checkinCollection, checkinSchema);
  await checkinModel.remove();
  const checkinData = await checkinModel.insertMany(data.checkin);

  const trackModel = getCollection(space, trackCollection, trackSchema);
  await trackModel.remove();
  const trackData = await trackModel.insertMany(data.track);

  const messageModel = getCollection(space, messageCollection, messageSchema);
  await messageModel.remove();
  const messageData = await messageModel.insertMany(data.message);

  const groupMessageModel = getCollection(
    space,
    groupmessageCollection,
    groupmessageSchema
  );
  await groupMessageModel.remove();
  const groupMessageData = await groupMessageModel.insertMany(
    data.groupMessage
  );

  return {
    event: eventData.length,
    participant: participantData.length,
    track: trackData.length,
    checkin: checkinData.length,
    message: messageData.length,
    groupMessage: groupMessageData.length,
  };
};
