import  express  from "express";
import z from "zod";
import bcrypt from "bcrypt"

const app = express() ;
app.use(express.json()) ;

app.get("/" , (req , res) => {

})

app.post("/signup" , (req , res) => {
  const {name , email , password} = req.body ;
  const data = {name , email , password} ;
  const user = z.object({
    name : z.string().min(3).max(20) ,
    email : z.string().email() ,
    password : z.string().min(6).max(20) 
  })
  const parseddata = user.parseAsync(data) ;
  if(user){
    console.log(user.check()) ;
    const hashedpassword = bcrypt.hashSync(password , 5) ;
    res.json({
      message : "done"
    })
  }

})

async function main () {
  const PORT = 3001 ;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`) ;
  })
}
main() ;