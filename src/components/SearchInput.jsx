import PropTypes from "prop-types";
import { styled } from "styled-components";

function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <Container>
      <Heading>Search</Heading>
      <Search
        type="text"
        placeholder="Type here ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Container>
  );
}

SearchInput.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};

const Container = styled.div`
  width: 100%;
`;

const Heading = styled.h3`
  font-size: 26px;
`;

const Search = styled.input`
  padding: 10px;
  width: 100%;
  font-size: 20px;
`;

export default SearchInput;
