import { Div, Row, Col, Text, Input, Icon, Button } from "atomize";
import React, { useState } from "react";
import { connect } from "react-redux";
import { subscribe } from "../../redux/home/home.actions";
import validator from "../../components/helper/validator";
import { toast } from "react-toastify";

function Subscribe(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const formData = {
      email,
    };

    if (!validator.subscribe(formData)) {
      return false;
    }

    setLoading(true);

    props.userSubscribe(
      formData,
      (res) => {
        setLoading(false);
        setEmail("");
        toast.success("Subscribed!");
      },
      () => {
        setLoading(false);
      }
    );
  };
  return (
    <Div p={{ y: "2rem" }}>
      <Div p={{ b: "3rem" }}>
        <Text
          tag="h1"
          textAlign="center"
          textTransform="capitalize"
          textSize="display1"
        >
          Join our mailing list!
        </Text>
        <Text tag="p" textAlign="center" textColor="black900" textSize="title">
          Sign up to recive email updates on our services, <br /> art ideas,
          special promotions and more
        </Text>
      </Div>
      <Row justify="center">
        <Col size={{ xm: 12, lg: 8 }}>
          <Div>
            <Row justify="center" align="center">
              <Col size={{ xs: 12, lg: 9 }}>
                <Input
                  placeholder="Email Address"
                  p={{ x: "1.5rem", y: "2rem" }}
                  textSize="20px"
                  name="email"
                  type="email"
                  value={email}
                  onInput={(text) => setEmail(text?.target?.value)}
                />
              </Col>
              <Col size={{ xs: 12, lg: 3 }} align="center">
                <Button
                  isLoading={loading}
                  disabled={loading}
                  w="100%"
                  onClick={() => handleSubmit()}
                  bg="black900"
                >
                  Subscribe
                </Button>
              </Col>
            </Row>
          </Div>
        </Col>
      </Row>
    </Div>
  );
}

const mapDispatchToProps = {
  userSubscribe: subscribe,
};

export default connect(null, mapDispatchToProps)(Subscribe);
