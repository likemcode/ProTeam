import React from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Project } from "@/state/api";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-md">
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-gray-800">{project.name}</h3>
        <p className="mb-4 text-gray-600">{project.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Start: {project.startDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            <span>End: {project.endDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;