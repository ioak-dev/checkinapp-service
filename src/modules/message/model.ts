var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const messageSchema = new Schema(
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

const messageCollection = "message";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { messageSchema, messageCollection };
