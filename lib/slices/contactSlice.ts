import { ContactDetailsType } from "@/types/stepForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: ContactDetailsType = {
  project_name: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: undefined,
};
export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action) => {
      const { first_name, last_name, email, phone_number, project_name } =
        action.payload;
      (state.project_name = project_name),
        (state.first_name = first_name),
        (state.last_name = last_name),
        (state.email = email),
        (state.phone_number = phone_number);
    },
    startOverContact: (state, action: PayloadAction<string>) => {
      state.project_name = action.payload;
      state.first_name = action.payload;
      state.last_name = action.payload;
      state.email = action.payload;
      state.phone_number = undefined;
    },
  },
});

export const { updateContact, startOverContact } = contactSlice.actions;

export default contactSlice.reducer;
