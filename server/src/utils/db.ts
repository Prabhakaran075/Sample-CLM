import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.error('MONGO_URI is not defined in the environment variables.');
      // FIX: Cast process to 'any' to resolve TypeScript error: Property 'exit' does not exist on type 'Process'.
      (process as any).exit(1);
    }
    
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // FIX: Cast process to 'any' to resolve TypeScript error: Property 'exit' does not exist on type 'Process'.
    (process as any).exit(1); // Exit process with failure
  }
};

export default connectDB;