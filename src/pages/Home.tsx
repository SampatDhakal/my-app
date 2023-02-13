import "./Home.css";

import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { SliceState } from "../features/userSlice";
import { useSelector } from "react-redux";

const Home: React.FC = () => {
  const user = useSelector((state: SliceState) => state);
  return (
    <Row>
      <Col
        md={6}
        className="d-flex flex-direction-column align-items-center justify-content-center"
      >
        <div>
          <h1>Join our Network</h1>
          <p>And connect with people around the world</p>{" "}
          {!user && (
            <LinkContainer to="/login">
              <Button variant="success">
                Get Started{" "}
                <i className="fas fa-comments home-message-icon"></i>
              </Button>
            </LinkContainer>
          )}
        </div>
      </Col>
      <Col md={6} className="home__bg"></Col>
    </Row>
  );
};

export default Home;
