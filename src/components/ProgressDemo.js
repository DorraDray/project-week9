"use client";
import React from "react";
import * as Progress from "@radix-ui/react-progress";
import "@/components/progressdemo.css";

const ProgressDemo = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(100), 1);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress.Root className="ProgressRoot" value={progress}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressDemo;
