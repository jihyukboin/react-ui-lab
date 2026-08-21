"use client";

import { Plus, Trash2 } from "lucide-react";
import { Fragment, useRef, useState } from "react";

type ResumeDataTableProps = {
  label: string;
  headers: string[];
};

export default function ResumeDataTable({ label, headers }: ResumeDataTableProps) {
  const [rows, setRows] = useState([0, 1, 2]);
  const lastRowFirstInputRef = useRef<HTMLInputElement>(null);

  const addRow = () => {
    setRows((current) => [...current, current.length]);
    requestAnimationFrame(() => lastRowFirstInputRef.current?.focus());
  };

  const removeLastRow = () => {
    setRows((current) => current.length > 1 ? current.slice(0, -1) : current);
  };

  return (
    <div className="group relative">
      <table className="w-full table-fixed border-collapse border border-black text-sm">
        <tbody>
          <tr>
            <th rowSpan={rows.length + 1} className="w-20 border border-black bg-neutral-50 px-2 py-2 text-center font-medium">
              {label.split("").map((character, index) => (
                <Fragment key={`${character}-${index}`}>
                  {character}
                  {index < label.length - 1 && <br />}
                </Fragment>
              ))}
            </th>
            {headers.map((header) => (
              <th key={header} className="border border-black bg-neutral-50 px-3 py-2 font-medium">{header}</th>
            ))}
          </tr>
          {rows.map((row, rowIndex) => (
            <tr key={row}>
              {headers.map((header, headerIndex) => (
                <td key={header} className="border border-black px-3 py-2">
                  <input
                    ref={rowIndex === rows.length - 1 && headerIndex === 0 ? lastRowFirstInputRef : undefined}
                    className="w-full bg-transparent outline-none"
                    type="text"
                    aria-label={`${label} ${rowIndex + 1} ${header}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="absolute -right-8 bottom-1 flex gap-1 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          onClick={addRow}
          className="flex size-6 items-center justify-center text-neutral-400 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
          aria-label={`${label} 행 추가`}
          title={`${label} 행 추가`}
        >
          <Plus size={16} strokeWidth={2} />
        </button>
        {rows.length > 1 && (
          <button
            type="button"
            onClick={removeLastRow}
            className="flex size-6 items-center justify-center text-neutral-400 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#007AFF]"
            aria-label={`${label} 마지막 행 삭제`}
            title={`${label} 마지막 행 삭제`}
          >
            <Trash2 size={16} strokeWidth={1.8} />
          </button>
        )}
      </div>
    </div>
  );
}
