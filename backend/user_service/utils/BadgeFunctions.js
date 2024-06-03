const User = require("../model/userModel");

//?profile related badge functions
const firstRoutineBadge = async (userId) => {
  const result = await User.findById(userId, {
    badges: 1,
    _id: 0,
  });
  const badgeNo = 2003;
  if (result) {
    badgeIndex = result.badges.findIndex((ele) => ele === badgeNo);
    if (badgeIndex === -1) {
      await User.findByIdAndUpdate(userId, {
        $push: { badges: badgeNo },
      });
    }
  }
};
const addExpBadge = async (userId) => {
  const result = await User.findById(userId, {
    experience: 1,
    badges: 1,
    _id: 0,
  });
  const badges = result.badges;
  const exp = result.experience;
  let badgeNo = -1;
  let badgeIndex = -1;
  if (exp >= 1000 && exp < 10000) {
    badgeNo = 2000;
    badgeIndex = badges.findIndex((ele) => ele === badgeNo);
  } else if (exp >= 10000 && exp < 100000) {
    badgeNo = 2001;
    badgeIndex = badges.findIndex((ele) => ele === badgeNo);
  } else if (exp >= 100000) {
    badgeNo = 2002;
    badgeIndex = badges.findIndex((ele) => ele === badgeNo);
  }

  if (badgeIndex === -1 && badgeNo !== -1) {
    

    await User.findByIdAndUpdate(userId, {
      $push: { badges: badgeNo },
    });
  }
};

//?routine related badge functions

module.exports = { addExpBadge, firstRoutineBadge };
