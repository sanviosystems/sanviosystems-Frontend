import mongoose from "mongoose";

// ... other imports ...

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://sanvio-finel:sanvio-finel110@cluster0.kgpqv7y.mongodb.net/pos-system?retryWrites=true&w=majority'
    );
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  }
};

// Call connectDB before starting the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at https://sanviosystem-backend-nsfy.onrender.com`);
  });
});