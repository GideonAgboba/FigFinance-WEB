import { Div, Text } from "atomize";
import moment from "moment";
import React from "react";

export default function Footer() {
  return (
    <Div p={{ y: "1rem" }}>
      <Div textAlign="center">
        <Text tag="p" textAlign="center" textColor="black900" textSize="body">
          TechEventsUK @ {moment(Date.now()).format("YYYY")}
        </Text>
      </Div>
    </Div>
  );
}
