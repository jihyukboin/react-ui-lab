"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { type ScrollSeekPlaceholderProps, Virtuoso } from "react-virtuoso";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const pdfFile = "/imgobot/rag/국어과_교육과정.pdf";

type PdfViewerProps = {
  onPageChange: (page: number) => void;
  onTotalPagesChange: (pages: number) => void;
};

function PdfScrollPlaceholder({ height }: ScrollSeekPlaceholderProps) {
  return (
    <div style={{ height }} className="box-border px-2 pb-2">
      <div className="h-full rounded bg-[#252526]" />
    </div>
  );
}

export default function PdfViewer({
  onPageChange,
  onTotalPagesChange,
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageRatios, setPageRatios] = useState<number[]>([]);

  const heightEstimates = useMemo(
    () =>
      pageRatios.map(
        (ratio) => Math.ceil(Math.min(pageWidth, 1100) * ratio) + 8,
      ),
    [pageRatios, pageWidth],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.max(0, Math.floor(entry.contentRect.width) - 16));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full min-h-0 min-w-0 overflow-hidden">
      <Document
        file={pdfFile}
        onLoadSuccess={async (pdf) => {
          const pageSizes = await Promise.all(
            Array.from({ length: pdf.numPages }, async (_, index) => {
              const page = await pdf.getPage(index + 1);
              const viewport = page.getViewport({ scale: 1 });
              return viewport.height / viewport.width;
            }),
          );

          setNumPages(pdf.numPages);
          setPageRatios(pageSizes);
          onTotalPagesChange(pdf.numPages);
          onPageChange(1);
        }}
        className="h-full"
      >
        {numPages > 0 && heightEstimates.length === numPages && pageWidth > 0 && (
          <Virtuoso
            className="thin-scroll h-full"
            components={{ ScrollSeekPlaceholder: PdfScrollPlaceholder }}
            heightEstimates={heightEstimates}
            increaseViewportBy={{ bottom: 600, top: 0 }}
            scrollSeekConfiguration={{
              enter: (velocity) => Math.abs(velocity) > 800,
              exit: (velocity) => Math.abs(velocity) < 80,
            }}
            totalCount={numPages}
            rangeChanged={({ startIndex }) => onPageChange(startIndex + 1)}
            itemContent={(index) => (
              <div className="flex min-w-0 justify-center px-2 pb-2 first:pt-2">
                <Page
                  pageNumber={index + 1}
                  renderAnnotationLayer
                  renderTextLayer
                  width={Math.min(pageWidth, 1100)}
                />
              </div>
            )}
          />
        )}
      </Document>
    </div>
  );
}
