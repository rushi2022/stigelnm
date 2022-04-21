const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.DATABASR_URL
mongoose
  .connect(url, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((e) => {
    console.log("Error" + e);
  });
