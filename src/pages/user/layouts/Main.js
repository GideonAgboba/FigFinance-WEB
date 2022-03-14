import React from "react";
import { Div, Row, Col, Container, Text, Icon } from "atomize";

import Header from "../../layouts/Header";
import MobileNav from "../../layouts/MobileNav";

import Loader from "../../../components/utils/Loader";
import Footer from "../../layouts/Footer";
import Panel from "./Panel";

function Main({ title, loading, body }) {
  return (
    <Div>
      <Loader isLoading={loading} disabled={loading} />
      <Header />
      <MobileNav />
      <Container>
        {/* first section */}
        <Div>
          <Row align="flex-start">
            <Col size={{ xs: 12, lg: 8 }}>
              <Div
                d="flex"
                m={{ b: "1rem" }}
                justify="flex-start"
                align="center"
              >
                <Text textSize="body" textWeight="200">
                  User
                </Text>
                <Icon name="RightArrow" size="20px" />
                <Text textSize="subheader" textWeight="500">
                  {title}
                </Text>
              </Div>
              <Div
                d="flex"
                p={{ lg: "0px 20px 0px 0px" }}
                justify="flex-start"
                align="flex-start"
                minH="65vh"
              >
                {body || <></>}
              </Div>
            </Col>
            <Col className="sticky-panel" size={{ xs: 12, lg: 4 }}>
              <Panel />
            </Col>
          </Row>
        </Div>
        {/* end of first section */}

        {/* footer section */}
        <Footer />
        {/* end of footer section */}
      </Container>
    </Div>
  );
}

export default Main;
