"use client";

import Script from "next/script";
import { useRef, useState } from "react";

type PostcodeData = {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J";
};

type PostcodeConstructor = new (options: {
  oncomplete: (data: PostcodeData) => void;
}) => { open: () => void };

declare global {
  interface Window {
    daum?: { Postcode: PostcodeConstructor };
    kakao?: { Postcode: PostcodeConstructor };
  }
}

export default function AddressInput() {
  const detailInputRef = useRef<HTMLInputElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [zonecode, setZonecode] = useState("");
  const [baseAddress, setBaseAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [appliedAddress, setAppliedAddress] = useState("");

  const openPostcode = () => {
    const Postcode = window.daum?.Postcode ?? window.kakao?.Postcode;
    if (!Postcode) return;

    new Postcode({
      oncomplete: (data) => {
        setZonecode(data.zonecode);
        setBaseAddress(data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress);
        setAppliedAddress("");
        requestAnimationFrame(() => detailInputRef.current?.focus());
      },
    }).open();
  };

  const applyAddress = () => {
    if (!baseAddress) return;
    setAppliedAddress(`[${zonecode}] ${baseAddress}${detailAddress.trim() ? ` ${detailAddress.trim()}` : ""}`);
  };

  const editAddress = () => {
    setAppliedAddress("");
    requestAnimationFrame(() => detailInputRef.current?.focus());
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />

      {appliedAddress ? (
        <div className="flex items-center gap-2">
          <p className="min-w-0 flex-1 break-keep">{appliedAddress}</p>
          <button type="button" onClick={editAddress} className="shrink-0 rounded border border-neutral-300 px-2 py-1 text-xs font-medium">수정</button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input className="w-16 shrink-0 bg-transparent outline-none" type="text" value={zonecode} readOnly aria-label="우편번호" />
            <input className="min-w-0 flex-1 bg-transparent outline-none" type="text" value={baseAddress} readOnly aria-label="기본주소" />
            <button type="button" onClick={openPostcode} disabled={!isScriptLoaded} className="shrink-0 rounded bg-[#007AFF] px-2 py-1 text-xs font-medium text-white disabled:cursor-wait disabled:bg-neutral-400">
              {isScriptLoaded ? "주소찾기" : "불러오는 중"}
            </button>
          </div>
          {baseAddress && (
            <div className="flex gap-2">
              <input ref={detailInputRef} className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-neutral-400" type="text" value={detailAddress} onChange={(event) => setDetailAddress(event.target.value)} aria-label="상세주소" placeholder="상세주소를 입력하세요" />
              <button type="button" onClick={applyAddress} className="shrink-0 rounded border border-neutral-300 px-2 py-1 text-xs font-medium">주소 적용</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
