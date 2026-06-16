import { useEffect, useState } from 'react'
import { useQuiz } from './hooks/useQuiz'
import DarkModeToggle from './components/DarkModeToggle'
import StartScreen from './components/StartScreen'
import ProgressBar from './components/ProgressBar'
import QuestionCard from './components/QuestionCard'
import ResultScreen from './components/ResultScreen'

export default function App() {
  // 다크모드: 저장값 → 시스템 설정 순으로 초기화
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const quiz = useQuiz()

  // 다크모드 클래스 동기화
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen transition-colors duration-300
      bg-gradient-to-br from-rose-50 via-pink-50 to-purple-100
      dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* 다크모드 토글 — 고정 위치 */}
      <div className="fixed top-4 right-4 z-50">
        <DarkModeToggle darkMode={darkMode} toggle={() => setDarkMode((d) => !d)} />
      </div>

      {/* 컨텐츠 영역: 모바일 최적화 최대 폭 */}
      <div className="max-w-md mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        {quiz.screen === 'start' && (
          <StartScreen onStart={quiz.startQuiz} />
        )}

        {quiz.screen === 'quiz' && (
          <>
            <ProgressBar
              current={quiz.currentIndex + 1}
              total={quiz.totalQuestions}
            />
            <QuestionCard
              question={quiz.currentQuestion}
              questionNumber={quiz.currentIndex + 1}
              onSelect={quiz.selectOption}
              isTransitioning={quiz.isTransitioning}
              selectedOption={quiz.selectedOption}
            />
          </>
        )}

        {quiz.screen === 'result' && (
          <ResultScreen result={quiz.result} onRestart={quiz.restart} />
        )}
      </div>
    </div>
  )
}
