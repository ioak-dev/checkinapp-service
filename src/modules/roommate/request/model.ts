var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const roommateRequestSchema = new Schema(
  {
    from: { type: String },
    to: { type: String },
    text: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const roommateRequestCollection = "roommate.request";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { roommateRequestSchema, roommateRequestCollection };
