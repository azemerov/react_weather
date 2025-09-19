import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
//import InputField from '../components/InputField';
//import Form from 'react-bootstrap/Form';
import { Forecast } from "./Forecast";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import Header from './Header';
import Sidebar from './Sidebar';


function App() {
  return (
    <Container fluid className="App">
      <Header />
      <Container fluid >
        <Stack direction="horizontal">
          <Sidebar />
          <BrowserRouter>
            <Routes>
              <Route path="/"         element={<Forecast type="forecast"/>} />
              <Route path="/forecast" element={<Forecast type="forecast" />} />
              <Route path="/future"   element={<Forecast type="future"/>} />
              <Route path="/history"  element={<Forecast type="history"/>} />
              <Route path="*"         element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </Stack>
      </Container>
    </Container>
  );
  //return <Forecast />;
}

function Test({num}) {
  //let num = 222;
  return <div>Test #{num}</div>;
}

/* example of controlled input 
function ControlledInputExample() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue} // Value is driven by state
      onChange={handleChange} // Updates state on change
    />
  );
}*/

export default App;
