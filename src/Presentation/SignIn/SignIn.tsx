import { Button, Container, Row, Col } from "react-bootstrap";
import React from "react";
import * as config from "appConfig";

function SignIn() {
  return (
    <React.Fragment>
      <Container className="d-flex flex-column align-items-center py-5">
        <h2 style={{ fontWeight: 500 }}>Log in</h2>
        <br />

        <Button
          variant="outline-secondary"
          href="http://localhost:4000/auth/getAuthLink"
        >
          <Row className="align-items-center">
            <Col sm={3}>
              <img
                src="https://img.icons8.com/fluency/344/google-logo.png"
                alt=""
                width="40"
              />
            </Col>
            <Col sm={9}>
              <h6>Google Login</h6>
            </Col>
          </Row>
        </Button>
        <br />
        <Button href="http://localhost:4000/auth/refreshToken">
          Refresh Token
        </Button>
        <br />
      </Container>
    </React.Fragment>
  );
}

export default SignIn;
