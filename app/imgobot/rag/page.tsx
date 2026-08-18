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

const fileNodes = (prefix: string, names: string[]): CurriculumNode[] =>
  names.map((name) => ({ id: `${prefix}-${name}`, name }));

const curriculum: CurriculumNode[] = [
  {
    id: "2022-revision",
    name: "2022 개정 시기",
    children: [
      {
        id: "elementary-2022-12",
        name: "초등학교(2022.12)",
        children: fileNodes("elementary-2022-12", [
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
          "실과(기술·가정)/정보과",
          "바른 생활, 슬기로운 생활, 즐거운 생활",
          "한국어 교육과정",
          "창의적 체험활동",
        ]),
      },
      {
        id: "elementary-2026-01",
        name: "초등학교(2026.01)",
        children: fileNodes("elementary-2026-01", [
          "총론",
          "바른 생활, 슬기로운 생활, 건강한 생활, 즐거운 생활",
        ]),
      },
      {
        id: "middle-2022-12",
        name: "중학교(2022.12)",
        children: fileNodes("middle-2022-12", [
          "총론", "국어", "수학", "영어", "사회", "도덕", "과학", "체육", "음악", "미술",
          "기술·가정", "정보", "생활 외국어", "한문", "환경", "보건", "진로와 직업",
          "한국어 교육과정", "창의적 체험활동",
        ]),
      },
      {
        id: "middle-2026-01",
        name: "중학교(2026.01)",
        children: fileNodes("middle-2026-01", ["총론"]),
      },
      {
        id: "high-2022-12",
        name: "고등학교(2022.12)",
        children: fileNodes("high-2022-12", [
          "총론", "국어", "수학", "영어", "사회", "도덕", "과학", "체육", "음악", "미술",
          "기술·가정", "정보", "제2외국어", "한문", "교양", "과학 계열 선택 과목",
          "체육 계열 선택 과목", "예술 계열 선택 과목", "전문 교과", "한국어 교육과정",
          "창의적 체험활동",
        ]),
      },
      {
        id: "high-2026-01",
        name: "고등학교(2026.01)",
        children: fileNodes("high-2026-01", ["총론"]),
      },
      {
        id: "elementary-middle-2024-08",
        name: "초ㆍ중등학교(2024.08)",
        children: fileNodes("elementary-middle-2024-08", [
          "총론", "영어", "사회", "음악", "예술 계열 선택 과목", "전문 교과",
          "한국어 교육과정", "중학교 선택 교과", "고등학교 교양 교과",
        ]),
      },
      {
        id: "elementary-middle-2026-01",
        name: "초ㆍ중등학교(2026.01)",
        children: fileNodes("elementary-middle-2026-01", ["총론"]),
      },
      {
        id: "special-2022-12",
        name: "특수교육(2022.12)",
        children: fileNodes("special-2022-12", ["총론", "특수교육 교과/영역"]),
      },
      {
        id: "special-2024-08",
        name: "특수교육(2024.08)",
        children: fileNodes("special-2024-08", ["총론", "특수교육 교과/영역"]),
      },
      {
        id: "special-2026-01",
        name: "특수교육(2026.01)",
        children: fileNodes("special-2026-01", ["총론", "특수교육 교과/영역"]),
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
