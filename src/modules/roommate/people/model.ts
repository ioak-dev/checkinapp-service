var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const peopleSchema = new Schema(
  {
    referenceId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    gender: { type: String },
    level: {type: String}
  },
  { timestamps: true }
);

const peopleCollection = "roommate.people";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { peopleSchema, peopleCollection };
