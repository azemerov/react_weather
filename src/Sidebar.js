import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Sidebar() {
  return (
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
  );
}