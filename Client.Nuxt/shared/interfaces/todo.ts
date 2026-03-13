export abstract class ToDo {
  abstract id: string
  abstract title: string
  abstract description: string
  abstract completionDatePlanned: Date | undefined
  abstract completionDateActual: Date | undefined
}