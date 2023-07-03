import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { styled } from "styled-components";
import { toast } from "react-toastify";

import { edit } from "../../store/carsSlice";
import { validate } from "../../utils/validation";

function EditForm({ defaultValues, setModalActive }) {
  const dispatch = useDispatch();

  const initialValues = {
    ...defaultValues,
    price: defaultValues.price.substring(1),
    availability: defaultValues.availability ? "Yes" : "No",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      const valuesObj = { ...formValues };

      valuesObj.availability = valuesObj.availability === "Yes" ? true : false;
      valuesObj.car_model_year = Number(valuesObj.car_model_year);
      valuesObj.price = `$${valuesObj.price}`;

      dispatch(edit(valuesObj));
      setModalActive(false);
      toast.success(
        `Record about ${valuesObj.car} ${valuesObj.car_model} was edited!`
      );
    }
  }, [formErrors, isSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit car</h3>
      <div>
        <InputWrapper>
          <LabelWrapper>
            <label>Company:</label>
            <ErrorMessage>{formErrors.car}</ErrorMessage>
          </LabelWrapper>

          <Input
            type="text"
            name="car"
            placeholder="Car brand ..."
            value={formValues.car}
            onChange={handleChange}
            disabled
          />
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <label>Model:</label>
            <ErrorMessage>{formErrors.car_model}</ErrorMessage>
          </LabelWrapper>
          <Input
            type="text"
            name="car_model"
            placeholder="Car model ..."
            value={formValues.car_model}
            onChange={handleChange}
            disabled
          />
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <label>VIN:</label>
            <ErrorMessage>{formErrors.car_vin}</ErrorMessage>
          </LabelWrapper>
          <Input
            type="text"
            name="car_vin"
            placeholder="Car VIN ..."
            value={formValues.car_vin}
            onChange={handleChange}
            disabled
          />
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <label>Color:</label>
            <ErrorMessage>{formErrors.car_color}</ErrorMessage>
          </LabelWrapper>
          <Input
            type="text"
            name="car_color"
            placeholder="Car color ..."
            value={formValues.car_color}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <label>Year:</label>
            <ErrorMessage>{formErrors.car_model_year}</ErrorMessage>
          </LabelWrapper>
          <Input
            type="text"
            name="car_model_year"
            placeholder="Car model year ..."
            value={formValues.car_model_year}
            onChange={handleChange}
            disabled
          />
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <label>Price:</label>
            <ErrorMessage>{formErrors.price}</ErrorMessage>
          </LabelWrapper>
          <Input
            type="text"
            name="price"
            placeholder="Car price ..."
            value={formValues.price}
            onChange={handleChange}
          />
        </InputWrapper>
        <InputWrapper>
          <LabelWrapper>
            <label>Availability (Yes/No):</label>
            <ErrorMessage>{formErrors.availability}</ErrorMessage>
          </LabelWrapper>
          <Input
            type="text"
            name="availability"
            placeholder="Type Yes or No ..."
            value={formValues.availability}
            onChange={handleChange}
          />
        </InputWrapper>
        <button>Edit car</button>
      </div>
    </form>
  );
}

EditForm.propTypes = {
  setModalActive: PropTypes.func,
  defaultValues: PropTypes.shape({
    car: PropTypes.string,
    car_model: PropTypes.string,
    car_vin: PropTypes.string,
    price: PropTypes.string,
    car_color: PropTypes.string,
    id: PropTypes.number,
    car_model_year: PropTypes.number,
    availability: PropTypes.bool,
  }),
};

const InputWrapper = styled.div`
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  margin-top: 6px;
`;

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;

const ErrorMessage = styled.div`
  margin-left: 5px;
  color: red;
  padding: 0;
`;

export default EditForm;
