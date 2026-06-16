export default function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in">
      {/* 상단 장식 */}
      <div className="flex gap-3 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <span className="text-4xl animate-pulse-soft">💫</span>
        <span className="text-4xl animate-pulse-soft" style={{ animationDelay: '0.3s' }}>💕</span>
        <span className="text-4xl animate-pulse-soft" style={{ animationDelay: '0.6s' }}>✨</span>
      </div>

      {/* 메인 카드 */}
      <div
        className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
          rounded-3xl shadow-2xl border border-white/50 dark:border-gray-700/50
          p-8 text-center animate-bounce-in"
        style={{ animationDelay: '0.15s' }}
      >
        {/* 태그 */}
        <div className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-bold tracking-widest
          bg-rose-100 dark:bg-rose-900/40 text-rose-500 dark:text-rose-300">
          💌 끌림 유형 심리테스트
        </div>

        {/* 제목 */}
        <h1 className="text-3xl font-black text-gray-900 dark:text-white leading-tight mb-3">
          나는 어떤 사람에게
          <br />
          <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">
            끌릴까?
          </span>
        </h1>

        {/* 서브카피 */}
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
          10가지 질문으로 알아보는
          <br />
          나만의 <strong className="text-gray-700 dark:text-gray-300">끌림 유형</strong>
        </p>

        {/* 유형 미리보기 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {[
            { emoji: '🏠', label: '든든한 안정형', color: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300' },
            { emoji: '🔥', label: '강렬한 열정형', color: 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300' },
            { emoji: '🌍', label: '자유로운 모험형', color: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300' },
            { emoji: '💝', label: '따뜻한 감성형', color: 'bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300' },
          ].map((item) => (
            <div
              key={item.label}
              className={`${item.color} rounded-2xl px-3 py-2.5 text-xs font-semibold flex items-center gap-2`}
            >
              <span className="text-lg">{item.emoji}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg
            bg-gradient-to-r from-rose-500 to-purple-600
            hover:from-rose-600 hover:to-purple-700
            active:scale-95 transition-all duration-200
            shadow-lg shadow-rose-200 dark:shadow-rose-900/30"
        >
          테스트 시작하기 →
        </button>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          약 2분 소요 · 10가지 질문
        </p>
      </div>
    </div>
  )
}
