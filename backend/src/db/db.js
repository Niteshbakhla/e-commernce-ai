import mongoose from "mongoose";
import config from "../config/config.js";

export const connectDB = async () => {
            try {
                        const connect = await mongoose.connect(config.MONGO_URI);
                        if (connect.ConnectionStates.connected) {
                                    console.log("Database is connected!✅")
                        } else if (connect.ConnectionStates.disconnected) {
                                    console.log("Database is disconnected!❌")
                        } else {
                                    console.log("Database is not connected!")
                        }
            } catch (error) {
                        console.log(error)
            }
}

export default connectDB;