var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const checkinSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    eventId: { type: String },
    email: { type: String },
    telephone: { type: String },
    birthDate: { type: Date },
  },
  { timestamps: true }
);

const checkinCollection = "checkin";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { checkinSchema, checkinCollection };
