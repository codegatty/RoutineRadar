const pg=require("pg");

const db=new pg.Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE

})

async function connectDb(){
    try{
        const client=await db.connect()
        try{

            await client.query("BEGIN") //begin transaction
            await client.query("CREATE TABLE IF NOT EXISTS badges(id SERIAL PRIMARY KEY,title VARCHAR(255) NOT NULL,description VARCHAR(255) NOT NULL,badgeNo NUMERIC(5) NOT NULL ,image TEXT )")
            await client.query("COMMIT") //end transaction
            console.log("connected to postgresql..")

        }catch(err){
            client.query("ROLLBACK")
        }finally{
            client.release()
        }

    }catch(e){
        console.log("something went wrong during connection")
    }
}

module.exports={connectDb,db}