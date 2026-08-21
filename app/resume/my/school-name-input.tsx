"use client";

import { ChangeEvent, useLayoutEffect, useRef, useState } from "react";

const placeholder = "OO초등학교";

export default function SchoolNameInput() {
  const measureRef = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState("");
  const [width, setWidth] = useState(96);

  useLayoutEffect(() => {
    setWidth(Math.max(measureRef.current?.offsetWidth ?? 0, 96));
  }, [value]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <span className="relative inline-block min-w-0 max-w-full flex-1 align-baseline">
      <span ref={measureRef} className="invisible absolute whitespace-pre text-lg font-bold">{value || placeholder}</span>
      <input
        className="max-w-full bg-transparent text-center text-lg font-bold outline-none placeholder:text-neutral-400"
        style={{ width, maxWidth: "100%" }}
        type="text"
        aria-label="수신 학교명"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </span>
  );
}
