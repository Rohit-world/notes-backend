const { NoteModel } = require("../models/note.model");
const express = require("express");
const { Authentication } = require("../middlewares/authentication");
const NoteRoute = express.Router();

NoteRoute.use(Authentication);

//get all notes//------------------------------------------------------------
NoteRoute.get("/", async (req, res) => {
  const Notes = await NoteModel.find({ userID: req.body.userID });
  res.send(Notes);
});

//get particular note with ID//------------------------------------------------------------
NoteRoute.get("/:NoteID", async (req, res) => {
const ID = req.params?.NoteID;
if (!ID) return res.send({ msg: "ID Invalid" });
  const Note = await NoteModel.findOne({ userID: req.body.userID,_id:ID });
 res.send(Note);

  });
//post note//------------------------------------------------------------
NoteRoute.post("/", async (req, res) => {
  const newNote = new NoteModel(req.body);
  await newNote.save();
  res.send({ msg: "Note Added Successfully" });
});

//delete note//------------------------------------------------------------
NoteRoute.delete("/:NoteID", async (req, res) => {
  const ID = req.params?.NoteID;
  if (!ID) return res.send({ msg: "ID Invalid" });
  try {
    const note = await NoteModel.findById(ID);
    if (!note) return res.send({ msg: "Not authorised" });
    if (ID != note._id || note.userID != req.body.userID)
      return res.send({ msg: "Not authorised" });
    await NoteModel.findByIdAndDelete(ID);
    res.send({ msg: "Note deleted Successfully" });
  } catch (err) {
    return res.send({ msg: "ID Invalid" });
  }
});
//--------------------------------------patch------------------------------//
NoteRoute.patch("/:NoteID", async (req, res) => {
  const ID = req.params?.NoteID;
  if (!ID) return res.send({ msg: "ID Invalid" });
  try {
    const note = await NoteModel.findById(ID);
    if (!note) return res.send({ msg: "Not authorised" });
    if (ID != note._id || note.userID != req.body.userID)
      return res.send({ msg: "Not authorised" });
    await NoteModel.findByIdAndUpdate(ID,req.body);
    res.send({ msg: "Note Updated Successfully" });
  } catch (err) {
    return res.send({ msg: "ID Invalid" });
  }
});
//--------------------------------------patch------------------------------//
NoteRoute.put("/:NoteID", async (req, res) => {
    const ID = req.params?.NoteID;
    if (!ID) return res.send({ msg: "ID Invalid" });
    try {
      const note = await NoteModel.findById(ID);
      if (!note) return res.send({ msg: "Not authorised" });
      if (ID != note._id || note.userID != req.body.userID)
        return res.send({ msg: "Not authorised" });
      await NoteModel.findByIdAndUpdate(ID,req.body);
      res.send({ msg: "Note Updated Successfully" });
    } catch (err) {
      return res.send({ msg: "ID Invalid" });
    }
});
module.exports = { NoteRoute };
