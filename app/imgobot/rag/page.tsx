"use client";

import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Tree, type NodeRendererProps } from "react-arborist";
import { Group, Panel, Separator } from "react-resizable-panels";

const PdfViewer = dynamic(() => import("./pdf-viewer"), { ssr: false });

type CurriculumNode = {
  id: string;
  name: string;
  children?: CurriculumNode[];
};

const curriculum: CurriculumNode[] = [
  {
    id: "2022-revision",
    name: "2022 개정 시기",
    children: [
      {
        id: "elementary-school",
        name: "초등학교",
        children: [
          "총론",
          "국어",
          "수학",
          "영어",
          "사회",
          "도덕",
          "과학",
          "체육",
          "음악",
          "미술",
          "실과",
        ].map((name) => ({ id: `elementary-${name}`, name })),
      },
    ],
  },
];

function CurriculumTreeNode({ node, style }: NodeRendererProps<CurriculumNode>) {
  const isFolder = node.isInternal;

  return (
    <div style={style} className="pr-1">
      <button
        type="button"
        onClick={(event) => {
          if (isFolder) {
            event.stopPropagation();
            node.toggle();
            return;
          }

          node.handleClick(event);
        }}
        className={`flex h-7 w-full items-center gap-1.5 rounded px-1.5 text-left text-sm text-[#cccccc] hover:bg-[#2a2d2e] ${
          node.isSelected ? "bg-[#37373d]" : ""
        }`}
      >
        {isFolder ? (
          node.isOpen ? (
            <ChevronDown size={16} className="shrink-0 text-[#c5c5c5]" />
          ) : (
            <ChevronRight size={16} className="shrink-0 text-[#c5c5c5]" />
          )
        ) : (
          <span className="w-4 shrink-0" />
        )}
        {isFolder ? (
          node.isOpen ? (
            <FolderOpen size={16} className="shrink-0 text-[#dcb67a]" />
          ) : (
            <Folder size={16} className="shrink-0 text-[#dcb67a]" />
          )
        ) : (
          <File size={16} className="shrink-0 text-[#b7b7b7]" />
        )}
        <span className="truncate">{node.data.name}</span>
      </button>
    </div>
  );
}

export default function RagPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#303030]">
      <header className="h-[50px] shrink-0" />
      <Group
        className="min-h-0 flex-1 overflow-hidden px-3 py-2 pt-0"
        orientation="horizontal"
      >
        <Panel
          defaultSize={300}
          maxSize={480}
          minSize={240}
          className="overflow-hidden rounded-lg bg-[#181818] p-4"
        >
          <Tree<CurriculumNode>
            data={curriculum}
            disableDrag
            disableEdit
            height={448}
            indent={16}
            openByDefault
            rowHeight={28}
            width="100%"
            aria-label="교육과정 파일 탐색기"
          >
            {CurriculumTreeNode}
          </Tree>
        </Panel>
        <Separator className="relative w-2 cursor-col-resize before:absolute before:inset-y-0 before:left-1/2 before:w-px before:-translate-x-1/2 hover:before:bg-[#007fd4] active:before:bg-[#007fd4]" />
        <Panel minSize={300} className="min-w-0 overflow-hidden rounded-lg bg-[#181818]">
          <main className="flex h-full min-h-0 flex-col">
            <header className="flex h-[30px] shrink-0 items-center px-6 text-xs text-[#cccccc]">
              {currentPage} / {totalPages}
            </header>
            <PdfViewer
              onPageChange={setCurrentPage}
              onTotalPagesChange={setTotalPages}
            />
          </main>
        </Panel>
      </Group>
    </div>
  );
}
