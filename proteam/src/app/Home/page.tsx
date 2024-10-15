"use client"

import React, { useState } from 'react';
import { Priority, Project, Task, useGetProjectsQuery, useGetTasksQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Header from "@/components/Header";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import { PlusCircle, ChevronUp, ChevronDown } from 'lucide-react';

// Custom UI Components
const Card = ({ children, className = '' }) => (
  <div className={`rounded-lg bg-white shadow-md dark:bg-gray-800 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const Select = ({ value, onValueChange, children }) => (
  <div className="relative inline-block w-full">
    <select 
      value={value} 
      onChange={(e) => onValueChange(e.target.value)}
      className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    >
      {children}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <ChevronDown className="h-4 w-4" />
    </div>
  </div>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const Button = ({ children, onClick, className = '', variant = 'primary', size = 'medium' }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
    secondary: "bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
  };
  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState<string>("1");
  const [expandedSections, setExpandedSections] = useState({
    taskDistribution: true,
    projectStatus: true,
    tasks: true,
  });

  const { data: tasks, isLoading: tasksLoading, isError: tasksError } = useGetTasksQuery({ projectId: parseInt(selectedProject) });
  const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery();

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (tasksLoading || isProjectsLoading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (tasksError || !tasks || !projects) return <div className="flex h-screen items-center justify-center">Error fetching data</div>;

  const priorityCount = tasks.reduce((acc: Record<string, number>, task: Task) => {
    const { priority } = task;
    acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
    return acc;
  }, {});

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const statusCount = projects.reduce((acc: Record<string, number>, project: Project) => {
    const status = project.endDate ? "Completed" : "Active";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const projectStatus = Object.keys(statusCount).map((key) => ({
    name: key,
    count: statusCount[key],
  }));

  const chartColors = isDarkMode
    ? { bar: "#8884d8", barGrid: "#303030", pieFill: "#4A90E2", text: "#FFFFFF" }
    : { bar: "#8884d8", barGrid: "#E0E0E0", pieFill: "#82ca9d", text: "#000000" };

  const taskColumns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "priority", headerName: "Priority", width: 150 },
    { 
      field: "dueDate", 
      headerName: "Due Date", 
      width: 150,
      valueGetter: (params: GridValueGetterParams) => 
        new Date(params.row.dueDate).toLocaleDateString()
    },
  ];

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="container min-h-screen w-full bg-gray-100 p-8 dark:bg-gray-800">
      <Header name="Project Management Dashboard" />
      <div className="mb-6 flex items-center justify-between">
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          {projects.map((project: Project) => (
            <SelectItem key={project.id} value={project.id.toString()}>
              {project.name}
            </SelectItem>
          ))}
        </Select>
        <Button onClick={() => console.log("New task button clicked")}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Task
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Task Priority Distribution</h3>
            <Button variant="ghost" size="small" onClick={() => toggleSection('taskDistribution')}>
              {expandedSections.taskDistribution ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent>
            {expandedSections.taskDistribution && (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={taskDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.barGrid} />
                  <XAxis dataKey="name" stroke={chartColors.text} />
                  <YAxis stroke={chartColors.text} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill={chartColors.bar} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Project Status</h3>
            <Button variant="ghost" size="small" onClick={() => toggleSection('projectStatus')}>
              {expandedSections.projectStatus ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent>
            {expandedSections.projectStatus && (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie dataKey="count" data={projectStatus} fill="#82ca9d" label>
                    {projectStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Your Tasks</h3>
            <Button variant="ghost" size="small" onClick={() => toggleSection('tasks')}>
              {expandedSections.tasks ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent>
            {expandedSections.tasks && (
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={tasks}
                  columns={taskColumns}
                  checkboxSelection
                  loading={tasksLoading}
                  getRowClassName={() => "data-grid-row"}
                  getCellClassName={() => "data-grid-cell"}
                  className={dataGridClassNames}
                  sx={dataGridSxStyles(isDarkMode)}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;