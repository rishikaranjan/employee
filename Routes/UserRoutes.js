import express from "express";
import User from '../Models/UserModel.js'



const userRouter = express.Router();




//Dashboard 

userRouter.get(
  '/summary',
  async(req, res) => {

    try {

      const users = await User.aggregate([

        { 
          $group : { 
            _id : null, 
            numUsers : { $sum : 1 } 
          } 
        }

      ]);


      const ageCategories = await User.aggregate([

        {
          "$group": {
              "_id": {
                  "$concat": [
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 18] }, { "$lt": ["$age", 25] } ]}, "18 - 25", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 26] }, { "$lt": ["$age", 30] } ]}, "26 - 30", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 31] }, { "$lt": ["$age", 35] } ]}, "31 - 35", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 36] }, { "$lt": ["$age", 40] } ]}, "36 - 40", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 41] }, { "$lt": ["$age", 45] } ]}, "41 - 45", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 46] }, { "$lt": ["$age", 50] } ]}, "46 - 50", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 51] }, { "$lt": ["$age", 55] } ]}, "51 - 55", ""] },
                      { "$cond": [ { "$and": [ { "$gte": ["$age", 56] }, { "$lt": ["$age", 60] } ]}, "56 - 60", ""] },
                      { "$cond": [ { "$gte": [ "$age", 61 ] }, "Over 60", ""] }
                  ]
              },
              "countAge": { "$sum": 1 }
          }
      },
        
     

    ]);



      // const ageCategories = await User.aggregate([ 
      //   {
      //     $group: {
      //       _id: '$age',
      //       countAge: { $sum: 1 },
      //     },
      //   },
      // ]);


      const departmentCategories = await User.aggregate([
        {
          $group: {
            _id: '$department',
            countDepartment: { $sum: 1 },
          },
        },
      ]);


      const statusCategories = await User.aggregate([
        {
          $group: {
            _id: '$status',
            countStatus: { $sum: 1 },
          },
        },
      ]);

    

      res.send({users, ageCategories, departmentCategories, statusCategories});

    }

    catch(err) {
      console.log(err);
    }

  }
);




//Get all users

userRouter.get(
  '/',

  async (req, res) => {

    try {

        const users = await User.find({});

        res.send(users);

    }

    catch(err) {
        console.log(err);
    }

  }
);



//Create a new user

userRouter.post(
    '/',
    async (req, res) => {
  
      try {
  
          const newUser = new User({
            name: req.body.name,
            completeAddress: req.body.completeAddress,
            age: req.body.age,
            department: req.body.department,
            status: req.body.status
          });

          const user = await newUser.save();


          res.send({
            message: 'New employee created', user
          });

      }
  
      catch (err) {
          console.log(err);
      }
  
    }
  );


  

//Get a specific user

userRouter.get(
  '/:id',
  async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if(user) {
        res.send(user);
        }

        else {
        res.status(404).send({message: 'User not found'});
        }

    }

    catch (err) {
        console.log(err);
    }

  }
);






//Update a specific user

userRouter.put(
  '/:id',

  async(req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if(user) {

        user.name = req.body.name || user.name;
        user.completeAddress = req.body.completeAddress || user.completeAddress;
        user.age = req.body.age || user.age;
        user.department = req.body.department || user.department;
        user.status = req.body.status || user.status;

        const updatedUser = await user.save();

        res.send({message: 'User updated', user: updatedUser});

        }

        else {

        res.status(404).send({message: 'User not found'});

        }

   
    }
    
    catch (err) {
        console.log(err);
    }

  }
);


//Delete specific users

userRouter.delete(
  '/:id',

  async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (user) {
    
          //await user.remove();
          await user.deleteOne();
    
          res.send({message: 'User is deleted'});
    
        }
    
        else {
    
          res.status(404).send({message: 'User not found'});
    
        }

   
    }

    catch (err) {
        console.log(err);
    }

  }

);





export default userRouter;