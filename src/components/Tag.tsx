import React from "react";

function Tag({
  title,
  children,
  className,
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-primary/20 group h-fit text-xs px-2 py-1 my-1 text-secondary-foreground rounded-md font-mono bg-secondary/70 hover:bg-secondary/30 transition-colors lowercase flex gap-1 items-center ${title.toLowerCase() === "featured" ? "bg-yellow-100 dark:bg-yellow-700/50 text-yellow-700 dark:text-yellow-100 hover:bg-yellow-100/50 dark:hover:bg-yellow-600/70" : ""} ${className}`}>
      {title}
      {children}
    </div>
  );
}

export default Tag;
