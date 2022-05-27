import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./navBar.css";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { UseCases } from "Domain/UseCases/UseCases";

interface path {
  id: Number;
  name: string;
  path: string;
  inTopNav?: boolean;
}

interface TopNavProps {
  paths: path[];
}

interface TopNavState {
  name: string | undefined;
  email: string | undefined;
  picture: string | undefined;
}

class TopNav extends React.Component<TopNavProps, TopNavState> {
  data = UseCases.UserUseCase.getLocalUserData();
  state = {
    name: this.data ? this.data.name : undefined,
    email: this.data ? this.data.email : undefined,
    picture: this.data ? this.data.picture : undefined,
  };

  template() {
    let paths = this.props.paths;
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container className="mx-5" fluid>
          <Navbar.Brand href="#home">
            <img
              src="https://images.unsplash.com/photo-1611606063065-ee7946f0787a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
              alt=""
              width="30"
            />
            Chat-Chat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {paths
                .filter((it) => it.inTopNav)
                .map((it) => (
                  <LinkContainer to={it.path} key={it.id as number}>
                    <Nav.Link>{it.name}</Nav.Link>
                  </LinkContainer>
                ))}

              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {paths
                  .filter(
                    (it) => it.inTopNav == undefined || it.inTopNav == false
                  )
                  .map((it) => (
                    <LinkContainer to={it.path} key={it.id as number}>
                      <NavDropdown.Item>{it.name}</NavDropdown.Item>
                    </LinkContainer>
                  ))}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.5">
                  {this.state.name && (
                    <div className="d-flex flex-row justify-content-evenly align-items-center">
                      <img
                        className="rounded-circle"
                        src={decodeURIComponent(this.state.picture as string)}
                        alt=""
                        width="40"
                      />
                      <div>
                        <h6>Profile</h6>
                      </div>
                    </div>
                  )}
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  render() {
    return this.template();
  }
}

export default TopNav;
