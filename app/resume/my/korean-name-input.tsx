"use client";

import { ChangeEvent, CompositionEvent, useState } from "react";

const koreanOnly = (value: string) => value.replace(/[^가-힣]/g, "");

export default function KoreanNameInput() {
  const [value, setValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(isComposing ? event.target.value : koreanOnly(event.target.value));
  };

  const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
    setIsComposing(false);
    setValue(koreanOnly(event.currentTarget.value));
  };

  return (
    <input
      className="w-full bg-transparent outline-none"
      type="text"
      aria-label="성명 한글"
      value={value}
      onChange={handleChange}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={handleCompositionEnd}
    />
  );
}
