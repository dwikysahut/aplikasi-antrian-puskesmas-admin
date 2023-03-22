import { Spinner } from 'reactstrap';
import './styles/SpinnerComponents.css';

function SpinnerComponents() {
  return (
    <div className="spinner-components-wrapper">
      <Spinner color="darkgreen">
        Loading...
      </Spinner>
    </div>

  );
}
export default SpinnerComponents;
