import { useState, useCallback } from 'react'
import { questions } from '../data/questions'
import { results } from '../data/results'

export function useQuiz() {
  const [screen, setScreen] = useState('start') // 'start' | 'quiz' | 'result'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 })
  const [result, setResult] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)

  const startQuiz = useCallback(() => {
    setCurrentIndex(0)
    setScores({ A: 0, B: 0, C: 0, D: 0 })
    setResult(null)
    setSelectedOption(null)
    setScreen('quiz')
  }, [])

  const selectOption = useCallback(
    (type, optionIndex) => {
      if (isTransitioning) return

      setSelectedOption(optionIndex)
      setIsTransitioning(true)

      // 선택 피드백 후 다음 질문으로 이동
      setTimeout(() => {
        const newScores = { ...scores, [type]: scores[type] + 1 }

        if (currentIndex < questions.length - 1) {
          setScores(newScores)
          setCurrentIndex((prev) => prev + 1)
          setSelectedOption(null)
          setIsTransitioning(false)
        } else {
          // 마지막 질문: 결과 계산
          const maxScore = Math.max(...Object.values(newScores))
          const topTypes = Object.keys(newScores).filter(
            (k) => newScores[k] === maxScore
          )
          // 동점이면 랜덤 선택
          const winner = topTypes[Math.floor(Math.random() * topTypes.length)]
          setScores(newScores)
          setResult(results[winner])
          setScreen('result')
          setSelectedOption(null)
          setIsTransitioning(false)
        }
      }, 450)
    },
    [scores, currentIndex, isTransitioning]
  )

  const restart = useCallback(() => {
    setCurrentIndex(0)
    setScores({ A: 0, B: 0, C: 0, D: 0 })
    setResult(null)
    setSelectedOption(null)
    setIsTransitioning(false)
    setScreen('start')
  }, [])

  return {
    screen,
    currentIndex,
    scores,
    result,
    isTransitioning,
    selectedOption,
    startQuiz,
    selectOption,
    restart,
    totalQuestions: questions.length,
    currentQuestion: questions[currentIndex],
  }
}
