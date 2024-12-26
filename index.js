require("express-async-errors");
const express = require("express");
const app = express();
const { PORT } = require("./util/config");
const { connectToDatabase } = require("./util/db");

// Import Middleware
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// Import Routes
const blogRouter = require("./routes/blog");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const authorRouter = require("./routes/author");
const readingListsRouter = require("./routes/readingLists");

// Use Middleware
app.use(express.json());

// Use Routes
app.use("/api", authRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/authors", authorRouter);
app.use("/api/readinglists", readingListsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
