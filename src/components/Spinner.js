import React from "react";
export default function Spinner(size) {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
  };
  return (
    <div className="Spinner" style={style}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
