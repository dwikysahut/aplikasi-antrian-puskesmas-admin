import { Spinner } from 'reactstrap';
import './styles/Spinner.css';

function CustomSpinner() {
  return (
    <div className="spinner-wrapper">
      <Spinner color="light">
        Loading...
      </Spinner>
    </div>

  );
}
export default CustomSpinner;
