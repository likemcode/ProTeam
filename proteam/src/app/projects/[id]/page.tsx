"use client";

import React, { useState } from "react";


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
      <h1>Project {params.id}</h1>
    </div>
  );
};

export default Project;
