"use client";

import { ChangeEvent, useState } from "react";
import { Trash2 } from "lucide-react";
import AutoResizeTextarea from "./auto-resize-textarea";

type IntroductionItem = {
  id: number;
  title: string;
  text: string;
};

export default function SelfIntroductionForm() {
  const [items, setItems] = useState<IntroductionItem[]>([{ id: 0, title: "", text: "" }]);

  const updateItem = (index: number, field: "title" | "text") => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setItems((current) => {
      const updated = current.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item);
      const isLastItem = index === current.length - 1;

      return isLastItem && value.trim() ? [...updated, { id: current.length, title: "", text: "" }] : updated;
    });
  };

  const removeLastItem = () => {
    setItems((current) => current.length > 1 ? current.slice(0, -1) : current);
  };

  return (
    <>
      {items.map((item, index) => (
        <section key={item.id} className={`relative space-y-3 px-6 py-6 ${index > 0 ? "border-t border-neutral-200" : ""}`} aria-label={`자기소개 항목 ${index + 1}`}>
          {items.length > 1 && index === items.length - 1 && (
            <button type="button" onClick={removeLastItem} className="absolute right-4 top-4 rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400" aria-label="마지막 자기소개 항목 제거">
              <Trash2 size={16} strokeWidth={1.8} />
            </button>
          )}
          <input className={`w-full bg-transparent text-base font-semibold outline-none placeholder:text-neutral-400 ${items.length > 1 && index === items.length - 1 ? "pr-8" : ""}`} type="text" aria-label={`자기소개 항목 ${index + 1} 항목명`} placeholder="항목명 작성" value={item.title} onChange={updateItem(index, "title")} />
          <AutoResizeTextarea ariaLabel={`자기소개 항목 ${index + 1} 항목 텍스트`} value={item.text} onChange={updateItem(index, "text")} />
        </section>
      ))}
    </>
  );
}
