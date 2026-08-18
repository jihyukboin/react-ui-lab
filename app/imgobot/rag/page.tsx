"use client";

import { Group, Panel, Separator } from "react-resizable-panels";

export default function RagPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#303030]">
      <header className="h-[50px] shrink-0" />
      <Group
        className="min-h-0 flex-1 overflow-hidden px-3 py-2 pt-0"
        orientation="horizontal"
      >
        <Panel
          defaultSize={320}
          maxSize={480}
          minSize={240}
          className="overflow-y-auto rounded-lg bg-[#181818] p-4"
        />
        <Separator className="relative w-2 cursor-col-resize before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 hover:before:bg-[#007fd4] active:before:bg-[#007fd4]" />
        <Panel minSize={320} className="min-w-0 overflow-y-auto rounded-lg bg-[#181818] p-6" />
      </Group>
    </div>
  );
}
