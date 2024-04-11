const express = require("express");

const router = express.Router();
const Group = require("../models/Group");
const authenticate = require("../middleware/authenticate");
const config = require("../config");

router.get("/list", authenticate, async (req, res) => {
    try {
      const { username } = req.query;
      const groupList = await Group.find({ username });
  
      res.status(200).json(groupList);
    } catch (error) {
      console.error("Error fetching group list:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = router;

router.post("/submit", authenticate, async (req, res) => {
  const {
    username, groupname, members
  } = req.body;


  if (!username || !groupname || !members) {
    return res.status(400).json({ message: "Please provide group name and members" });
  }

  try {
    const dateNow = new Date();
    const transaction = await Group.create({
      username,
      groupname,
      members,
      createdAt: dateNow
    });

    res.status(200).json({ message: "Group submitted successfully", transaction });
  } catch (error) {
    console.error("Error submitting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  return false;
});