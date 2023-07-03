import PropTypes from "prop-types";
import { styled } from "styled-components";

function Pagination({ totalRows, rowsPerPage, setCurrentRows, currentRows }) {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
    pages.push(i);
  }

  return (
    <Container>
      {pages.map((page) => {
        return (
          <Button
            key={page}
            onClick={() => setCurrentRows(page)}
            color={page === currentRows ? "black" : ""}
            $bgcolor={page === currentRows ? "gray" : ""}
          >
            {page}
          </Button>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin: 20px 0;
  width: 100%;
`;
const Button = styled.button`
  color: ${(props) => props.color && props.color};
  background-color: ${(props) => props.$bgcolor && props.$bgcolor};
`;

Pagination.propTypes = {
  totalRows: PropTypes.number,
  rowsPerPage: PropTypes.number,
  currentRows: PropTypes.number,
  setCurrentRows: PropTypes.func,
};

export default Pagination;
