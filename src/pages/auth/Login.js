import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Div,
  Row,
  Col,
  Container,
  Text,
  Image,
  Input,
  Icon,
  Button,
} from "atomize";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../redux/auth/auth.actions";

import Header from "../layouts/Header";
import MobileNav from "../layouts/MobileNav";
import IMGONE from "../../assets/images/Saly-25.svg";
import validator from "../../components/helper/validator";
import { toast } from "react-toastify";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    const formData = {
      email,
      password,
    };

    if (!validator.login(formData)) {
      return false;
    }

    setLoading(true);

    props.userLogin(
      formData,
      (res) => {
        setLoading(false);
        toast("Welcome back!", {
          position: "top-center",
          type: "success",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        history.push("/dashboard");
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <Div p={{ b: "1.5rem" }}>
      <Header isLogin={true} />
      <MobileNav />
      <Container>
        {/* first section */}
        <Div>
          <Row align="center">
            <Col size={{ xs: 12, lg: 7 }}>
              <Div>
                <Text tag="h1" textSize="display3">
                  Sign into your{" "}
                  <Text tag="span" textColor="secondary">
                    TechEventsUK
                  </Text>{" "}
                  account
                </Text>
                <Text textColor="black900" textSize="title" p={{ y: "1rem" }}>
                  Your personal information is protected with industry-standard
                  SSL and encryption so everything is always safe and secure.
                </Text>
                <Div m={{ y: "1rem" }}>
                  <Row>
                    <Col size={{ xs: 12, lg: 5 }}>
                      <Input
                        placeholder="Email Address"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
                        name="email"
                        type="email"
                        prefix={
                          <Icon
                            name="Email"
                            color="black900"
                            size="16px"
                            cursor="pointer"
                            pos="absolute"
                            top="50%"
                            left="0.75rem"
                            transform="translateY(-50%)"
                          />
                        }
                        value={email}
                        onInput={(text) => setEmail(text?.target?.value)}
                      />
                    </Col>
                    <Col size={{ xs: 12, lg: 4 }}>
                      <Input
                        placeholder="Password"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
                        name="password"
                        type="password"
                        prefix={
                          <Icon
                            name="LockSolid"
                            color="black900"
                            size="16px"
                            cursor="pointer"
                            pos="absolute"
                            top="50%"
                            left="0.75rem"
                            transform="translateY(-50%)"
                          />
                        }
                        value={password}
                        onInput={(text) => setPassword(text?.target?.value)}
                      />
                    </Col>
                    <Col size={{ xs: 12, lg: 3 }}>
                      <Button
                        isLoading={loading}
                        disabled={loading}
                        w="100%"
                        onClick={() => handleSubmit()}
                        bg="black900"
                      >
                        Sign In
                      </Button>
                    </Col>
                  </Row>
                </Div>
                <Div d="flex" justify="center">
                  <Text>Dont have an account?</Text>
                  <Link className="link" to="/register">
                    <Text m={{ l: "5px" }}>Register</Text>
                  </Link>
                </Div>
              </Div>
            </Col>
            <Col size={{ xs: 12, lg: 5 }} d={{ xs: "none", lg: "block" }}>
              <Div>
                <Image src={IMGONE} h="500px" />
              </Div>
            </Col>
          </Row>
        </Div>
        {/* end of first section */}
      </Container>
    </Div>
  );
}

const mapDispatchToProps = {
  userLogin: login,
};

export default connect(null, mapDispatchToProps)(Login);
