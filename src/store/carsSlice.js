import { createSlice } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
  },
  reducers: {
    setCars: (state, action) => {
      state.cars = action.payload;
    },
    create: (state, action) => {
      state.cars.push(action.payload);
    },
    edit: (state, action) => {
      const { id, car_color, price, availability } = action.payload;

      const existedCar = state.cars.find((car) => car.id === id);

      if (existedCar) {
        existedCar.car_color = car_color;
        existedCar.price = price;
        existedCar.availability = availability;
      }
    },
    remove: (state, action) => {
      const { id } = action.payload;
      const existedCar = state.cars.find((car) => car.id === id);
      if (existedCar) {
        state.cars = state.cars.filter((car) => car.id !== id);
      }
    },
  },
});

export default carsSlice.reducer;
export const { setCars, remove, edit, create } = carsSlice.actions;
