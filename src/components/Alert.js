/* eslint-disable react/prop-types */
import { UncontrolledAlert } from 'reactstrap';
import './styles/Alert.css';

function CustomAlert({
  color, text, onDismiss, isOpen,
}) {
  return (
    <div className="alert-container" style={isOpen ? { zIndex: 10000000 } : {}}>

      <UncontrolledAlert className="alert-wrapper" color={color} isOpen={isOpen} toggle={onDismiss}>
        {text}
      </UncontrolledAlert>

    </div>
  );
}
export default CustomAlert;
