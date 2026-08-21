"use client";

import { ChangeEvent, FormEvent } from "react";

type AutoResizeTextareaProps = {
  ariaLabel: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function AutoResizeTextarea({ ariaLabel, value, onChange }: AutoResizeTextareaProps) {
  const resize = (event: FormEvent<HTMLTextAreaElement>) => {
    const textarea = event.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <textarea
      className="min-h-32 w-full resize-none overflow-hidden bg-transparent leading-7 text-neutral-700 outline-none placeholder:text-neutral-400"
      aria-label={ariaLabel}
      placeholder="항목 텍스트 작성"
      value={value}
      onChange={onChange}
      onInput={resize}
    />
  );
}
