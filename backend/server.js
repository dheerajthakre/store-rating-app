require("dotenv").config();
const app = require("./app");
require("./db");

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
