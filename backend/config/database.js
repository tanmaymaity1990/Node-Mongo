const mongoose = require('mongoose');


mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB database connection established successfully");
})
.catch((err) => {
    console.log("Could not connect to Mongodb", err);
}) 