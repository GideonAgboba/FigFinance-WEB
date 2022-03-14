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
import { register } from "../../redux/auth/auth.actions";

import Header from "../layouts/Header";
import MobileNav from "../layouts/MobileNav";
import IMGONE from "../../assets/images/Saly-45.svg";
import PhoneIcon from "../../assets/images/phone.svg";
import validator from "../../components/helper/validator";
import { toast } from "react-toastify";

function Register(props) {
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const history = useHistory();

  const handleSubmit = async () => {
    const name =
      lastname != "" && firstname != "" ? `${lastname} ${firstname}` : "";
    const formData = {
      name,
      email,
      phone,
      password,
      passwordConfirm,
    };

    if (!validator.register(formData)) {
      return false;
    }

    setLoading(true);

    props.userRegister(
      formData,
      (res) => {
        setLoading(false);
        toast.success("Registration Completed!", {
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
      <Header isRegister={true} />
      <MobileNav />
      <Container>
        {/* first section */}
        <Div>
          <Row align="center">
            <Col size={{ xs: 12, lg: 7 }}>
              <Div>
                <Text tag="h1" textSize="display3">
                  Create your{" "}
                  <Text tag="span" textColor="secondary">
                    FigFinance
                  </Text>{" "}
                  account with us today
                </Text>
                <Text textColor="black900" textSize="title" p={{ y: "1rem" }}>
                  We protects your personal info with industry-standard SSL and
                  encryption so everything is always safe and secure.
                </Text>
                <Div m={{ y: "1rem" }}>
                  <Row>
                    <Col size={{ xs: 12, lg: 6 }}>
                      <Input
                        placeholder="Firstname"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
                        prefix={
                          <Icon
                            name="UserSolid"
                            color="black900"
                            size="16px"
                            cursor="pointer"
                            pos="absolute"
                            top="50%"
                            left="0.75rem"
                            transform="translateY(-50%)"
                          />
                        }
                        value={firstname}
                        onInput={(text) => setFirstname(text?.target?.value)}
                      />
                    </Col>
                    <Col size={{ xs: 12, lg: 6 }}>
                      <Input
                        placeholder="Lastname"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
                        prefix={
                          <Icon
                            name="UserSolid"
                            color="black900"
                            size="16px"
                            cursor="pointer"
                            pos="absolute"
                            top="50%"
                            left="0.75rem"
                            transform="translateY(-50%)"
                          />
                        }
                        value={lastname}
                        onInput={(text) => setLastname(text?.target?.value)}
                      />
                    </Col>
                    <Col size={{ xs: 12, lg: 7 }}>
                      <Input
                        placeholder="Email Address"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
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
                    <Col size={{ xs: 12, lg: 5 }}>
                      <Input
                        placeholder="Phone Number"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
                        prefix={
                          <Image
                            src={PhoneIcon}
                            w="14px"
                            cursor="pointer"
                            pos="absolute"
                            top="50%"
                            left="0.75rem"
                            transform="translateY(-50%)"
                          />
                        }
                        value={phone}
                        onInput={(text) => setPhone(text?.target?.value)}
                      />
                    </Col>
                    <Col size={{ xs: 12, lg: 4 }}>
                      <Input
                        placeholder="Password"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
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
                    <Col size={{ xs: 12, lg: 4 }}>
                      <Input
                        placeholder="Confirm Password"
                        p={{ x: "2.5rem" }}
                        m={{ b: "1rem" }}
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
                        value={passwordConfirm}
                        onInput={(text) =>
                          setPasswordConfirm(text?.target?.value)
                        }
                      />
                    </Col>
                    <Col size={{ xs: 12, lg: 4 }}>
                      <Button
                        w="100%"
                        isLoading={loading}
                        disabled={loading}
                        onClick={() => handleSubmit()}
                        bg="black900"
                      >
                        Register
                      </Button>
                    </Col>
                  </Row>
                </Div>
                <Div d="flex" justify="center">
                  <Text>Already have an account?</Text>
                  <Link className="link" to="/login">
                    <Text m={{ l: "5px" }}>Sign In</Text>
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
  userRegister: register,
};

export default connect(null, mapDispatchToProps)(Register);
