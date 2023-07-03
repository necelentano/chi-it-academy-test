import PropTypes from "prop-types";
import { styled } from "styled-components";

function Modal({ active, setActive, children }) {
  return (
    <ModalContainer
      onClick={() => setActive(false)}
      display={active ? "flex" : "none"}
    >
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <button onClick={() => setActive(false)}>Close</button>
        {children}
      </ModalContent>
    </ModalContainer>
  );
}

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.node,
};

const ModalContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => props.display && props.display};
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  padding: 20px;
  border-radius: 12px;
  background-color: gray;
  width: 500px;
`;

export default Modal;
