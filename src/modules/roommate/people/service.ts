import bcrypt from "bcrypt";
import * as Helper from "./helper";

const selfRealm = 100;

export const updatePeople = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const people: any = await Helper.updatePeople(
    req.params.space,
    req.body,
    userId
  );
  res.status(200);
  res.send(people);
  res.end();
};

export const getPeople = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const peopleList: any = await Helper.getPeople(userId);
  res.status(200);
  res.send(peopleList);
  res.end();
};

export const getPeopleById = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const peopleList: any = await Helper.getPeopleById(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(peopleList);
  res.end();
};

export const getPeopleByReferenceId = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const peopleList: any = await Helper.getPeopleByReferenceId(
    req.params.space,
    req.params.eventId,
    req.params.referenceId
  );
  res.status(200);
  res.send(peopleList);
  res.end();
};


export const deletePeople = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deletePeople(
    req.params.space,
    req.params.id
  );
  res.status(200);
  res.send(outcome);
  res.end();
};

export const deleteAllPeople = async (req: any, res: any) => {
  const userId = req.user.user_id;
  const outcome: any = await Helper.deletePeople(
    req.params.space,
    req.params.eventId
  );
  res.status(200);
  res.send(outcome);
  res.end();
};



export const signin = async (req: any, res: any) => {
  const peopleList: any = await Helper.signin(req.body);
  res.status(200);
  res.send(peopleList);
  res.end();
};

export const token = async (req: any, res: any) => {
  const response: any = await Helper.token(req.body);
  res.status(200);
  res.send(response);
  res.end();
};

export const uploadPeople = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const response: any = await Helper.uploadPeople(
    req.body
  );
  res.status(200);
  res.send(response);
  res.end();
};

export const sendPassword = async (req: any, res: any) => {
  // const userId = req.user.user_id;
  const response: any = await Helper.sendPassword(
    req.body
  );
  res.status(200);
  res.send(response);
  res.end();
};
