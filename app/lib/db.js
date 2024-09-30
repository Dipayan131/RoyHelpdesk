import mongoose from 'mongoose';
export const apiKey = `mongodb+srv://${process.env.NEXT_PUBLIC_USERNAME}:${process.env.NEXT_PUBLIC_PASSWORD}@cluster0.lipdsuk.mongodb.net/helpdesk?retryWrites=true&w=majority&appName=Cluster0`
console.log(process.env.NEXT_PUBLIC_USERNAME);
if (!apiKey) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(apiKey, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}
