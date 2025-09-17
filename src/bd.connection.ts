import mongoose from 'mongoose';

async function Connection() {
  try {
    await mongoose
      .connect('mongodb://127.0.0.1:27017/crud-nestjs')
      .then(() => console.log('Conexion exitosa'));
  } catch (err) {
    console.log('Error', err);
  }
}

export default Connection;
