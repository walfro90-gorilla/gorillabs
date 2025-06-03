export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="h-10 w-48 bg-gray-200 rounded mb-2 animate-pulse" />
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-card rounded-lg border p-4">
            <div className="h-6 w-24 bg-gray-200 rounded mb-3 animate-pulse" />

            <div className="space-y-4">
              <div>
                <div className="h-5 w-20 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>

              <div>
                <div className="h-5 w-16 bg-gray-200 rounded mb-1 animate-pulse" />
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg border p-4">
            <div className="h-6 w-28 bg-gray-200 rounded mb-3 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-card rounded-lg border overflow-hidden animate-pulse">
                <div className="h-[200px] bg-gray-200" />
                <div className="p-6">
                  <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-full bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <div className="h-10 w-full bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
