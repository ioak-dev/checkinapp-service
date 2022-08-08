var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const groupmessageSchema = new Schema(
  {
    eventId: { type: String },
    important: { type: Boolean },
    description: { type: String },
    sender: { type: String },
    userId: { type: String },
    admin: { type: Boolean },
  },
  { timestamps: true }
);

const groupmessageCollection = "groupmessage";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { groupmessageSchema, groupmessageCollection };
