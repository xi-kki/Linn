export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`glass rounded-[40px] p-8 animate-pulse ${className}`}>
      <div className="h-4 bg-white/10 rounded-full w-1/3 mb-4" />
      <div className="h-8 bg-white/10 rounded-full w-2/3 mb-3" />
      <div className="h-3 bg-white/10 rounded-full w-1/2" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-5 animate-pulse">
      <div className="w-10 h-10 rounded-xl bg-white/10" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-white/10 rounded-full w-1/4" />
        <div className="h-3 bg-white/10 rounded-full w-1/3" />
      </div>
      <div className="h-4 bg-white/10 rounded-full w-20" />
    </div>
  )
}

export function SkeletonTable({ rows = 6 }: { rows?: number }) {
  return (
    <div className="glass rounded-[40px] overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_0.5fr] gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-3 bg-white/10 rounded-full" />
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  )
}

export function SkeletonNftGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="glass rounded-[40px] overflow-hidden animate-pulse">
          <div className="aspect-square bg-white/10" />
          <div className="p-5 space-y-3">
            <div className="h-3 bg-white/10 rounded-full w-1/3" />
            <div className="h-4 bg-white/10 rounded-full w-2/3" />
            <div className="flex justify-between">
              <div className="h-3 bg-white/10 rounded-full w-16" />
              <div className="h-3 bg-white/10 rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SkeletonLoader({ type = 'card' }: { type?: 'card' | 'table' | 'nft' }) {
  if (type === 'table') return <SkeletonTable />
  if (type === 'nft') return <SkeletonNftGrid />
  return <SkeletonCard />
}
