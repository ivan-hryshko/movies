import app from './app';
import sequelize from './config/database';

const port = 8050;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');

    await sequelize.sync({ force: false });
    console.log('Models synchronized.');

    app.listen(port, () => {
      console.log(`Movies app listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();