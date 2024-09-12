export default function Task({ title }: { title: string }) {
  return (
    <div className="w-full h-16 bg-gradient-to-tr even:from-sky-200 odd:from-sky-100 even:to-indigo-200 odd:to-indigo-100 flex flex-row items-center px-2">
      <div className="text-2xl flex-none px-2">⬜</div>
      <div className="flex flex-col w-0 flex-1">
        <div className="font-bold truncate">{title}</div>
        <span className="text-slate-600">
          drie dagen geleden
        </span>
      </div>
    </div>
  );
}
