const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    username: { type: String, required: true },
    groupname: { type: String, required: true },
    members: [{ type: String }],
    createdAt: { type: Date, required: true }
});

module.exports = mongoose.model("Group", GroupSchema);
