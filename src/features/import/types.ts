export type ImportStatus = 'processing' | 'ready' | 'failed'

export type AnswerType = 'short' | 'long' | 'checklist'

export type ExtractedQuestionDto = {
  textEn: string
  textAr: string
  answerType: AnswerType
}

export type ImportDto = {
  id: string
  status: ImportStatus
  sourceFileName: string
  questionCount: number
  questions: ExtractedQuestionDto[]
  usedFallback: boolean
}

export type IntakeFormDefinitionDto = {
  importId: string
  questionCount: number
  questions: ExtractedQuestionDto[]
}
