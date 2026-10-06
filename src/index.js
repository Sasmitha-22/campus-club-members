const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const memberSchema = new mongoose.Schema({
    memberId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    }
});

const Member = mongoose.model("Member", memberSchema);

app.post("/submit", async (req, res) => {
    try {
        const member = new Member({
            memberId: req.body.memberId,
            name: req.body.memberName,
            email: req.body.memberEmail,
            department: req.body.department,
            club: req.body.club
        });

        await member.save();

        res.redirect("/?success=true");

    } catch (error) {
        console.error("Error saving member:", error);

        res.status(500).send("Error while saving member details.");
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});