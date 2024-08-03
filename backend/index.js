import express from "express";
import { connect, model } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

connect(process.env.DATABASE)

const Task = model("Task", {
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    }
})

app.get('/', async (req, res) => {
    let tasks = await Task.find({});
    res.send((tasks));
})

app.post('/addtask', async (req, res) => {
    const task = new Task({
        id:req.body.id,
        name:req.body.name
    })
    await task.save();
    res.json({
        success: true,
        name: req.body.name
    })
})

app.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body.name;

        const task = await Task.findOneAndUpdate({id:id}, update, {new:true});

        if (!task){
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        res.json({
            success: true,
            task: task
        })
    }

    catch(error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occured while updating the task'
        })
    }
})

app.delete('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const task = await Task.findOneAndDelete({ id: id });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.json({
            success: true,
            task: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred"
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});