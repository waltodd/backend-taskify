import mongoose = from "mongoose";

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  priority: { type: String, enum: ["baixa", "media", "alta"], default: "medium" },
  completed: { type: Boolean, default: false },
});

export default mongoose.model("Task", TaskSchema);