import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
    const { projectId } = req.query;
    try {
        const tasks = await prisma.task.findMany(
        {
           where:  {
            projectId: Number(projectId)
            },
            include : {
                author: true,
                assignee:true,
                comments:true,
                attachments:true,
            },

        }

    );
    res.json(tasks);
} catch (error :any) {
    res.status(500).json({ error: error.message });
}
};

// export const getTaskById = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { id } = req.params;
//         const task = await prisma.task.findUnique({
//             where: { id: parseInt(id) },
//         });
//         if (!task) {
//             res.status(404).json({ message: "Task not found" });
//             return;
//         }
//         res.status(200).json(task);
//     } catch (error: any) {
//         res.status(500).json({ message: `Failed to get task: ${error.message}` });
//     }
// };

export const createTask = async (req: Request, res: Response): Promise<void> => {
    const {
            title,
            description,
            status,
            priority,
            tags,
            startDate,
            dueDate,
            points,
            projectId,
            authorUserId,
            assignedUserId,
          } = req.body;
    try {
        const task = await prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ message: `Failed to create task: ${error.message}` });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const task = await prisma.task.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ message: `Failed to delete task: ${error.message}` });
    }
};

export const updateTaskStatus = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { taskId } = req.params;
    const { status } = req.body;
    try {
      const updatedTask = await prisma.task.update({
        where: {
          id: Number(taskId),
        },
        data: {
          status: status,
        },
      });
      res.json(updatedTask);
    } catch (error: any) {
      res.status(500).json({ message: `Error updating task: ${error.message}` });
    }
  };

  export const getUserTasks = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userId } = req.params;
    try {
      const tasks = await prisma.task.findMany({
        where: {
          OR: [
            { authorUserId: Number(userId) },
            { assignedUserId: Number(userId) },
          ],
        },
        include: {
          author: true,
          assignee: true,
        },
      });
      res.json(tasks);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error retrieving user's tasks: ${error.message}` });
    }
  };