import app, { initDb } from './app.js';

const port = process.env.PORT || 3000;

initDb()
  .then(() => {
    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);
  });
