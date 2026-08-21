"use client";

import { ChangeEvent, useState } from "react";

type KoreanPhoneInputProps = {
  kind: "home" | "mobile";
};

const numbersOnly = (value: string, maxLength: number) => value.replace(/\D/g, "").slice(0, maxLength);

export default function KoreanPhoneInput({ kind }: KoreanPhoneInputProps) {
  const [first, setFirst] = useState("");
  const [middle, setMiddle] = useState("");
  const [last, setLast] = useState("");
  const [isUnavailable, setIsUnavailable] = useState(false);
  const label = kind === "home" ? "자택전화" : "휴대폰 번호";

  const handleChange = (setter: (value: string) => void, maxLength: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setter(numbersOnly(event.target.value, maxLength));
  };

  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <input className="w-[3ch] bg-transparent text-center outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed" type="tel" inputMode="numeric" autoComplete={kind === "home" ? "tel" : "tel-national"} aria-label={`${label} 앞자리`} placeholder="000" maxLength={3} value={first} disabled={isUnavailable} onChange={handleChange(setFirst, 3)} />
      <span aria-hidden="true">-</span>
      <input className="w-[4ch] bg-transparent text-center outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed" type="tel" inputMode="numeric" aria-label={`${label} 가운데 자리`} placeholder="0000" maxLength={4} value={middle} disabled={isUnavailable} onChange={handleChange(setMiddle, 4)} />
      <span aria-hidden="true">-</span>
      <input className="w-[4ch] bg-transparent text-center outline-none placeholder:text-neutral-400 disabled:cursor-not-allowed" type="tel" inputMode="numeric" aria-label={`${label} 뒷자리`} placeholder="0000" maxLength={4} value={last} disabled={isUnavailable} onChange={handleChange(setLast, 4)} />

      {kind === "home" && (
        <label className="ml-auto flex shrink-0 items-center gap-1 text-xs">
          <input type="checkbox" checked={isUnavailable} onChange={(event) => setIsUnavailable(event.target.checked)} />
          없음
        </label>
      )}
    </div>
  );
}
