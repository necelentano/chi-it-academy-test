export const validate = (values) => {
  const errors = {};

  if (!values.car) {
    errors.car = "Car is required!";
  }

  if (values.car.length < 2 || values.car.length > 20) {
    errors.car =
      "Car company need to be a string with length from 2 to 20 characters!";
  }

  if (!values.car_model) {
    errors.car_model = "Model is required!";
  }

  if (values.car_model.length < 2 || values.car_model.length > 20) {
    errors.car_model =
      "Car model need to be a string with length from 1 to 20 characters!";
  }

  if (!values.car_vin) {
    errors.car_vin = "VIN is required!";
  }

  if (values.car_vin.length !== 17) {
    errors.car_vin = "VIN must have a string with 17 characters !";
  }

  if (!values.car_color) {
    errors.car_color = "Color is required!";
  }

  if (!values.car_model_year) {
    errors.car_model_year = "Year is required!";
  }

  if (isNaN(Number(values.car_model_year))) {
    errors.car_model_year = "Year need to be number!";
  }

  if (!values.price) {
    errors.price = "Price is required!";
  }

  if (isNaN(Number(values.price))) {
    errors.price = "Price need to be number!";
  }

  if (!values.availability) {
    errors.availability = "Availability is required!";
  }

  if (
    values.availability.toLowerCase() !== `Yes`.toLowerCase() &&
    values.availability.toLowerCase() !== "No".toLowerCase()
  ) {
    errors.availability = "Please type Yes or No";
  }

  return errors;
};
