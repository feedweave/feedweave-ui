import React from "react";

import { Container, Row, Col } from "reactstrap";
import Header from "../../components/Header";

class Main extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
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
