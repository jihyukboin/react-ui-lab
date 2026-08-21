"use client";

import Image from "next/image";
import { ChangeEvent, createContext, PointerEvent, ReactNode, useContext, useEffect, useRef, useState } from "react";

type SignatureContextValue = {
  writerName: string;
  setWriterName: (value: string) => void;
  signatureData: string | null;
  setSignatureData: (value: string | null) => void;
};

const SignatureContext = createContext<SignatureContextValue | null>(null);

export function SignatureProvider({ children }: { children: ReactNode }) {
  const [writerName, setWriterName] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);

  return (
    <SignatureContext.Provider value={{ writerName, setWriterName, signatureData, setSignatureData }}>
      {children}
    </SignatureContext.Provider>
  );
}

export default function SignatureField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasSignatureRef = useRef(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const signatureContext = useContext(SignatureContext);
  if (!signatureContext) throw new Error("SignatureField must be used within SignatureProvider");
  const { writerName, setWriterName, signatureData, setSignatureData } = signatureContext;

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    hasSignatureRef.current = false;
    setHasSignature(false);
  };

  const prepareCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.scale(ratio, ratio);
    context.strokeStyle = "#171717";
    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    hasSignatureRef.current = false;
    setHasSignature(false);
  };

  useEffect(() => {
    if (!isDialogOpen) return;
    const frame = requestAnimationFrame(prepareCanvas);
    return () => cancelAnimationFrame(frame);
  }, [isDialogOpen]);

  const getPoint = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const bounds = canvas.getBoundingClientRect();
    return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
  };

  const startDrawing = (event: PointerEvent<HTMLCanvasElement>) => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const { x, y } = getPoint(event);
    isDrawingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(x, y);
  };

  const draw = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    const { x, y } = getPoint(event);
    context.lineTo(x, y);
    context.stroke();
    if (!hasSignatureRef.current) {
      hasSignatureRef.current = true;
      setHasSignature(true);
    }
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const applySignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;
    setSignatureData(canvas.toDataURL("image/png"));
    setIsDialogOpen(false);
  };

  return (
    <>
      <span>작성자 : </span>
      <input className="w-16 border-b border-neutral-400 bg-transparent text-center outline-none placeholder:text-neutral-400" type="text" aria-label="작성자 성명" placeholder="홍길동" value={writerName} onChange={(event: ChangeEvent<HTMLInputElement>) => setWriterName(event.target.value)} />
      <span className="ml-1 inline-flex h-8 min-w-[96px] align-middle">
        {signatureData ? (
          <button type="button" onClick={() => setIsDialogOpen(true)} className="relative h-full w-full" aria-label="서명 다시 만들기">
            <Image src={signatureData} alt="작성한 서명" width={112} height={36} unoptimized className="h-full w-full object-contain" />
          </button>
        ) : (
          <button type="button" onClick={() => setIsDialogOpen(true)} className="h-8 rounded-full bg-[#007AFF] px-3.5 text-xs font-medium text-white hover:bg-[#0071E3] focus:outline-none focus:ring-2 focus:ring-[#007AFF]">
            전자 서명 만들기
          </button>
        )}
      </span>

      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="signature-dialog-title">
          <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
            <h2 id="signature-dialog-title" className="text-lg font-semibold">서명 만들기</h2>
            <p className="mt-2 text-sm text-neutral-600">마우스, 터치 또는 펜으로 서명란에 서명하세요.</p>

            <canvas
              ref={canvasRef}
              className="mt-6 h-48 w-full touch-none rounded border border-neutral-300 bg-white"
              aria-label="손글씨 서명 입력 영역"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerCancel={stopDrawing}
              onPointerLeave={stopDrawing}
            />

            <div className="mt-6 flex items-center justify-between">
              <button type="button" onClick={clearCanvas} className="rounded border border-neutral-300 px-4 py-2 text-sm font-medium">지우기</button>
              <div className="flex gap-2">
                <button type="button" onClick={() => setIsDialogOpen(false)} className="rounded border border-neutral-300 px-4 py-2 text-sm font-medium">취소</button>
                <button type="button" onClick={applySignature} disabled={!hasSignature} className="rounded bg-[#007AFF] px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-neutral-400">확인</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
