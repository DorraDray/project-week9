"use client";
import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import "./avatar.css";

const AvatarProfile = ({ image }) => (
  <div style={{ display: "flex", gap: 20 }}>
    {console.log(
      <Avatar.Image className="AvatarImage" src={image} alt="Colm Tuite" />
    )}
    <Avatar.Root className="AvatarRoot">
      <Avatar.Image className="AvatarImage" src={image} alt="Colm Tuite" />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        CT
      </Avatar.Fallback>
    </Avatar.Root>
    {/* <Avatar.Root className="AvatarRoot">
      <Avatar.Image className="AvatarImage" src={image} alt="Pedro Duarte" />
      <Avatar.Fallback className="AvatarFallback" delayMs={600}>
        JD
      </Avatar.Fallback>
    </Avatar.Root>
    <Avatar.Root className="AvatarRoot">
      <Avatar.Fallback className="AvatarFallback">PD</Avatar.Fallback>
    </Avatar.Root> */}
  </div>
);

export default AvatarProfile;
