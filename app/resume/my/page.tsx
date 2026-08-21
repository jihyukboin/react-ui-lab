import ProfilePhotoUpload from "./profile-photo-upload";
import KoreanNameInput from "./korean-name-input";
import BirthDateInput from "./birth-date-input";
import KoreanPhoneInput from "./korean-phone-input";
import AddressInput from "./address-input";
import EmailInput from "./email-input";
import SignatureField, { SignatureProvider } from "./signature-field";
import SelfIntroductionForm from "./self-introduction-form";
import ResumeDataTable from "./resume-data-table";
import SchoolNameInput from "./school-name-input";

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
      <SignatureProvider>
      <main className="min-h-0 flex-1 overflow-y-auto py-12">
        <section className="mx-auto w-full max-w-[800px] border border-neutral-300 bg-white px-6 py-12 sm:px-12 sm:py-16" aria-label="기간제교원 지원서">
                    <h1 className="text-center text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
                        기간제교원 지원서
                    </h1>

                    <section className="mt-10 grid grid-cols-[144px_minmax(0,1fr)] items-stretch gap-4" aria-label="인적사항">
                        <table className="w-full border-collapse border border-black text-sm">
                            <tbody>
                                <tr>
                                    <td className="p-0">
                                      <ProfilePhotoUpload />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="h-full w-full table-fixed border-collapse border border-black text-sm">
                          <colgroup>
                            <col className="w-10" />
                            <col className="w-8" />
                            <col className="w-12" />
                            <col className="w-[18%]" />
                            <col className="w-20" />
                            <col className="w-[18%]" />
                            <col className="w-10" />
                            <col />
                          </colgroup>
                          <tbody>
                            <tr>
                              <th rowSpan={5} className="border border-black bg-neutral-50 px-2 text-center font-medium">
                                인<br />적<br />사<br />항
                              </th>
                              <th rowSpan={2} className="border border-black bg-neutral-50 px-2 py-2 font-medium">성<br />명</th>
                              <th className="border border-black bg-neutral-50 px-2 py-2 font-medium">한글</th>
                              <td className="border border-black px-3 py-2">
                                <KoreanNameInput />
                              </td>
                              <th rowSpan={2} className="border border-black bg-neutral-50 px-2 py-2 font-medium whitespace-nowrap">생년월일</th>
                              <td rowSpan={2} className="border border-black px-3 py-2">
                                <BirthDateInput />
                              </td>
                              <th rowSpan={2} className="border border-black bg-neutral-50 px-2 py-2 font-medium">성<br />별</th>
                              <td rowSpan={2} className="border border-black px-3 py-2">
                                <input
                                  className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                                  type="text"
                                  lang="ko"
                                  maxLength={5}
                                  aria-label="성별"
                                  placeholder="남자/여자"
                                />
                              </td>
                            </tr>
                            <tr>
                              <th className="border border-black bg-neutral-50 px-2 py-2 font-medium">한자</th>
                              <td className="border border-black px-3 py-2">
                                <input className="w-full bg-transparent outline-none" type="text" aria-label="성명 한자" />
                              </td>
                            </tr>
                            <tr>
                              <th colSpan={2} className="border border-black bg-neutral-50 px-2 py-2 font-medium">현 주소</th>
                              <td colSpan={5} className="border border-black px-3 py-2">
                                <AddressInput />
                              </td>
                            </tr>
                            <tr>
                              <th colSpan={2} className="border border-black bg-neutral-50 px-2 py-2 font-medium">E-mail</th>
                              <td colSpan={5} className="border border-black px-3 py-2">
                                <EmailInput />
                              </td>
                            </tr>
                            <tr>
                              <th colSpan={2} className="border border-black bg-neutral-50 px-2 py-2 font-medium">자택전화</th>
                              <td colSpan={2} className="border border-black px-3 py-2">
                                <KoreanPhoneInput kind="home" />
                              </td>
                              <th className="border border-black bg-neutral-50 px-2 py-2 font-medium">휴대폰</th>
                              <td colSpan={2} className="border border-black px-3 py-2">
                                <KoreanPhoneInput kind="mobile" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
          </section>

          <section className="mt-4" aria-label="학력">
            <ResumeDataTable label="학력" headers={["학교명", "재학기간", "비고"]} />
          </section>

          <section className="mt-4" aria-label="경력">
            <ResumeDataTable label="경력" headers={["직장명", "근무기간", "근무부서", "비고"]} />
          </section>

          <section className="mt-4" aria-label="자격">
            <ResumeDataTable label="자격" headers={["자격명", "취득일자", "발급기관"]} />
          </section>

          <section className="mt-10 text-center text-sm" aria-label="확인">
            <p>위 기재 사항은 사실과 틀림이 없습니다.</p>
            <p className="mt-6">{kstDateWithKoreanUnit}</p>
            <div className="mt-6"><SignatureField /></div>
            <p className="mt-10 flex justify-center text-lg font-bold">
              <span className="inline-flex max-w-full items-baseline">
                <SchoolNameInput /><span className="shrink-0">장 귀하</span>
              </span>
            </p>
          </section>
        </section>

        <section className="mx-auto mt-6 w-full max-w-[800px] border border-neutral-300 bg-white px-6 py-12 sm:px-12 sm:py-16" aria-label="자기 소개서">
            <h1 className="text-center text-[28px] font-semibold tracking-[-0.04em] sm:text-[32px]">
              자기 소개서
            </h1>
            <div className="mt-10 flex min-h-[320px] flex-col border border-black" aria-label="자기소개 항목">
              <SelfIntroductionForm />
              <footer className="mt-auto px-6 py-6 text-center text-sm">
                <p>{kstDateWithKoreanUnit}</p>
                <div className="mt-6"><SignatureField /></div>
              </footer>
            </div>
          </section>
      </main>
      </SignatureProvider>
      <footer className="flex h-[90px] shrink-0 items-center justify-center bg-white">
                푸터
            </footer>
        </div>
    );
}
