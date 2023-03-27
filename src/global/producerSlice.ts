import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IProducerProps } from '../models/producer';
import { PRODUCERS } from '../providers/producerProvider';
import { sanitizeString } from '../utils/functions';

export interface ProducerState {
  producersList: IProducerProps[];
}

const initialState: ProducerState = {
  producersList: PRODUCERS,
};

export const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    addProducer: (state, action: PayloadAction<IProducerProps>) => {
      state.producersList.push(action.payload);
    },
    findProducerByName: (state, action: PayloadAction<string>) => {
      if (action.payload.length < 1) {
        state.producersList = PRODUCERS;
        return;
      } else {
        state.producersList = state.producersList.filter((producer) => {
          return sanitizeString(producer.farmName)
            .toLowerCase()
            .includes(sanitizeString(action.payload.toLowerCase()));
        });
      }
    },
    editProducer: (state, action: PayloadAction<IProducerProps>) => {
      const producerByIndex = state.producersList.findIndex(
        (producer) => producer.id === action.payload.id
      );

      if (producerByIndex > -1) {
        state.producersList[producerByIndex] = action.payload;
      }
    },
    removeProducer: (state, action: PayloadAction<IProducerProps>) => {
      state.producersList = state.producersList.filter((producer) => {
        return producer.id !== action.payload.id;
      });

      state.producersList = state.producersList.filter((producer) => {
        return producer.id !== action.payload.id;
      });
    },
  },
});

export const { addProducer, findProducerByName, removeProducer, editProducer } =
  producerSlice.actions;

export default producerSlice.reducer;
