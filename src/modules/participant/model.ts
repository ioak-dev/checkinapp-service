var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const participantSchema = new Schema(
  {
    referenceId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    eventId: { type: String },
    email: { type: String },
    telephone: { type: String },
    room: { type: String },
    groups: { type: Array },
    birthDate: { type: Date },
    joiningDate: { type: Date },
    practice: { type: String },
    food: { type: String },
    drink: { type: String },
    sports: { type: String },
    travelMode: { type: String },
    flightNoIn: { type: String },
    startBaseIn: { type: Date },
    landBaseIn: { type: Date },
    flightNoOut: { type: String },
    startBaseOut: { type: Date },
    landBaseOut: { type: Date },
  },
  { timestamps: true }
);

const participantCollection = "participant";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { participantSchema, participantCollection };
