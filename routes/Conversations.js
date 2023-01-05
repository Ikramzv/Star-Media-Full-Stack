const { Router } = require("express");
const Conversation = require("../models/Conversation");
const verify = require("./verify");

const router = Router();

// Create Conversation

router.post("/:id", verify, async (req, res) => {
  const { id } = req.params;
  const newConversation = new Conversation({
    members: [req.user.id, id],
  });

  try {
    const savedConv = await newConversation.save();
    res.status(200).send(savedConv);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get conversations

router.get("/", verify, async (req, res) => {
  try {
    const conversation = await Conversation.aggregate([
      {
        $match: {
          members: {
            $in: [req.user.id],
          },
        },
      },
      {
        $lookup: {
          from: "messages",
          let: {
            convId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [
                    { $toString: "$conversationId" },
                    { $toString: "$$convId" },
                  ],
                },
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 2,
            },
          ],
          as: "messages",
        },
      },
      {
        $addFields: {
          containsUnreadMessage: {
            $ifNull: [
              {
                $arrayElemAt: ["$messages", 0],
              },
              { read: true },
            ],
          },
        },
      },
      {
        $sort: {
          "containsUnreadMessage.createdAt": -1,
        },
      },
      {
        $project: {
          messages: 0,
          containsUnreadMessage: 0,
        },
      },
      {
        $lookup: {
          from: "users",
          let: {
            members: "$members",
          },
          pipeline: [
            {
              $set: {
                _id: {
                  $toString: "$_id",
                },
              },
            },
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $in: ["$_id", "$$members"],
                    },
                    {
                      $ne: ["$_id", req.user.id],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                password: 0,
                email: 0,
                followers: 0,
                followings: 0,
              },
            },
          ],
          as: "receiver",
        },
      },
      {
        $unwind: "$receiver",
      },
    ]);
    return res.status(200).json(conversation);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get single conversation
router.get("/:conversationId", verify, async (req, res) => {
  const { conversationId } = req.params;
  try {
    const conversation = await Conversation.findById(conversationId);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
