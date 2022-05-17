import {
  configureStore,
  createSlice,
  EnhancedStore,
  Slice,
} from "@reduxjs/toolkit";

const initialFormPreviewModalState: { openModal: boolean } = {
  openModal: false,
};

const previewModalSlice: Slice = createSlice({
  name: "showPreviewModalData",
  initialState: initialFormPreviewModalState,
  reducers: {
    toggleModal(state, action): void {
      state.openModal = action.payload;
    },
  },
});

const store: EnhancedStore = configureStore({
  reducer: {
    previewModalReducer: previewModalSlice.reducer,
  },
});
export const previewModalActions = previewModalSlice.actions;
export default store;

/**
 * 4 steps:
 * create initial state,
 * create slice with initial state and add reducers
 * cofigure store (add slice.reducer to store configuration)
 * export its actions, and store object.
 */
