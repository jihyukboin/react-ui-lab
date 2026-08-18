"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Virtuoso } from "react-virtuoso";
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

export default function PdfViewer({
  onPageChange,
  onTotalPagesChange,
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.max(0, Math.floor(entry.contentRect.width) - 48));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full min-h-0 min-w-0 overflow-hidden">
      <Document
        file={pdfFile}
        onLoadSuccess={({ numPages: loadedPages }) => {
          setNumPages(loadedPages);
          onTotalPagesChange(loadedPages);
          onPageChange(1);
        }}
        className="h-full"
      >
        {numPages > 0 && pageWidth > 0 && (
          <Virtuoso
            className="thin-scroll h-full"
            defaultItemHeight={1100}
            increaseViewportBy={{ bottom: 600, top: 0 }}
            totalCount={numPages}
            rangeChanged={({ startIndex }) => onPageChange(startIndex + 1)}
            itemContent={(index) => (
              <div className="flex min-w-0 justify-center px-6 pb-6 first:pt-6">
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
