"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.deleteProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
// Project controllers
const prisma = new client_1.PrismaClient();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(500).json({ message: `failed to get projects: ${error.message}` });
    }
});
exports.getProjects = getProjects;
const getProjectById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield prisma.project.findUnique({
            where: { id: parseInt(id) },
        });
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: `Failed to get project: ${error.message}` });
    }
});
exports.getProjectById = getProjectById;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, startDate, endDate } = req.body;
        const project = yield prisma.project.create({
            data: {
                name,
                description,
                startDate,
                endDate,
            },
        });
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ message: `Failed to create project: ${error.message}` });
    }
});
exports.createProject = createProject;
const deleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const project = yield prisma.project.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({ message: `Failed to delete project: ${error.message}` });
    }
});
exports.deleteProject = deleteProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, description, startDate, endDate, teamId } = req.body;
        const project = yield prisma.project.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                startDate,
                endDate,
            },
        });
        res.status(200).json(project);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update project" });
    }
});
exports.updateProject = updateProject;
