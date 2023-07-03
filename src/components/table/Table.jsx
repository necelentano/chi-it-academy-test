import PropTypes from "prop-types";

import TableHeader from "./TableHeader";
import TableContent from "./TableContent";

function Table({ data, columns }) {
  return (
    <div>
      <table>
        <TableHeader columns={columns} />
        <TableContent data={data} columns={columns} />
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
};

export default Table;
