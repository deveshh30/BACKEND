import mongoose, { mongo, Schema } from "mongoose";

const taskSchema  = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
        },

        completed: {
            type: Boolean,
            default: false,
        },
    }, { timestamps : true }
);

export const Task = mongoose.model("TASK" , taskSchema);
