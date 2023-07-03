import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFetch from "./hooks/useFetch";

import { setCars } from "./store/carsSlice";
import { useDispatch, useSelector } from "react-redux";

import SearchInput from "./components/SearchInput";
import Table from "./components/table/Table";
import Pagination from "./components/Pagination";
import Modal from "./components/modal/Modal";
import AddForm from "./components/forms/AddForm";

// Table columns
const columns = [
  { heading: "Company", value: "car" },
  { heading: "Model", value: "car_model" },
  { heading: "VIN", value: "car_vin" },
  { heading: "Color", value: "car_color" },
  { heading: "Year", value: "car_model_year" },
  { heading: "Price", value: "price" },
  { heading: "Availability", value: "availability" },
  { heading: "Actions", value: "actions" },
];

function App() {
  const { cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const [currentRows, setCurrentRows] = useState(1);
  const [modalActive, setModalActive] = useState(false);

  // Fetch init data
  const { data, loading, isError } = useFetch(import.meta.env.VITE_API_URL);

  // save data to the persist store
  useEffect(() => {
    if (!cars?.length) {
      dispatch(setCars(data?.cars));
    }
  }, [cars, dispatch, data]);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const searchedCars = useMemo(() => {
    return cars?.filter((item) => {
      setCurrentRows(1);
      return (
        item.car.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.car_model
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        item.car_vin.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        item.car_color
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        String(item.car_model_year)
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      );
    });
  }, [searchQuery, cars]);

  // Pagination
  const rowsPerPage = 50;
  const lastIndex = currentRows * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentData =
    searchQuery.length > 0
      ? searchedCars?.slice(firstIndex, lastIndex)
      : cars?.slice(firstIndex, lastIndex);
  const totalRows = searchQuery.length > 0 ? searchedCars.length : cars?.length;

  if (loading) return <p>LOADING ...</p>;

  return (
    <>
      <h1>CHI IT ACADEMY TEST</h1>
      <hr />
      <h3>Total cars: {cars?.length}</h3>
      <hr />
      <div>
        <button onClick={() => setModalActive(true)}>Add car</button>
      </div>
      <hr />
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <hr />
      <Pagination
        totalRows={totalRows}
        rowsPerPage={rowsPerPage}
        setCurrentRows={setCurrentRows}
        currentRows={currentRows}
      />
      <Table data={currentData} columns={columns} />
      {!currentData?.length && <p>No data</p>}
      <Pagination
        totalRows={totalRows}
        rowsPerPage={rowsPerPage}
        setCurrentRows={setCurrentRows}
        currentRows={currentRows}
      />
      {isError && <p>ERROR: Something went wrong!</p>}
      <hr />
      <h3>Total cars: {cars?.length}</h3>
      <Modal active={modalActive} setActive={setModalActive}>
        <AddForm setModalActive={setModalActive} />
      </Modal>
      <ToastContainer />
    </>
  );
}

export default App;
