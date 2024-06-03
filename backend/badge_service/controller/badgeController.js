const { db } = require("../config/dbConfig");
const asyncHandler = require("express-async-handler");

const getAllBadges = asyncHandler(async (req, res) => {
  const query = `SELECT * FROM badges`;
  const result = await db.query(query);

  return res.json(result.rows);
});

const getBadgeByBadgeNo = asyncHandler(async (req, res) => {
  const badgeNo = req.params.badgeNo;

  const query = `SELECT * FROM badges WHERE badgeno=$1`;
  const result = await db.query(query, [badgeNo]);

  if(result.rows.length <= 0) {
    return res.json({message:"does not exist"});
  }

  return res.json(result.rows);
});


const getBadgeByBadgeNos = asyncHandler(async (req, res) => {
  const ids = req.query.ids.split(',').map(Number);
  
  try {
    const promises = ids.map(async (id) => {
      const result = await db.query("SELECT * FROM badges WHERE badgeno = $1", [id]);
      return result.rows[0];
    });

    const finalResult = await Promise.all(promises);
    return res.status(200).json( finalResult );
  } catch (error) {
    console.error('Error fetching badges:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const createBadge = asyncHandler(async (req, res) => {
  const { title, description, badgeno,image } = req.body;

  if (!title || !description || !badgeno || !image) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  const query1 = `SELECT FROM badges WHERE badgeno=$1`;
  const badge = await db.query(query1, [badgeno]);

  if (badge.rowCount) {
    return res.status(400).json({ message: "badge already exists" });
  }

  const query2 = `INSERT INTO badges(title,description,badgeno,image) VALUES($1,$2,$3,$4) RETURNING *;`;
  const result = await db.query(query2, [title, description, badgeno,image]);
  if(!result.rows[0]){
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.send(result.rows[0]);
});

const updateBadge = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { title, description, badgeno,image } = req.body;

  if (!title || !description || !badgeno) {
    return res.status(400).json({ message: "please fill all fields" });
  }
  const query1 = `SELECT FROM badges WHERE id=$1`;
  const badge = await db.query(query1, [id]);
  
  if (!badge.rows[0]) {
    return res.status(400).json({ message: "badge does not exist" });
  }

  const query2 = `
    UPDATE 
        badges 
    SET 
        title=$1,description=$2,badgeno=$3,image=$4
    WHERE 
        id=$5
    RETURNING *;`;

  const result = await db.query(query2, [title, description, badgeno, image,id]);
  
  if(!result.rows[0]){
    return res.status(400).json({ message: "something went wrong" });
  }
  return res.json(result.rows[0]);
});

const deleteBadge = asyncHandler(async (req, res) => {
    const id=req.params.id;

    const query1 = `SELECT FROM badges WHERE id=$1`;
    const badge = await db.query(query1, [id]);
  
    if (!badge) {
      return res.status(400).json({ message: "badge does not exist" });
    }

    const query=`DELETE FROM 
            badges
        WHERE
            id=$1
        RETURNING *;`;
    const result=await db.query(query,[id])

    return res.json(result.rows[0]);
});


module.exports = {createBadge,updateBadge,getAllBadges,getBadgeByBadgeNo,deleteBadge,getBadgeByBadgeNos}

