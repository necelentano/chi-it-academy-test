import PropTypes from "prop-types";

import DropDown from "../DropDown";

function TableRow({ columns, item }) {
  return (
    <tr key={item.id}>
      {columns?.map((column) => {
        if (column.value === "availability") {
          return (
            <td key={column.heading}>{item[column.value] ? "Yes" : "No"}</td>
          );
        }
        if (column.value === "actions") {
          return (
            <td key={column.heading}>
              <DropDown item={item} />
            </td>
          );
        }
        return <td key={column.heading}>{item[column.value]}</td>;
      })}
    </tr>
  );
}

TableRow.propTypes = {
  columns: PropTypes.array,
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

export default TableRow;
