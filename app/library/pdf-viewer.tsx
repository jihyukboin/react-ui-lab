"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Virtuoso } from "react-virtuoso";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const pdfFile = "/library/국어과_교육과정.pdf";
const pageMaxWidth = 1100;
const pagePadding = 16;
const viewportPreload = { bottom: 900, top: 900 };

type PdfViewerProps = {
  onPageChange: (page: number) => void;
  onTotalPagesChange: (pages: number) => void;
};

const PdfViewer = memo(function PdfViewer({
  onPageChange,
  onTotalPagesChange,
}: PdfViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef(1);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const [pageRatios, setPageRatios] = useState<number[]>([]);

  const heightEstimates = useMemo(
    () =>
      pageRatios.map(
        (ratio) => Math.ceil(Math.min(pageWidth, pageMaxWidth) * ratio) + 8,
      ),
    [pageRatios, pageWidth],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.max(0, Math.floor(entry.contentRect.width) - pagePadding));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleDocumentLoad = useCallback(
    async (pdf: Awaited<Parameters<NonNullable<React.ComponentProps<typeof Document>["onLoadSuccess"]>>[0]>) => {
      const pageSizes = await Promise.all(
        Array.from({ length: pdf.numPages }, async (_, index) => {
          const page = await pdf.getPage(index + 1);
          const viewport = page.getViewport({ scale: 1 });
          return viewport.height / viewport.width;
        }),
      );

      currentPageRef.current = 1;
      setNumPages(pdf.numPages);
      setPageRatios(pageSizes);
      onTotalPagesChange(pdf.numPages);
      onPageChange(1);
    },
    [onPageChange, onTotalPagesChange],
  );

  const handleRangeChange = useCallback(
    ({ startIndex }: { startIndex: number }) => {
      const page = startIndex + 1;
      if (currentPageRef.current === page) return;

      currentPageRef.current = page;
      onPageChange(page);
    },
    [onPageChange],
  );

  const renderPage = useCallback(
    (index: number) => (
      <div className="flex min-w-0 justify-center px-2 pb-2 first:pt-2">
        <Page
          pageNumber={index + 1}
          renderAnnotationLayer
          renderTextLayer
          width={Math.min(pageWidth, pageMaxWidth)}
        />
      </div>
    ),
    [pageWidth],
  );

  return (
    <div ref={containerRef} className="h-full min-h-0 min-w-0 overflow-hidden">
      <Document
        file={pdfFile}
        onLoadSuccess={handleDocumentLoad}
        className="h-full"
      >
        {numPages > 0 && heightEstimates.length === numPages && pageWidth > 0 && (
          <Virtuoso
            className="thin-scroll h-full"
            heightEstimates={heightEstimates}
            increaseViewportBy={viewportPreload}
            totalCount={numPages}
            rangeChanged={handleRangeChange}
            itemContent={renderPage}
          />
        )}
      </Document>
    </div>
  );
});

export default PdfViewer;
