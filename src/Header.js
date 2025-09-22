import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function Header() {
  return (
    <Navbar sticky="top" className="Header" >
      <Container>
        <Navbar.Brand>VESPA</Navbar.Brand>
      </Container>
    </Navbar>
  );
}