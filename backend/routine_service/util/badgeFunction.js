const Routine = require("../model/routineModel");
const asyncHandler=require('express-async-handler')
const addDaysBadges = asyncHandler(async (routine) => {
  const createdDate = new Date(routine[0].createdAt);
  const diff = Date.now() - createdDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  let badges = routine[0].badges;

  let badgeNo = 1000;
  let badgeIndex1 = badges.findIndex((ele) => ele === badgeNo);
  badgeNo = 1001;
  let badgeIndex2 = badges.findIndex((ele) => ele === badgeNo);
  badgeNo = 1002;
  let badgeIndex3 = badges.findIndex((ele) => ele === badgeNo);

  if (badgeIndex1 === -1 && days >= 10) {
    await Routine.findByIdAndUpdate(routine[0].userId, {
      $push: { badges: 1000 },
    });
  }

  if (badgeIndex2 === -1 && days >= 20) {
    await Routine.findByIdAndUpdate(routine._id, {
      $push: { badges: 1001 },
    });
  }

  if (badgeIndex3 === -1 && days >= 30) {
    await Routine.findByIdAndUpdate(routine._id, {
      $push: { badges: 1002 },
    });
  }
});

const addScoreBadges=asyncHandler(async(routine)=>{
  const currentScore=routine[0].score;
  const badges=routine[0].badges
  
  let badgeNo = 1003;
  let badgeIndex1 = badges.findIndex((ele) => ele === badgeNo);
  badgeNo = 1004;
  let badgeIndex2 = badges.findIndex((ele) => ele === badgeNo);
  let result=null

  if(currentScore>=100 && currentScore<1000 &&badgeIndex1==-1 ){
    result=await Routine.findByIdAndUpdate(routine[0]._id, {
      $push: { badges: 1003 },
    },{new:true});

  }else if(currentScore>=1000 && badgeIndex2==-1){
    result=await Routine.findByIdAndUpdate(routine[0]._id, {
      $push: { badges: 1004 },
    },{new:true});
  }

  return result
})

module.exports = { addDaysBadges,addScoreBadges };
