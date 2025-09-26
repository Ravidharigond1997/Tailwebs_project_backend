import mongoose from "mongoose";

const AssignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Completed"],
      default: "Draft",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    answer: {
      type: String,
      default: null, 
    },
    submittedDate: {
      type: Date,
      default: null,
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  }, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
}
);

export default mongoose.model("Assignment", AssignSchema);
