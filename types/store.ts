import { Room } from "@/types/model";

import { ContactDetailsType, StepInput } from "@/types/stepForm";

export interface Reducers {
  room: Room;
  contacts: ContactDetailsType;
  step: StepInput;
}

export type Any=any;
