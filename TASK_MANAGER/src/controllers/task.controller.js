import { Task } from "../models/task.model.js";

export const createTask = async (req,res) => {
    try {
        const { title , description } = req.body;

        if(!title) {
            return res
            .status(400)
            .json({
                message : "title is required",
            });
        }

        const task = await Task.create({
            title,
            description,
        });

         return res
            .status(201)
            .json({
                data : task,
            });



    } catch (error) {
        res.status(500)
        .json({
            message : error.message,
        });
    }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getTaskById = async (req,res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if(!task) {
            return res.status(404)
            .json({
                message : "task not found",
            });
        }
    } catch (error) {
        return res.status(500)
        .json({
            message : error.message,
        })
    }
};

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "task not found",
            });
        }

        return res.status(200).json({
            data: task,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const deleteTask = async (req,res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete (id);

    try {
        if(!task) {
            return res.status(404)
            .json({
                message : "task not found"
            });

        }

        res.status(200)
        .json({
            message : "task deleted successfully !"
        })
    } catch (error) {
        res.status(404)
        .json({
            message : error.message,
            
        });
    }
}