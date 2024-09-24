// imports 
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Project controllers

const prisma = new PrismaClient();

export const getProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        const projects = await prisma.project.findMany();
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get projects" });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) },
        });
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get project" });
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, startDate, endDate, teamId } = req.body;
        const project = await prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate,
                
            },
        });
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create project" });
    }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, description, startDate, endDate, teamId } = req.body;
        const project = await prisma.project.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                startDate,
                endDate,
                
            },
        });
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update project" });
    }
};