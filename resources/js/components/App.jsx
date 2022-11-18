import Event from './event/Event';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
        <h1 className="text-center">My Event App</h1>
        <Event/>
        <ToastContainer />
    </>
  )
}

export default App