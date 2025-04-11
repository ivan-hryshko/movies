import app from './src/app';
const port = 8050;

app.listen(port, () => {
  console.log(`Movies app listening at http://localhost:${port}`);
});