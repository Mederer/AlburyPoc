import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function UIShell() {
    return <>
        <header>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">Albury POC</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/ideas">Ideas</Nav.Link>
                            <Nav.Link as={Link} to="/ideas/create">Submit Idea</Nav.Link>
                            <Nav.Link as={Link} to="/reporting">Reporting</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
        <main style={{marginTop: "1rem"}}>
            <Outlet />
        </main>
    </>
}

export default UIShell;