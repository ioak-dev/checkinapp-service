var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const participantSchema = new Schema(
  {
    participantId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    eventId: { type: String },
    email: { type: String },
    telephone: { type: String },
    birthDate: { type: Date },
  },
  { timestamps: true }
);

const participantCollection = "participant";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { participantSchema, participantCollection };
