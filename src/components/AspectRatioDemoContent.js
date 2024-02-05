"use client";
import React from "react";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import "./aspectratiodemocontent.css";

const AspectRatioDemo = ({ image }) => (
  <div className="Container">
    <AspectRatio.Root ratio={16 / 9}>
      <img
        className="Image"
        src={image}
        alt="Landscape photograph by Tobias Tullius"
      />
    </AspectRatio.Root>
  </div>
);

export default AspectRatioDemo;
