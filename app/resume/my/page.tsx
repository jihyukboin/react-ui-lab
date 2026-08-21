export default function Page() {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const kstDate = ["year", "month", "day"]
    .map((type) => dateParts.find((part) => part.type === type)?.value)
    .join(".") + ".";
  const kstDateWithKoreanUnit = kstDate.replace(
    /^(\d{4})\.(\d{2})\.(\d{2})\.$/,
    "$1년 $2월 $3일",
  );

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-neutral-100 text-black">
      <header className="flex h-[50px] shrink-0 items-center justify-center bg-white">
                헤더
            </header>
      <main className="min-h-0 flex-1 overflow-y-auto py-12">
        <section className="mx-auto w-full max-w-[800px] border border-neutral-300 bg-white px-6 py-12 sm:px-12 sm:py-16" aria-label="기간제교원 지원서">
                    <h1 className="text-center text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                        기간제교원 지원서
                    </h1>

                    <section className="mt-10 grid grid-cols-[160px_minmax(0,1fr)] items-stretch gap-4" aria-label="인적사항">
                        <table className="h-full w-full border-collapse border border-black text-sm">
                            <tbody>
                                <tr>
                                    <td className="p-3 text-center align-bottom">증명사진</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="h-full w-full border-collapse border border-black text-sm">
                            <tbody>
                                <tr>
                                    <th rowSpan={4} className="w-16 border border-black bg-neutral-50 px-2 text-center font-medium">
                                        인<br />적<br />사<br />항
                                    </th>
                                    <td className="p-0">
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr>
                                                    <th rowSpan={2} className="w-8 border border-black bg-neutral-50 px-2 py-2 font-medium">성<br />명</th>
                                                    <th className="w-12 border border-black bg-neutral-50 px-2 py-2 font-medium">한글</th>
                                                    <td className="border border-black px-3 py-2">&nbsp;</td>
                                                    <th rowSpan={2} className="w-20 border border-black bg-neutral-50 px-2 py-2 font-medium whitespace-nowrap">생년월일</th>
                                                    <td rowSpan={2} className="border border-black px-3 py-2">&nbsp;</td>
                                                    <th rowSpan={2} className="w-10 border border-black bg-neutral-50 px-2 py-2 font-medium">성<br />별</th>
                                                    <td rowSpan={2} className="border border-black px-3 py-2">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <th className="border border-black bg-neutral-50 px-2 py-2 font-medium">한자</th>
                                                    <td className="border border-black px-3 py-2">&nbsp;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-0">
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr>
                                                    <th className="w-20 border border-black bg-neutral-50 px-2 py-2 font-medium">현 주소</th>
                                                    <td className="border border-black px-3 py-2">&nbsp;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-0">
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr>
                                                    <th className="w-20 border border-black bg-neutral-50 px-2 py-2 font-medium">E-mail</th>
                                                    <td className="border border-black px-3 py-2">&nbsp;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-0">
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr>
                                                    <th className="w-20 border border-black bg-neutral-50 px-2 py-2 font-medium">자택전화</th>
                                                    <td className="border border-black px-3 py-2">&nbsp;</td>
                                                    <th className="w-20 border border-black bg-neutral-50 px-2 py-2 font-medium">휴대폰</th>
                                                    <td className="border border-black px-3 py-2">&nbsp;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
            </table>
          </section>

          <section className="mt-4" aria-label="학력">
            <table className="w-full border-collapse border border-black text-sm">
              <tbody>
                <tr>
                  <th className="w-20 border border-black bg-neutral-50 px-2 py-2 text-center font-medium">
                    학<br />력
                  </th>
                  <td className="p-0">
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr>
                          <th className="w-1/2 border border-black bg-neutral-50 px-3 py-2 font-medium">학교명</th>
                          <th className="w-1/3 border border-black bg-neutral-50 px-3 py-2 font-medium">재학기간</th>
                          <th className="border border-black bg-neutral-50 px-3 py-2 font-medium">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mt-4" aria-label="경력">
            <table className="w-full border-collapse border border-black text-sm">
              <tbody>
                <tr>
                  <th className="w-20 border border-black bg-neutral-50 px-2 py-2 text-center font-medium">
                    경<br />력
                  </th>
                  <td className="p-0">
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr>
                          <th className="w-[30%] border border-black bg-neutral-50 px-3 py-2 font-medium">직장명</th>
                          <th className="w-[30%] border border-black bg-neutral-50 px-3 py-2 font-medium">근무기간</th>
                          <th className="w-[25%] border border-black bg-neutral-50 px-3 py-2 font-medium">근무부서</th>
                          <th className="border border-black bg-neutral-50 px-3 py-2 font-medium">비고</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mt-4" aria-label="자격">
            <table className="w-full border-collapse border border-black text-sm">
              <tbody>
                <tr>
                  <th className="w-20 border border-black bg-neutral-50 px-2 py-2 text-center font-medium">
                    자<br />격
                  </th>
                  <td className="p-0">
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr>
                          <th className="w-1/2 border border-black bg-neutral-50 px-3 py-2 font-medium">자격명</th>
                          <th className="w-1/4 border border-black bg-neutral-50 px-3 py-2 font-medium">취득일자</th>
                          <th className="border border-black bg-neutral-50 px-3 py-2 font-medium">발급기관</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                        <tr>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                          <td className="border border-black px-3 py-2">&nbsp;</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="mt-10 text-center text-sm" aria-label="확인">
            <p>위 기재 사항은 사실과 틀림이 없습니다.</p>
            <p className="mt-6">{kstDate}</p>
            <p className="mt-6">작성자 : 홍길동 (서명 또는 날인)</p>
            <p className="mt-10 text-center text-lg font-bold">OO초등학교장 귀하</p>
          </section>
        </section>

        <section className="mx-auto mt-6 w-full max-w-[800px] border border-neutral-300 bg-white px-6 py-12 sm:px-12 sm:py-16" aria-label="자기 소개서">
            <h1 className="text-center text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
              자기 소개서
            </h1>
            <div className="mt-10 flex min-h-[320px] flex-col border border-black" aria-label="자기소개 항목">
              <section className="space-y-3 px-6 py-6" aria-label="자기소개 항목 예시">
                <h2 className="text-base font-semibold">항목명 작성</h2>
                <p className="leading-7 text-neutral-700">항목 텍스트 작성</p>
              </section>
              <footer className="mt-auto px-6 py-6 text-center text-sm">
                <p>{kstDateWithKoreanUnit}</p>
                <p className="mt-6">작성자 : 홍길동 (서명 또는 날인)</p>
              </footer>
            </div>
          </section>
      </main>
      <footer className="flex h-[90px] shrink-0 items-center justify-center bg-white">
                푸터
            </footer>
        </div>
    );
}
