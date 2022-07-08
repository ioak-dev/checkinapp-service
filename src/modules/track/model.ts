var mongoose = require("mongoose");

const Schema = mongoose.Schema;
const trackSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    eventId: { type: String },
    icon: { type: String },
    from: { type: Object },
    to: { type: Object },
  },
  { timestamps: true }
);

const trackCollection = "track";

// module.exports = mongoose.model('bookmarks', articleSchema);
export { trackSchema, trackCollection };
