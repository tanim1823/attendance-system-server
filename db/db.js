const mongoose = require("mongoose");

const connectDb = (connectionString) => {
  return mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 1000,
  });
};

module.exports = connectDb;

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
// });
// const User = mongoose.model("User", userSchema);
// const createUser = async (data) => {
//   const user = new User({ ...data });
//   await user.save();
//   return user;
// };

// mongoose
//   .connect("mongodb://127.0.0.1:27017/test", {
//     serverSelectionTimeoutMS: 1000,
//   })
//   .then(async () => {
//     console.log(`Database connected`);
//     const user = await createUser({
//       name: "tanim 2",
//       email: "tanim@test.com",
//     });
//     console.log(user);
//     await mongoose.connection.close();
//   })
//   .catch((e) => {
//     console.log("Error Occured in mongodb ", e);
//   });
