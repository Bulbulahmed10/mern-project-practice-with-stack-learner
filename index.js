require("dotenv").config();
const app = require("./app/app");
PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
