/* eslint-disable no-param-reassign, no-console */
import mongoose, { Schema } from 'mongoose';
import MongodbMemoryServer from 'mongodb-memory-server';

mongoose.Promise = Promise;

const mongoServer = new MongodbMemoryServer();

mongoServer.getConnectionString().then((mongoUri) => {
  mongoose.connect(mongoUri);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri);
    } else {
      throw e;
    }
  });

  mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

export {
  mongoose,
  Schema,
};
