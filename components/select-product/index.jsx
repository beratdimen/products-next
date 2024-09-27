"use client";

import { useState } from "react";

export default function SelectProduct() {
  const [unit, setUnit] = useState(0);
  return (
    <div className="select">
      <button onClick={() => (unit - 1 < 0 ? setUnit(0) : setUnit(unit - 1))}>
        -
      </button>
      <p>{unit}</p>
      <button onClick={() => unit + 1 <= 10 && setUnit(unit + 1)}>+</button>
    </div>
  );
}
