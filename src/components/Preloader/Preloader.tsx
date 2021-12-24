import React, { ReactElement } from "react";
import "./Preloader.sass";

export default function Preloader(): ReactElement {
  return (
    <>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div></div>
    </>
  );
}
