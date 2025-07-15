import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isModal = true;
        },

        onCloseDateModal: (state) => {
            state.isModal = false
        }
    },
})

export const { isOpenModal, onCloseDateModal } = uiSlice.actions;