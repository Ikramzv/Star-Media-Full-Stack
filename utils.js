const post_aggregate = (currentUser, req, since, additional) => {
  let inOrNin = "$in";
  if (additional) inOrNin = "$nin";
  return [
    {
      $match: {
        userId: {
          [inOrNin]: [...currentUser?.followings, req.user.id],
        },
        createdAt: {
          $lt: since,
        },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: 5,
    },
    {
      $addFields: {
        convertedUserId: { $toObjectId: "$userId" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "convertedUserId",
        foreignField: "_id",
        as: "user",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              email: 1,
              userProfileImage: 1,
              city: 1,
              from: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        convertedUserId: 0,
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: false,
      },
    },
  ];
};

module.exports = {
  post_aggregate,
};
