const app = require('./index.cjs');

const PORT = process.env.API_PORT || 5000;
app.listen(PORT, () => console.log(`Local API listening on http://localhost:${PORT}`));
