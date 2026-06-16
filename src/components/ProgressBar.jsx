export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100

  return (
    <div className="mb-6 animate-fade-in">
      {/* 숫자 표시 */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          진행률
        </span>
        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
          {current} / {total}
        </span>
      </div>

      {/* 프로그레스 바 트랙 */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-rose-400 to-purple-500
            transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 스텝 도트 */}
      <div className="flex justify-between mt-2 px-0.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i < current
                ? 'bg-rose-400'
                : i === current - 1
                ? 'bg-purple-500 scale-125'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
