import express from "express";
import config from "config";
import path from "path";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import friendsRouter from "./routes/friends.js";
import postsRouter from "./routes/posts.js";
import newsRouter from "./routes/news.js";
import musicRouter from "./routes/music.js";
import messageRouter from "./routes/messages.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import filePathMiddleware from "./middleware/filePathMiddleware.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { getMessagesService } from "./services/getMessagesService.js";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || config.get("port");
const __dirname = path.resolve();

app.use(fileUpload({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(filePathMiddleware(path.join(__dirname, "client", "build")));
}
if (process.env.NODE_ENV === "development") {
  app.use(filePathMiddleware(path.join(__dirname, "static")));
}

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/users", usersRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/posts", postsRouter);
app.use("/api/news", newsRouter);
app.use("/api/music", musicRouter);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

if (process.env.NODE_ENV === "development") {
  app.use("/", express.static(path.join(__dirname, "static")));
}

//socket connection
io.on("connection", (socket) => {
  socket.on("DIALOG:JOIN", ({ dial_id }) => {
    socket.join(dial_id);
  });

  socket.on("DIALOG:LEAVE", ({ dial_id }) => {
    socket.leave(dial_id);
  });

  socket.on(
    "DIALOG:NEW_MESSAGE",
    async ({ me, dial_id, portion, currentPage }) => {
      const result = await getMessagesService(
        me,
        dial_id,
        portion,
        currentPage
      );
      socket.broadcast.to(dial_id).emit("DIALOG:NEW_MESSAGE", result);
    }
  );

  socket.on("disconnect", () => {
    console.log("user has gone", socket.id);
  });

  console.log("user connected", socket.id);
});

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    httpServer.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
