import { Task } from "../models/task.model";

const createTask = async (req,res) => {
    try {
        const { title , description } = req.body;

        if(!title) {
            return res
            .status(400)
            .json({
                success : false,
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
                success : true,
                data : task,
            });



    } catch (error) {
        res.status(500)
        .json({
            success : false,
            message : error.message,
        });
    }
}

export {createTask};