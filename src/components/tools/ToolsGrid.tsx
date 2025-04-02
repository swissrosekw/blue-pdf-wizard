
import React from "react";
import ToolCard from "./ToolCard";
import { tools } from "./ToolsData";

const ToolsGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard 
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              longDescription={tool.longDescription}
              icon={tool.icon}
              color={tool.color}
              path={tool.path}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
