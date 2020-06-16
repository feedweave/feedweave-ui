import React from "react";

import { Container, Row, Col } from "reactstrap";
import Sidebar from "../../components/Sidebar";

import styles from "./index.module.css";

class Main extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <>
        <Sidebar />
        <Container>
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>{children}</Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Main;
