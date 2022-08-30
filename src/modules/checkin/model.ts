var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const checkinSchema = new Schema(
  {
    trackId: { type: String },
    participantId: { type: String },
    eventId: { type: String },
    register: { type: Date },
    from: { type: Date },
    to: { type: Date },
  },
  { timestamps: true }
);

const checkinCollection = "checkin";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { checkinSchema, checkinCollection };
