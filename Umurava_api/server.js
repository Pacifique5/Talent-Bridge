const app = require("./app"); // Use require instead of import
const { PORT } = require("./config/env");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
