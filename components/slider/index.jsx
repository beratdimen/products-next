"use client";

import SliderModal from "../slider-modal";
import "./style.css";
import { useState } from "react";

export default function Slider({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="slider" onClick={() => setOpen(true)}>
        <img src={product.thumbnail} alt=""/>
      </div>
      <SliderModal open={open} setOpen={setOpen} />
    </>
  );
}
