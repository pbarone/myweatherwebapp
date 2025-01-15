import mongoose from "mongoose";

let isConnect = false;

export const connectToDB = async () => {

    mongoose.set("strictQuery", true);
    console.log("connecting to mobgodb");

    if (isConnect) {
        console.log("Already connected to MongoDB");
        return
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONDODB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnect = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message);
    }
};
