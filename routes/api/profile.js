const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/ProfileModel");
const User = require("../../models/UserModel");
const { check, validationResult } = require("express-validator");
const config = require("config");
const request = require("request");

//get current user's profile, /api/profile/me, private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

//get all users GET /api/profile Public
router.get("/", async (req, res) => {
  try {
    let allProfiles = await Profile.find({}).populate("user", [
      "name",
      "avatar",
    ]);
    if (!allProfiles) {
      return res.status(401).json({ msg: "Database unreachable" });
    }
    res.json(allProfiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: "Server error",
    });
  }
});

//get user by userID GET /api/profile/user/:user_ID Public
router.get("/user/:userID", async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.userID,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(401).json({ msg: "Profile not found" });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId")
      return res.status(401).json({ msg: "Profile not found" });
    res.status(500).json({
      msg: "Server error",
    });
  }
});

//register a user, POST /api/profile, private

router.post(
  "/",
  [
    auth,
    check("status", "Status is required!").notEmpty(),
    check("skills", "Skills is required!").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      company,
      website,
      location,
      skills,
      bio,
      status,
      githubusername,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
    } = req.body;

    //Build the profile object for the profile schema, for making/updating profile

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());

    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    //Build the social object for schema
    profileFields.social = {};

    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (youtube) profileFields.social.youtube = youtube;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //create if not found

      profile = new Profile(profileFields);

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

router.delete("/", auth, async (req, res) => {
  try {
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });

    return res.json({ msg: "User removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Add Profile expererience, PUT /api/profile/experience, Private
router.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").notEmpty(),
    check("company", "Company is required").notEmpty(),
    check("from", "Starting Date is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      title,
      location,
      description,
      from,
      to,
      current,
    } = req.body;

    const newExp = {
      company,
      title,
      location,
      description,
      from,
      to,
      current,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

//delete experience, DELETE api/profile/experience/:expID, Private

router.delete("/experience/:expID", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    let expIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.expId);

    profile.experience.splice(expIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
  }
});

// Add Profile education, PUT /api/profile/education, Private
router.put(
  "/education",
  [
    auth,
    check("school", "School is required").notEmpty(),
    check("degree", "Degree is required").notEmpty(),
    check("fieldofstudy", "Field of study is required").notEmpty(),
    check("from", "Starting date is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      description,
      from,
      to,
      current,
    };

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

//delete education, DELETE api/profile/education/:eduID, Private

router.delete("/education/:eduID", auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    let eduIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.eduId);

    profile.education.splice(eduIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
  }
});

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "CLIENT_ID"
      )}&client_secret=${config.get("CLIENT_SECRET")}`,
      method: "GET",
      headers: { "user-agent": "node.js" },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error(error.message);
      }
      if (response.statusCode != 200) {
        res.status(404).json({ msg: "Github profile not found" });
      }

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
