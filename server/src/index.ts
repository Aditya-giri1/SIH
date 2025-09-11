import  express  from "express";
import {WebSocketServer , WebSocket} from "ws";
import z, { any, string } from "zod";
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import {userModel} from "./db"
import  jwt  from "jsonwebtoken";
import "dotenv/config"

const app = express() ;
const wss = new WebSocketServer({port : 8080}) ;
app.use(express.json()) ;

app.get("/" , (req , res) => {

})

app.post("/signup" , async (req , res) => {
  const {name , password , email} = req.body ;
  const inputcheck = z.object({
    name : z.string().min(5) ,
    password : z.string().min(6).max(15) ,
    email : z.string().email()
  })
  console.log("hello")
  const finalcheck = inputcheck.safeParse(req.body) ;
  console.log(finalcheck) ;
  if (finalcheck.success){

    const hashedpassword = bcrypt.hashSync(password , 5) ;
    await userModel.create({
      name : name ,
      password : hashedpassword ,
      email : email 
    })
    res.json({
      message : "Account Created Successfully"
    })
  }
  else if (finalcheck.error) {
    res.json({
      message : finalcheck.error
    })
  }
})

app.post('/signin' , async(req , res) => {
  const {email , password} = req.body ;
  const response: any = await userModel.findOne({
    email : email 
  })
  if (!response){
    return res.json({
      message : "No User found"
    })
  }
  const userId = JSON.stringify(response._id) ;
  const hashedpassword = bcrypt.compareSync(password , response.password) ;
  if (hashedpassword){
    const token = jwt.sign(userId , process.env.JWT_SECRET as string) ;
    res.json({
      token : token ,
      message : "You are logedin"
    })
  }
   else{
      res.json({
        message : "incorrect username or password"
      })
    }
})

interface websocketprops extends WebSocket {
  email : string
}

let peerRoom: any = [] ;
let allSocket: any = [] ;
let allRooms : any = {} ;

wss.on('connection', function connection(ws : websocketprops) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const finaldata = data.toString() ;
    const response = JSON.parse(finaldata) ;

    ws.email = response.email ;
    allSocket.push(ws) ;

    if (response.type == "join"){
      ws.email = response.payload.email ; 
      peerRoom.push(ws) ;
    }

    if (response.type == "chat"){
      const userfound =  peerRoom.map((socket : websocketprops) => socket.email == ws.email) ;
      if (userfound){
        peerRoom.forEach((socket : websocketprops) => {
        if (socket.readyState == 1){
          socket.send(response.payload.message) ;
        }
      })
      }
    }

    if (response.type == "exit"){
      peerRoom = peerRoom.filter((socket: websocketprops) => socket.email !== ws.email);
    }

     if (response.type === "private_chat") {
      const { recipientEmail, message } = response.payload;

      const recipientWs = allSocket.find((socket: websocketprops) => socket.email === recipientEmail);

      if (recipientWs) {
        recipientWs.send(JSON.stringify({
          type: 'private_chat',
          payload: {
            senderEmail: ws.email,
            message
          }
        }));
      }
    }

    if (response.type == "private_chat"){
      const {from , to} = response.payload ;

      const roomId = [from , to].sort().join("_") ;

      if (!allRooms[roomId]) {
       allRooms[roomId] = [];
      }

      if (!allRooms[roomId].includes(ws)){
        allRooms[roomId].push(ws) ; 
      }

      const recipientWs = allSocket.find((socket: websocketprops) => socket.email === to);

      if (!allRooms[roomId].includes(recipientWs)) {
        allRooms[roomId].push(recipientWs) ;
      }

        allRooms[roomId].forEach((client : websocketprops) => {
        client.send(
        JSON.stringify({
        type: "chat_created",
        roomId,
        participants: [from, to],
      })
    );
  }) ;
      
    }

    if (response.type === "private_msg") {
      const { roomId, message, sender } = response.payload;
      if (allRooms[roomId]) {
        allRooms[roomId].forEach((client : websocketprops) => {
          client.send(JSON.stringify({
            type: "message",
            roomId,
            sender,
            message
          }));
        });
      }
    }

  });

});

async function main () {
  const PORT = 3001 ;
  const MONGO_URl = process.env.MONGO_URL as string ;
  await mongoose.connect(MONGO_URl) ;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`) ;
  })
}
main() ;