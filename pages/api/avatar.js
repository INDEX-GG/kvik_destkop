import multer from "multer"
import { PrismaClient } from '@prisma/client';

export const config = {
  api: {
    bodyParser: false,
  },
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/profile")
  },
  filename: function (req, file, cb) {
    req.name = ~~(Math.random() * 999999) +  "avatar-" + file.originalname;
   
    cb(null, req.name)
  },
})

var upload = multer({ storage: storage })


export default function handler(req, res) 
{
    if (req.method === 'POST')
     {
        const prisma = new PrismaClient();
        upload.array("image", 20)(req, {}, err => {
            // do error handling here
          //  console.log(req.files[0].originalname)
            async function main(namePhoto) 
            {   
                
                    var now = new Date()
                const obj = {
                    where:
                    {
                        id:34
                    },
                    data: {
                        photo:"/public/profile/"+namePhoto,
          
                    }
                }
                const allUsers = await prisma.users.update(obj);
            
                console.log(namePhoto)
            }
       
            main(req.name)
            .catch((e) => {
                console.log("error: " +e);
                throw e
            })
            .finally(async () => {
                await prisma.$disconnect()
            })
      
          })
        


    }
    else {
       return res.status(405).json({ message: 'method not allowed' })
    }
 }