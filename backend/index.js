const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const stripe = require('stripe')(process.env.PAYMENT_SECRET);
var jwt = require('jsonwebtoken');
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

//verify token 
const verifyJWT  = (req , res, next) => {
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).send({message: ' Invalid Authorization'});

  }

  const token = authorization?.split(" ")[1];
  jwt.verify(token,process.env.ASSESS_SECRET,(err,decoded)=>{
    if(err) {
      return res.status(403).send({message: ' Forbidden Access '});

    }

    req.decoded = decoded;
    next();
  });
}

// MongoDB Connection
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yogawebsite.ujrabtx.mongodb.net/?retryWrites=true&w=majority&appName=YogaWebsite`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database, userCollection, classesCollection, paymentCollection, cartCollection, enrolledCollection, appliedCollection;

async function connectToMongoDB() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // DB creation and collections
    database = client.db('yoga-website');
    userCollection = database.collection('users');
    classesCollection = database.collection('classes');
    paymentCollection = database.collection('payment');
    cartCollection = database.collection('cart');
    enrolledCollection = database.collection('enrolled');
    appliedCollection = database.collection('applied');

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
}

connectToMongoDB();

//Routes for Users

//generate new token
app.post('/api/set-token', async (req, res) => {
  try {
    const User = req.body;
    const token = jwt.sign(User,process.env.ASSESS_SECRET , {
      expiresIn : '24h'
    });
    res.send({token});
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate new token' });
  }
});


//middleware for admin & instructor
const verifyAdmin = async (req, res, next) => {
  const email = req.decoded.email;
  const query = {email: email};
  const user = await userCollection.findOne(query);
  if(user.role === 'admin') {
    next();
  }
  else {
    res.status(401).send({ error: 'Forbidden Access' });

  }
}

const verifyInstructor = async (req, res, next) => {
  const email = req.decoded.email;
  const query = {email: email};
  const user = await userCollection.findOne(query);
  if(user.role === 'instructor') {
    next();
  }
  else {
    res.status(401).send({ error: 'UnAuthorized Access' });

  }
}

//create new user
app.post('/new-user', async (req, res) => {
  try {
    const newUser = req.body;
    const result = await userCollection.insertOne(newUser);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create new user' });
  }
});

//get  users
app.get('/users', async (req, res) => {
  try {

    const result = await userCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

//get user by  id 
app.get('/users/:id' , async (req,res) => {
  try {
  
    const id = req.params.id;
  
    const query = {_id : new ObjectId(id)};
    const result = await userCollection.findOne(query);
      
    res.send(result);
  
  } catch (error) {
  
    res.status(500).send({ error: 'Failed to fetch user by id' });
  
  }
    
  });

  //get user by  email 
app.get('/users/:email',verifyJWT, async (req,res) => {
  try {
  
    const email = req.params.email;
  
    const query = {email : email};
    const result = await userCollection.find(query);
      
    res.send(result);
  
  } catch (error) {
  
    res.status(500).send({ error: 'Failed to fetch user by email' });
  
  }
    
  });

  //delete user  by id
app.delete('/delete-user/:id',verifyJWT,verifyAdmin, async (req,res)=> {
  try {

    const id = req.params.id;
   
    const query = {_id : new ObjectId(id)};
  

    const result = await userCollection.deleteOne(query);


    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete user  by id' });

  }

});


//update user details
app.put('/update-user/:id', verifyJWT,verifyAdmin ,async (req,res)=> {
  try {

    const id = req.params.id;
    const updateUser = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = { upsert:true};
    const updateDoc = {
      $set : {
       
       
        name: updateUser.name,
        email: updateUser.email,
        role: updateUser.option,
        address : updateUser.address,
        photoUrl: updateUser.photoUrl,
        skills: updateUser.skills ? updateUser.skills : null,
      
   
      }
    }


   
    const result = await userCollection.updateOne(filter,updateDoc,options);
      
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to update user details' });

  }

});






// classes routings !----
app.post('/new-class',verifyJWT,verifyInstructor, async (req, res) => {
  try {
    const newClass = req.body;
    newClass.availableSeats = parseInt(newClass.availableSeats);
    const result = await classesCollection.insertOne(newClass);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create new class' });
  }
});

app.get('/classes', async (req, res) => {
  try {
    const query = { status: 'approved' };
    const result = await classesCollection.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch classes' });
  }
});


//get classes by constructor email 
app.get('/classes/:email' ,verifyJWT,verifyInstructor, async (req,res) => {
try {

  const email = req.params.email;

  const query = {instructorEmail : email};
  const result = await classesCollection.find(query).toArray();
    
  res.send(result);

} catch (error) {

  res.status(500).send({ error: 'Failed to fetch classes by instructorEmail' });

}
  
});


//manage classes
app.get('/classes-manage', async(req,res)=>{

  const result = await classesCollection.find().toArray();
  res.send(result);
});

//update classes status and reason
app.patch('/change-status/:id',verifyJWT,verifyAdmin, async (req,res)=> {
  try {

    const id = req.params.id;
    const { status, reason } = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = {upsert: true};
    const updateDoc = {

      $set: {
        status: status,
        reason: reason,
      },

    };
 
    const result = await classesCollection.updateOne(filter,updateDoc,options);
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to update classes' });

  }

});

//get approved classes
app.get('/approved-classes', async (req,res)=> {
  try {

    const query = {status : 'approved'};
    const result = await classesCollection.find(query).toArray();
      
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get approved classes' });

  }

});


//get single class details
app.get('/class/:id', async (req,res)=> {
  try {

    const id = req.params.id;

    const query = {_id : new ObjectId(id)};
    const result = await classesCollection.findOne(query);
      
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get single class details' });

  }

});

//update class details
app.put('/update-class/:id',verifyJWT,verifyInstructor, async (req,res)=> {
  try {

    const id = req.params.id;
    const updateClass = req.body;
    const filter = {_id: new ObjectId(id)};
    const options = { upsert:true};
    const updateDoc = {
      $set : {
       
       
        name: updateClass.name,
        image: updateClass.image,
        availableSeats: parseInt(updateClass.price),
        price: updateClass.price,
        videoLink: updateClass.videoLink,
        description: "pending",
   
      }
    }


   
    const result = await classesCollection.updateOne(filter,updateDoc,options);
      
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to update class details' });

  }

});


// Cart routings !----

//add to cart 
app.post('/add-to-cart',verifyJWT ,async (req, res) =>{

  try {
    const newCartItem = req.body;
    const result = await cartCollection.insertOne(newCartItem);
    res.send(result);

    
  } catch (error) {
    res.status(500).send({ error: 'Failed to add to cart' });

  }
});

//get cart item by id 
app.get('/cart-item/:id',verifyJWT ,async (req,res)=> {
  try {

    const id = req.params.id;
    const  email = req.body.email;


    const query = {
      classId : id,
      email : email

    };
    const projection = { _id: 1, name: 1, classId: 1, email: 1 };

    const result = await cartCollection.findOne(query, {projection});
      
    //res.send(result);
    if (!result) {
      console.log('No matching document found');
      res.status(404).send({ error: 'No matching document found' });
    } else {
      console.log('Found document:', result);
      res.send(result);
    }
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get cart item by id ' });

  }

});


//get cart info by email -- to be edited
app.get('/cart/:email',verifyJWT, async (req,res)=> {
  try {

    const email = req.params.email;
    console.log('Received email:', email); 
    const query = {email: email};
    const projection = {  name: 1, classId: 1, email: 1 };
    const cartsCursor = await cartCollection.find(query, { projection });
    const carts = await cartsCursor.toArray(); 

    console.log('Carts found:', carts); // debug
    const classIds = carts.map((cart) => new ObjectId(cart.classId));
    console.log('Class IDs:', classIds); // debug
    const query2 = { _id: { $in: classIds } };

    const result = await classesCollection.find(query2).toArray(); // Fetch multiple documents
    console.log('Classes found:', result); // Debugging line

    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get cart info by email' });

  }

});

//delete cart  by id
app.delete('/delete-cart/:id',verifyJWT, async (req,res)=> {
  try {

    const id = req.params.id;
   
    const query = {classId: id};
  

    const result = await cartCollection.deleteOne(query);


    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete cart  by id' });

  }

});


// PAYMENT routings !----

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

// coming back to payment routes


//Enrollment Routes !--

//get popular classes
app.get('/popular_classes', async (req,res)=> {
  try {


    const result = await classesCollection.find().sort({totalEnrolled: -1}).limit(6).toArray();
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get popular classes' });

  }

});

//get popular instructors
app.get('/popular_instructors', async (req,res)=> {
  try {

      
      const pipeline = [
        {
          $group : {
            _id: "$instructorEmail",
            totalEnrolled : {$sum: "$totalEnrolled"}

          }
        },
        {
        $lookup: {
          from : "users",
          localField: "_id",
          foreignField : "email",
          as : "instructor"

        }
      },
      {
        $match: {
          'instructor.role' : "instructor"
        }
      },
        {
          $project: {
            _id : 0,
            instructor : {
              $arrayElemAt : ["$instructor", 0]
            },
            totalEnrolled: 1
          }


        },
        {
          $sort: {
            totalEnrolled: -1
          }
        },
        {
          $limit : 6
        }
      
      ];

    const result = await classesCollection.aggregate(pipeline).toArray();
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get popular instructors' });

  }

});

// get admin status
app.get('/admin-stats',verifyJWT,verifyAdmin, async (req,res)=> {
  try {

    const approvedClasses = (await classesCollection.find({status: 'approved'}).toArray()).length;
    const pendingClasses = (await classesCollection.find({status: 'pending'}).toArray()).length;
    const instructors = (await userCollection.find({role: 'instructor'}).toArray()).length;
    const totalClasses = (await classesCollection.find().toArray()).length;
    const totalEnrolled = (await enrolledCollection.find().toArray()).length;


    const result ={
      approvedClasses,
      pendingClasses,
      instructors,
      totalClasses,
      totalEnrolled,
    }
    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get admin  status' });

  }

});

//get all instructors 
app.get('/instructors', async (req,res)=> {
  try {

   
    const result = (await userCollection.find({role: 'instructor'}).toArray());

    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get all instructors ' });

  }

});


//get enrolled classes 
app.get('/enrolled-classes/:email',verifyJWT, async (req,res)=> {
  try {

    const email = req.params.email;
    const query = {userEmail : email};

    const pipeline = [
      {
        $match :  query
      },
      {
      $lookup: {
        from : "classes",
        localField: "classesId",
        foreignField : "_id",
        as : "classes"

      }
    },
    {
      $unwind: "$classes"
    },
    {
      $lookup: {
        from : "users",
        localField: "classes.instructorEmail",
        foreignField : "email",
        as : "instructor"

      }
    },
      {
        $project: {
          _id : 0,
          instructor : {
            $arrayElemAt : ["$instructor", 0]
          },
          classes: 1
        }


      },
  
  
  
    ];

   



    const result = await enrolledCollection.aggregate(pipeline).toArray();

    res.send(result);
   
    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get enrolled classes ' });

  }

});

//applied for instructors 
app.post('/ass-instructor', async (req, res) =>{

  try {
    const data = req.body;

    const result = await appliedCollection.insertOne(data);
    res.send(result);

    
  } catch (error) {
    res.status(500).send({ error: 'Failed to applied for instructors' });

  }
});

//get  applied  instructors 
app.post('/applied-instructors/:email', async (req, res) =>{

  try {
    const email = req.params.email;


    const result = await appliedCollection.findtOne(email);
    res.send(result);

    
  } catch (error) {
    res.status(500).send({ error: 'Failed to get  applied  instructors ' });

  }
});
































app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing MongoDB client');
  await client.close();
  process.exit(0);
});


//32:54 / 3:43:50

//bahaaisl566

//Z8fHwj21sVGGZc85
//Z8fHwj21sVGGZc85

