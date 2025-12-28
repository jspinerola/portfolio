import React from "react";

function Tag({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="border border-primary/20 group h-fit text-xs px-2 py-1 my-1 text-secondary-foreground rounded-md font-mono bg-secondary/70 hover:bg-secondary/30 transition-colors lowercase flex gap-1 items-center">
      {title}
      {children}
    </div>
  );
}

export default Tag;
