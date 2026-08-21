"use client";

import { ChangeEvent, useState } from "react";

export default function EmailInput() {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.replace(/[^a-zA-Z@.]/g, ""));
  };

  return (
    <input
      className="w-full bg-transparent outline-none placeholder:text-neutral-400"
      type="email"
      inputMode="email"
      autoComplete="email"
      aria-label="이메일"
      placeholder="example@email.com"
      pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
      value={value}
      onChange={handleChange}
    />
  );
}
