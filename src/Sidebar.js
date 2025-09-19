import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import InputField from "./InputField";

export default function Sidebar() {
/*
  let zip = "?";
  let dt = "?";
  let forecast = {"location": {"name": "?"}};

      <Nav.Item>
    <InputField fluid id="10" className="flex-column c-1" name="10" style={{"width":20}} width="15" initvalue={zip} type="text" placeholder="Type ZIP code and press Enter" onEnterValue={(val) => {}} />
      </Nav.Item>
      <Nav.Item>
    <div >{forecast && forecast.location.name+", "+forecast.location.region+", "+forecast.location.country}</div>
      </Nav.Item>
      <Nav.Item>
    <InputField fluid id="11" name="11" initvalue={dt} type="text" placeholder="Type DT in yyyy-mm-dd format and press Enter" onEnterValue={(val) => {}} />
      </Nav.Item>
*/
  return (
    <>
    <Navbar sticky="top" className="flex-column Sidebar">
      <Nav.Item>
        <Nav.Link href="/forecast">Forecast</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/future">Future</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/history">History</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/test">Test</Nav.Link>
      </Nav.Item>
    </Navbar>
    </>
  );
}