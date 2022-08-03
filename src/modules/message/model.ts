var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    priority: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const messageCollection = "message";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { messageSchema, messageCollection };
