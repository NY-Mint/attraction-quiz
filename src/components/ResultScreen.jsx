import { useState } from 'react'

export default function ResultScreen({ result, onRestart }) {
  const [copied, setCopied] = useState(false)

  if (!result) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${result.shareText}\n\n나도 해보기 👉 나는 어떤 사람에게 끌릴까? 심리테스트`
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // 클립보드 API 미지원 폴백
      const el = document.createElement('textarea')
      el.value = result.shareText
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in py-4">
      {/* 결과 헤더 카드 */}
      <div
        className={`w-full rounded-3xl p-8 text-center
          bg-gradient-to-br ${result.gradient}
          shadow-2xl relative overflow-hidden animate-bounce-in`}
      >
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-black/10 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="text-6xl mb-4 animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            {result.emoji}
          </div>
          <div className="text-white/80 text-sm font-semibold mb-1 tracking-widest uppercase">
            당신의 끌림 유형
          </div>
          <h2 className="text-3xl font-black text-white mb-1">{result.title}</h2>
          <div className="text-white/60 text-xs">TYPE {result.type}</div>
        </div>
      </div>

      {/* 특징 뱃지 */}
      <div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          rounded-3xl border border-white/50 dark:border-gray-700/50 p-5 shadow-lg
          animate-slide-up"
        style={{ animationDelay: '0.15s' }}
      >
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 tracking-widest">
          ✦ 이런 사람에게 끌려요
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.traits.map((trait) => (
            <span
              key={trait}
              className={`px-3 py-1.5 rounded-full text-xs font-bold
                ${result.badgeBg} ${result.badgeText}`}
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      {/* 설명 카드 */}
      <div
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          rounded-3xl border border-white/50 dark:border-gray-700/50 p-5 shadow-lg
          animate-slide-up"
        style={{ animationDelay: '0.2s' }}
      >
        <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 tracking-widest">
          ✦ 당신의 끌림 이야기
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
          {result.description}
        </p>
      </div>

      {/* 데이트 & 연애 스타일 */}
      <div className="grid grid-cols-1 gap-3 animate-slide-up" style={{ animationDelay: '0.25s' }}>
        <div
          className={`rounded-2xl p-4 border ${result.cardBorder}
            bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm`}
        >
          <div className={`text-xs font-bold mb-2 ${result.iconText} flex items-center gap-1.5`}>
            <span className="text-base">📅</span> 어울리는 데이트 스타일
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            {result.dateStyle}
          </p>
        </div>

        <div
          className={`rounded-2xl p-4 border ${result.cardBorder}
            bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm`}
        >
          <div className={`text-xs font-bold mb-2 ${result.iconText} flex items-center gap-1.5`}>
            <span className="text-base">💌</span> 어울리는 연애 방식
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm font-medium">
            {result.loveStyle}
          </p>
        </div>
      </div>

      {/* 공유 & 다시하기 버튼 */}
      <div className="flex flex-col gap-3 mt-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        {/* 결과 복사 버튼 */}
        <button
          onClick={handleCopy}
          className={`w-full py-4 rounded-2xl font-bold text-sm
            flex items-center justify-center gap-2
            transition-all duration-200 active:scale-95
            ${copied
              ? 'bg-green-500 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm'
            }`}
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              복사 완료!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              결과 복사하기
            </>
          )}
        </button>

        {/* 다시하기 버튼 */}
        <button
          onClick={onRestart}
          className={`w-full py-4 rounded-2xl font-bold text-white text-base
            ${result.btnBg} active:scale-95 transition-all duration-200
            shadow-lg`}
        >
          다시 테스트하기 🔄
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 dark:text-gray-600 pb-2">
        💌 나는 어떤 사람에게 끌릴까? 심리테스트
      </p>
    </div>
  )
}
