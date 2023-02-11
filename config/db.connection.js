import mongoose from "mongoose";

const MONGODB_URI = 'mongodb://localhost/to-do-lis-dev'

const connectDB = async () => {
    const connection = await mongoose.connect(MONGODB_URI)
    console.log('Conectado ao mongo! Database name: ', connection.connections[0].name)
}

export default connectDB

