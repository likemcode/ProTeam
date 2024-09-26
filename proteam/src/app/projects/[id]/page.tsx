"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";



type Props= {
    params: {
        id: string;
    };
};


const Project= ({ params }: Props) => {
    const { id } = params;
    const [activeTab, setActiveTab] = useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  
  
  return (
    <div>
      {/* MODAL NEW TASKS */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}></ProjectHeader>
      <h1>Project {params.id}</h1>
    </div>
  );
};

export default Project;
