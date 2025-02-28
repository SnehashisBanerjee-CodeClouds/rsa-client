export enum PaymentErrorActionKind {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}
export interface PaymentErrorActionState {
  type: PaymentErrorActionKind;
  payload: string;
}
