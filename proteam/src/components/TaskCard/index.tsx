import React from "react";
import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import { Calendar, Clock, Tag, User, Paperclip, AlertCircle } from "lucide-react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  const priorityColors = {
    Urgent: "bg-red-100 text-red-800",
    High: "bg-orange-100 text-orange-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",
    Backlog: "bg-blue-100 text-blue-800",
  };

  const statusColors = {
    "To Do": "bg-gray-100 text-gray-800",
    "Work In Progress": "bg-purple-100 text-purple-800",
    "Under Review": "bg-indigo-100 text-indigo-800",
    Completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="mb-4 overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div className="relative h-40 w-full">
          <Image
            src={``}
            alt={task.attachments[0].fileName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
          <div className="absolute bottom-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-semibold dark:bg-dark-secondary">
            <Paperclip className="mr-1 inline-block h-4 w-4" />
            {task.attachments.length}
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            #{task.id}
          </span>
          <div className="flex space-x-2">
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${ priorityColors.Low}`}>
              {task.priority}
            </span>
            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${ statusColors["To Do"]}`}>
              {task.status}
            </span>
          </div>
        </div>
        <h3 className="mb-2 text-xl font-bold">{task.title}</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          {task.description || "No description provided"}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {task.tags && task.tags.split(',').map((tag, index) => (
            <span key={index} className="rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
              <Tag className="mr-1 inline-block h-3 w-3" />
              {tag.trim()}
            </span>
          ))}
        </div>
        <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span>{task.startDate ? format(new Date(task.startDate), "PP") : "Not set"}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-gray-500" />
            <span>{task.dueDate ? format(new Date(task.dueDate), "PP") : "Not set"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {task.author && (
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4 text-gray-500" />
                <span className="text-sm">{task.author.username}</span>
              </div>
            )}
            {task.assignee && (
              <div className="flex items-center">
                <AlertCircle className="mr-1 h-4 w-4 text-gray-500" />
                <span className="text-sm">{task.assignee.username}</span>
              </div>
            )}
          </div>
          {typeof task.points === "number" && (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
              {task.points} pts
            </span>
          )}
        </div>
      </div>
    </div>
  );
};


export default TaskCard;