var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    registrationFrom: { type: Date },
    registrationTo: { type: Date },
    eventFrom: { type: Date },
    venueTitle: { type: String },
    venueDescription: { type: String },
    notification: { type: String },
    code: { type: Number },
    media: { type: String },
    support: { type: String },
    group: { type: String },
    registerDeclaration: { type: String },
    checkinDeclaration: { type: String },
    home: { type: String },
    adminKey: { type: String },
    customFields: { type: Object },
    dresscode: { type: String },
  },
  { timestamps: true }
);

const eventCollection = "event";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { eventSchema, eventCollection };
