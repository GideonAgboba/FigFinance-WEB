import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getEvents } from "../../redux/home/home.actions";
import { Div, Row, Col, Text } from "atomize";
import Main from "./layouts/Main";

function Dashboard(props) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
    return () => {
      //
    };
  }, []);

  const fetchEvents = () => {
    setLoading(true);
    props.getEvents(
      (res) => {
        setLoading(false);
        setEvents(res);
      },
      (err) => {
        setLoading(false);
      }
    );
  };

  return (
    <Main
      title="Dashboard"
      loading={loading}
      body={
        <Div w="100%">
          <Text tag="h1" textSize="display3">
            <Text tag="span" textColor="secondary">
              Events
            </Text>{" "}
            Near You
          </Text>
          <Div m={{ y: "2rem" }}>
            <Row>
              {events.length > 0 ? (
                events.map((item, index) => {
                  return (
                    <Col key={index} size={{ xs: 12, lg: 4 }}>
                      <Text>{item.title || "Unknonwn"}</Text>
                    </Col>
                  );
                })
              ) : (
                <Text textColor="red" textAlign="center">
                  No event yet
                </Text>
              )}
            </Row>
          </Div>
        </Div>
      }
    />
  );
}

const mapStateToProps = function (state) {
  return {
    auth: state?.auth,
    home: state?.home,
  };
};

const mapDispatchToProps = {
  getEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
