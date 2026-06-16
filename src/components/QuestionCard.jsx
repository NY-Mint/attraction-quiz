import { useEffect, useState } from 'react'

export default function QuestionCard({
  question,
  questionNumber,
  onSelect,
  isTransitioning,
  selectedOption,
}) {
  const [visible, setVisible] = useState(false)

  // 질문이 바뀔 때마다 페이드인 애니메이션
  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(timer)
  }, [question?.id])

  return (
    <div
      className={`transition-all duration-350 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {/* 질문 카드 */}
      <div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          rounded-3xl shadow-xl border border-white/50 dark:border-gray-700/50
          p-6 mb-4"
      >
        {/* 질문 번호 뱃지 */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-4 rounded-full
          bg-rose-50 dark:bg-rose-900/30 text-rose-500 dark:text-rose-300 text-xs font-bold">
          <span>Q{questionNumber}</span>
        </div>

        {/* 질문 텍스트 */}
        <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">
          {question?.question}
        </h2>
      </div>

      {/* 선택지 버튼들 */}
      <div className="flex flex-col gap-3">
        {question?.options.map((option, index) => {
          const isSelected = selectedOption === index
          const isOther = selectedOption !== null && selectedOption !== index

          return (
            <button
              key={index}
              onClick={() => !isTransitioning && onSelect(option.type, index)}
              disabled={isTransitioning}
              className={`
                option-btn w-full text-left px-5 py-4 rounded-2xl
                font-medium text-sm leading-snug
                border-2 transition-all duration-200
                ${isSelected
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white border-transparent scale-[1.02] shadow-lg shadow-rose-200 dark:shadow-rose-900/30'
                  : isOther
                  ? 'bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 border-gray-100 dark:border-gray-700/50 scale-95 opacity-50'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md active:scale-[0.98]'
                }
              `}
              style={{
                animationDelay: `${index * 0.08}s`,
              }}
            >
              {option.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
