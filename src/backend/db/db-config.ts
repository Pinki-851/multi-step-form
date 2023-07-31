import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
export function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    // console.log('connection', connection);
    connection.on('connected', () => {
      console.log('Mongodb connected successfully');
      connection.on('error', err => {
        console.log('mongo conection failed', err);
        process.exit();
      });
    });
  } catch (error) {
    console.log('somthing went worng on db-connection', error);
  }
}
