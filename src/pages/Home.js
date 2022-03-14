import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getEvents } from "../redux/home/home.actions";
import { Div, Row, Col, Container, Text, Image, Dropdown, Icon } from "atomize";

import Header from "./layouts/Header";
import MobileNav from "./layouts/MobileNav";

import Loader from "../components/utils/Loader";
import helper from "../components/helper";
import Subscribe from "./layouts/Subscribe";
import Footer from "./layouts/Footer";

import IMGONE from "../assets/images/image.png";

function Home(props) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(props?.home?.events);

  useEffect(() => {
    getAllEvents();

    return () => {
      //
    };
  }, []);

  const getAllEvents = () => {
    if (events.length > 0) {
      return false;
    }

    setLoading(true);
    props?.fetchEvents(
      (res) => {
        setEvents(res);
        setLoading(false);
      },
      () => {
        setEvents(props?.home?.events);
        setLoading(false);
      }
    );
  };

  return (
    <Div>
      <Loader isLoading={loading} disabled={loading} />
      <Header />
      <MobileNav />
      <Container>
        {/* first section */}
        <Div>
          <Row align="center">
            <Col size={{ xs: 12, lg: 6 }}>
              <Div>
                <Text tag="h1" textSize="display3">
                  Welcome to{" "}
                  <Text tag="span" textColor="secondary">
                    TechEventsUK
                  </Text>
                </Text>
                <Text textColor="black900" textSize="title" p={{ y: "1rem" }}>
                  TechEventsUK launched an <b>event sourcing application</b>{" "}
                  that features over <b>100</b> tech conferences
                </Text>
              </Div>
            </Col>
            <Col size={{ xs: 12, lg: 6 }}>
              <Div>
                <Image src={IMGONE} h="500px" />
              </Div>
            </Col>
          </Row>
        </Div>
        {/* end of first section */}

        {/* subscribe section */}
        <Subscribe />
        {/* end subscribe section */}

        {/* footer section */}
        <Footer />
        {/* end of footer section */}
      </Container>
    </Div>
  );
}

const mapStateToProps = function (state) {
  return {
    auth: state?.auth,
    home: state?.home,
  };
};

const mapDispatchToProps = {
  fetchEvents: getEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
