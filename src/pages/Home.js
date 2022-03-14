import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getEvents } from "../redux/home/home.actions";
import {
  Div,
  Row,
  Col,
  Container,
  Text,
  Image,
  Dropdown,
  Button,
  Icon,
} from "atomize";

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

function HowToCard({ src, title, content }) {
  return (
    <Div textAlign="center">
      <Image src={src} w="100px" h="100px" m={{ b: "1rem" }} />
      <Text tag="h1" textSize="title">
        {title}
      </Text>
      <Text textColor="black900" textSize="subheader" p={{ y: "1rem" }}>
        {content}
      </Text>
    </Div>
  );
}

function FaqCard({ q, a }) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Dropdown
      m={{ y: "20px" }}
      minW="300px"
      isOpen={showDropdown}
      onClick={() => setShowDropdown(!showDropdown)}
      menu={
        <Div p={{ y: "20px", x: "10px" }}>
          <Text>{a}</Text>
        </Div>
      }
      openSuffix={<Icon name="Up" size="16px" />}
      closeSuffix={<Icon name="Down" size="16px" />}
    >
      {q}
    </Dropdown>
  );
}

function EventCard({ item, index }) {
  return (
    <Col key={index} size={{ xs: 12, lg: 4 }}>
      <Div
        overflow="hidden"
        cursor="pointer"
        hoverShadow="2"
        rounded="md"
        p={{ y: "1.5rem", x: "1.5rem" }}
      >
        <Div d="flex" justify="center" w="100%" align="center">
          <Div h="5rem">
            <Div d="flex" h="100%">
              <Div h="100%" className="p-0" style={{ flex: 0 }}>
                <Text textWeight="bold" m={{ t: "10px" }} textSize="title">
                  $
                </Text>
              </Div>
              <Div
                h="100%"
                style={{ flex: 0 }}
                className="p-0"
                d="flex"
                align="center"
              >
                <Text textWeight="700" style={{ fontSize: "50px" }}>
                  {helper.formatToMoney(item?.price)}
                </Text>
              </Div>
              <Div
                h="100%"
                className="p-0"
                d="flex"
                style={{ flex: 1 }}
                align="flex-end"
              >
                <Text
                  textSize="caption"
                  m={{ b: "15px" }}
                >{`/ ${item?.denomination}`}</Text>
              </Div>
            </Div>
          </Div>
        </Div>
        <Div
          textAlign="center"
          align="center"
          justify="center"
          p={{ t: "30px" }}
        >
          <Text textWeight="400" textTransform="capitalize" textSize="title">
            {item?.title}
          </Text>
          <Div h="1px" w="100%" bg="gray200" m={{ y: "10px" }} />
          <Text tag="p" textTransform="capitalize" textSize="subheader">
            {item?.body}
          </Text>
          <Div h="1px" w="100%" bg="gray200" m={{ y: "10px" }} />
          <Text tag="p" textTransform="capitalize" textSize="subheader">
            {helper.formatToMoney(item?.combinations)} combinations
          </Text>
        </Div>
      </Div>
    </Col>
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
