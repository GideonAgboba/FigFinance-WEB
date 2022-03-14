import React from "react";
import { Row, Col, Text, Button, Image, Icon, Container, Div } from "atomize";
import { useHistory } from "react-router-dom";
import ICON from "../assets/images/Saly-25.svg";
import Header from "./layouts/Header";

function NotFound() {
  let history = useHistory();

  return (
    <>
      <Header />
      <Container>
        <Row
          minH="100vh"
          align="center"
          justify="center"
          d="flex"
          flexDir={{ xs: "column", lg: "row" }}
          textAlign="center"
        >
          <Col size={{ xs: 12, lg: 6 }}>
            <Image src={ICON} h={{ xs: "300px", lg: "500px" }} />
          </Col>
          <Col size={{ xs: 12, lg: 6 }}>
            <Div justify="center" align="center" flexDir="column" d="flex">
              <Text textColor="black900" textSize="display3">
                404
              </Text>
              <Text tag="p" textColor="black900" textSize="paragraph">
                Opps! Page not found
              </Text>
              <Div
                h="1px"
                w="100%"
                bg="gray200"
                m={{ y: "10px" }}
                children="."
              />
              <Text tag="p" textColor="black900" textSize="paragraph">
                <Text tag="span" textWeight="500">
                  Explaination:
                </Text>{" "}
                The HTTP 404, 404 not found, 404, 404 error, page not found or
                file not found error message is a hypertext transfer protocol
                standard response code, in computer network communications, to
                indicate that the browser was able to communicate with a given
                server, but the server could not find what was requested
              </Text>
            </Div>
            <Div justify="center" align="center" d="flex">
              <Button
                bg="primary"
                m={{ t: "1rem" }}
                onClick={() => history.goBack()}
              >
                <Icon name="LongLeft" color="white" /> Go Back
              </Button>
            </Div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default NotFound;
