export default function JobSkeleton() {
  return (
    <div className="bg-[#0f0f0f] border border-white/6 rounded-lg p-4 flex gap-4 items-start animate-pulse">
      {/* Logo Skeleton */}
      <div className="w-14 h-14 rounded-md bg-white/5 flex-shrink-0" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 w-full">
            {/* Title */}
            <div className="h-4 bg-white/10 rounded w-1/3" />
            
            {/* Company & Loc */}
            <div className="h-3 bg-white/5 rounded w-1/4" />
          </div>

          <div className="space-y-2 text-right hidden sm:block">
            {/* Salary */}
             <div className="h-4 bg-white/10 rounded w-20 ml-auto" />
             {/* Date */}
             <div className="h-3 bg-white/5 rounded w-12 ml-auto" />
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex gap-2">
           <div className="h-6 w-16 bg-white/5 rounded" />
           <div className="h-6 w-12 bg-white/5 rounded" />
           <div className="h-6 w-20 bg-white/5 rounded" />
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
           <div className="h-8 w-20 bg-white/10 rounded" />
           <div className="h-8 w-20 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}
