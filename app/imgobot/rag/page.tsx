export default function RagPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#303030]">
      <header className="h-[50px] shrink-0" />
      <div className="flex min-h-0 flex-1 gap-2 overflow-hidden px-3 py-2 pt-0">
        <aside className="w-80 shrink-0 overflow-y-auto rounded-lg bg-[#181818] p-4" />
        <main className="min-w-0 flex-1 overflow-y-auto rounded-lg bg-[#181818] p-6" />
      </div>
    </div>
  );
}
