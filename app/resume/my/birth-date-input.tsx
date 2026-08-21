"use client";

import { ChangeEvent, useState } from "react";

const numbersOnly = (value: string, maxLength: number) => value.replace(/\D/g, "").slice(0, maxLength);

export default function BirthDateInput() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const handleChange = (setter: (value: string) => void, maxLength: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(numbersOnly(event.target.value, maxLength));
  };

  return (
    <div className="flex items-center whitespace-nowrap">
      <input className="w-[4ch] bg-transparent text-center outline-none placeholder:text-neutral-400" type="text" inputMode="numeric" aria-label="생년" placeholder="0000" value={year} onChange={handleChange(setYear, 4)} />
      <span aria-hidden="true">.</span>
      <input className="w-[2ch] bg-transparent text-center outline-none placeholder:text-neutral-400" type="text" inputMode="numeric" aria-label="생월" placeholder="00" value={month} onChange={handleChange(setMonth, 2)} />
      <span aria-hidden="true">.</span>
      <input className="w-[2ch] bg-transparent text-center outline-none placeholder:text-neutral-400" type="text" inputMode="numeric" aria-label="생일" placeholder="00" value={day} onChange={handleChange(setDay, 2)} />
    </div>
  );
}
