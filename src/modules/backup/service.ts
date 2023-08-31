import bcrypt from "bcrypt";
import { validateMandatoryFields } from "../../lib/validation";

import { userSchema, userCollection } from "../user/model";
import * as Helper from "./helper";
import { getCollection } from "../../lib/dbutils";

const selfRealm = 100;

export const backup = async (req: any, res: any) => {
  const data: any = await Helper.backup();
  res.status(200);
  res.send(data);
  res.end();
};

export const restore = async (req: any, res: any) => {
  const data: any = await Helper.restore(req.body);
  res.status(200);
  res.send(data);
  res.end();
};
