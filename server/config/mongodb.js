import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    await mongoose.connect(`${process.env.MONGO_URI}/lms`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
export default connectDB;
