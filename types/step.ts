export interface StepData {
  path: string
  title: string;
  isCompleted?: boolean;
  hasError?: boolean;
}

export interface Step {
  stepData: StepData[]
}
