"use client";
import { useState } from "react";

export default function SliderModal({ open, setOpen }) {
  const [index, setIndex] = useState(1);
  let image = [1, 2, 3, 4];
  return (
    <>
      {open && <div className="overlayDialog"></div>}

      <dialog className="dialog" open={open}>
        <button className="modalClose" onClick={() => setOpen(false)}>
          X
        </button>
        <div className="productModal">
          <button
            onClick={() =>
              index - 1 === 0 ? setIndex(1) : setIndex(index - 1)
            }
          >
            <img src="./img/leftBtn.png" alt="" />
          </button>

          <img src={`/img/slider${index}.svg`} alt="" />
          <button
            onClick={() =>
              index + 1 === 5 ? setIndex(1) : setIndex(index + 1)
            }
          >
            <img src="./img/rightBtn.png" alt="" />
          </button>
        </div>
        <div className="thumbnail">
          {image.map((x) => (
            <img
              key={x}
              src={`./img/slider${x}.png`}
              alt=""
              className={` ${index === x ? "hoverImg" : ""}`}
            />
          ))}
        </div>
      </dialog>
    </>
  );
}
