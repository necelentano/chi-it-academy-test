import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { styled } from "styled-components";

import { useDispatch } from "react-redux";
import { remove } from "../store/carsSlice";

import Modal from "./modal/Modal";
import EditForm from "./forms/EditForm";

function DropDown({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const [modalDeleteActive, setModalDeleteActive] = useState(false);
  const [modalEditActive, setModalEditActive] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document, removeEventListener("mousedown", handler);
    };
  });

  const handleEditModal = () => {
    setModalEditActive(true);
  };

  const handleDeleteModal = () => {
    setModalDeleteActive(true);
  };

  const deleteCar = (item) => {
    dispatch(remove(item));
    setModalDeleteActive(false);
    toast.success(`Record about ${item.car} ${item.car_model} was deleted!`);
  };

  return (
    <>
      <DropDownWrapper ref={menuRef}>
        <button onClick={() => setIsOpen((prev) => !prev)}>Actions</button>
        {isOpen && (
          <DropDownItem>
            <EditButton onClick={handleEditModal}>Edit</EditButton>
            <DeleteButton onClick={handleDeleteModal}>Delete</DeleteButton>
          </DropDownItem>
        )}
      </DropDownWrapper>
      <Modal active={modalEditActive} setActive={setModalEditActive}>
        <EditForm defaultValues={item} setModalActive={setModalEditActive} />
      </Modal>
      <Modal active={modalDeleteActive} setActive={setModalDeleteActive}>
        <h3>
          Do you want to delete record about {`${item.car} ${item.car_model}`}?
        </h3>
        <button onClick={() => deleteCar(item)}>Delete</button>
      </Modal>
    </>
  );
}

DropDown.propTypes = {
  item: PropTypes.shape({
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

const DropDownWrapper = styled.div`
  position: relative;
`;

const DropDownItem = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 108px;
`;

const EditButton = styled.button`
  color: #4b90e9;
  margin-right: 4px;
`;

const DeleteButton = styled.button`
  color: red;
`;

export default DropDown;
