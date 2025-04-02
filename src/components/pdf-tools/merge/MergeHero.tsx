
import React from "react";
import { FilePlus2 } from "lucide-react";

interface MergeHeroProps {
  toolName: string;
  toolDescription: string;
}

const MergeHero = ({ toolName, toolDescription }: MergeHeroProps) => {
  return (
    <section className="py-16 bg-lightSalt">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="mx-auto mb-6 p-4 rounded-lg inline-flex"
            style={{ backgroundColor: "#50E3C220" }}
          >
            <FilePlus2 className="h-8 w-8" style={{ color: "#50E3C2" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{toolName}</h1>
          <p className="text-lg text-charcoal/70 mb-8">
            {toolDescription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MergeHero;
