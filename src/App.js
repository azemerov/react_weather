import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
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
}

export default App;
