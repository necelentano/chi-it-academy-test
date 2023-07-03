import PropTypes from "prop-types";

import TableRow from "./TableRow";

function TableContent({ columns, data }) {
  return (
    <tbody>
      {data?.map((item) => {
        return <TableRow key={item.id} columns={columns} item={item} />;
      })}
    </tbody>
  );
}

TableContent.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

export default TableContent;
