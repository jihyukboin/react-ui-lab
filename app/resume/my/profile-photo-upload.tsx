"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type Crop = {
  zoom: number;
  x: number;
  y: number;
};

const initialCrop: Crop = { zoom: 1, x: 0, y: 0 };

export default function ProfilePhotoUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const draftUrlRef = useRef<string | null>(null);
  const photoUrlRef = useRef<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftSrc, setDraftSrc] = useState<string | null>(null);
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>(initialCrop);

  useEffect(() => {
    return () => {
      if (draftUrlRef.current) URL.revokeObjectURL(draftUrlRef.current);
      if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    };
  }, []);

  const openFilePicker = () => inputRef.current?.click();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (draftUrlRef.current) URL.revokeObjectURL(draftUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    draftUrlRef.current = objectUrl;
    setDraftSrc(objectUrl);
    setCrop(initialCrop);
    setIsDialogOpen(true);
    event.target.value = "";
  };

  const closeDialog = () => {
    if (draftUrlRef.current) URL.revokeObjectURL(draftUrlRef.current);
    draftUrlRef.current = null;
    setDraftSrc(null);
    setIsDialogOpen(false);
  };

  const applyPhoto = () => {
    if (!draftSrc) return;
    if (photoUrlRef.current) URL.revokeObjectURL(photoUrlRef.current);
    photoUrlRef.current = draftSrc;
    draftUrlRef.current = null;
    setPhotoSrc(draftSrc);
    setIsDialogOpen(false);
  };

  const updateCrop = (key: keyof Crop, value: number) => {
    setCrop((current) => ({ ...current, [key]: value }));
  };

  const imageStyle = {
    objectPosition: `${50 + crop.x}% ${50 + crop.y}%`,
    transform: `scale(${crop.zoom})`,
  };

  return (
    <>
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
        {photoSrc ? (
          <Image
            src={photoSrc}
            alt="업로드한 증명사진"
            fill
            unoptimized
            className="object-cover"
            style={imageStyle}
          />
        ) : (
          <Image
            src="/profile-placeholder.png"
            alt="증명사진 플레이스홀더"
            fill
            loading="eager"
            className="object-cover"
            sizes="144px"
          />
        )}

        <button
          type="button"
          onClick={openFilePicker}
          className="absolute inset-x-3 bottom-3 rounded-full bg-[#007AFF] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#0071E3] focus:outline-none focus:ring-2 focus:ring-white"
        >
          업로드
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={handleFileChange}
      />

      {isDialogOpen && draftSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="photo-crop-title">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 id="photo-crop-title" className="text-lg font-semibold">증명사진 조정</h2>
            <p className="mt-2 text-sm text-neutral-600">3:4 프레임 안에서 사진의 크기와 위치를 조절하세요.</p>

            <div className="relative mx-auto mt-6 aspect-[3/4] w-full max-w-[240px] overflow-hidden bg-neutral-100">
              <Image
                src={draftSrc}
                alt="업로드 사진 미리보기"
                fill
                unoptimized
                className="object-cover"
                style={imageStyle}
              />
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <label className="block">
                <span className="mb-2 block font-medium">확대</span>
                <input className="w-full" type="range" min="1" max="2.5" step="0.05" value={crop.zoom} onChange={(event) => updateCrop("zoom", Number(event.target.value))} />
              </label>
              <label className="block">
                <span className="mb-2 block font-medium">가로 위치</span>
                <input className="w-full" type="range" min="-50" max="50" value={crop.x} onChange={(event) => updateCrop("x", Number(event.target.value))} />
              </label>
              <label className="block">
                <span className="mb-2 block font-medium">세로 위치</span>
                <input className="w-full" type="range" min="-50" max="50" value={crop.y} onChange={(event) => updateCrop("y", Number(event.target.value))} />
              </label>
            </div>

            <div className="mt-8 flex justify-end gap-2">
              <button type="button" onClick={closeDialog} className="rounded border border-neutral-300 px-4 py-2 text-sm font-medium">취소</button>
              <button type="button" onClick={applyPhoto} className="rounded bg-black px-4 py-2 text-sm font-medium text-white">확인</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
