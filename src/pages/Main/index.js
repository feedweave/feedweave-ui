import React from "react";

import { Container, Row, Col } from "reactstrap";
import Sidebar from "../../components/Sidebar";

import styles from "./index.module.css";

class Main extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <Sidebar />
        <Container>
          <Row>
            <Col sm={{ size: 6, offset: 3 }}>{children}</Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Main;
