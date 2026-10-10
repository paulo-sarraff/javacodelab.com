export function Step({ number, title, children }) {
  return (
    <div className="my-6 flex gap-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD15A] text-black font-bold flex items-center justify-center text-sm">
        {number}
      </div>
      <div className="flex-1 pt-0.5">
        {title && (
          <p className="font-semibold text-[#E8E8E8] mb-2">{title}</p>
        )}
        <div className="text-[#E8E8E8]/80 text-sm leading-relaxed [&>p]:mb-0">
          {children}
        </div>
      </div>
    </div>
  )
}
