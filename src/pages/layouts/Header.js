import React, { useState } from "react";
import {
  Div,
  Row,
  Col,
  Text,
  Button,
  SideDrawer,
  Icon,
  Image,
  Container,
  Input,
  Dropdown,
  Anchor,
} from "atomize";
import { Link, useHistory } from "react-router-dom";
import LOGO from "../../assets/images/logo-b.png";
import { connect, useDispatch } from "react-redux";
import { LOGOUT_USER } from "../../redux/auth/auth.types";
import helper from "../../components/helper";
import validator from "../../components/helper/validator";
import { login } from "../../redux/auth/auth.actions";
import { toast } from "react-toastify";

function Header(props) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  return (
    <>
      <Container>
        <Row p={{ y: "1rem" }} justify="space-between" align="center">
          <Col size="5" d="flex" align="center">
            <Link to="/">
              <Image src={LOGO} w={{ xs: "100%", lg: "190px" }} />
            </Link>
          </Col>
          <Col size="7">
            <Div d="flex" w="100%" justify="flex-end" align="center">
              <Div d={{ xs: "none", lg: "flex" }}>
                <Link className="nav-item" to="/">
                  <Text>Home</Text>
                </Link>
                <Link className="nav-item" to="/about">
                  <Text>About</Text>
                </Link>
                <Link className="nav-item" to="/contact-us">
                  <Text>Contact Us</Text>
                </Link>
              </Div>
              <Div style={{ display: "inherit" }}>
                {props?.auth?.isAuthenticated ? (
                  <Auth auth={props?.auth} />
                ) : props?.isLogin ? (
                  <Link className="nav-item" to="/register">
                    <Button
                      bg="black900"
                      hoverBg="primary"
                      shadow="2"
                      hoverShadow="4"
                    >
                      Register
                    </Button>
                  </Link>
                ) : props?.isRegister ? (
                  <Link className="nav-item" to="/login">
                    <Button
                      bg="black900"
                      hoverBg="primary"
                      shadow="2"
                      hoverShadow="4"
                    >
                      Sign In
                    </Button>
                  </Link>
                ) : (
                  <Button
                    m={{ l: "30px" }}
                    bg="black900"
                    hoverBg="primary"
                    shadow="2"
                    hoverShadow="4"
                    onClick={() => setShowSideDrawer(true)}
                  >
                    Get Started
                  </Button>
                )}
              </Div>
            </Div>
          </Col>
        </Row>
      </Container>
      <BasicSideDrawer
        isOpen={showSideDrawer}
        onClose={() => setShowSideDrawer(false)}
        userLogin={props.userLogin}
      />
    </>
  );
}

function BasicSideDrawer({ isOpen, onClose, userLogin }) {
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

    userLogin(
      formData,
      (res) => {
        setLoading(false);
        toast.success("Welcome back!");
        history.push("/dashboard");
      },
      () => {
        setLoading(false);
      }
    );
  };

  return (
    <SideDrawer isOpen={isOpen} onClose={onClose}>
      <Div textAlign="right">
        <Icon
          cursor="pointer"
          onClick={() => onClose()}
          name="Cross"
          size="30px"
        />
      </Div>
      <Div p={{ y: "2rem" }}>
        <Text textSize="heading">Get Started</Text>
        <Text textColor="black900" textSize="subheader">
          Sign into your <b>TechEventsUK</b> account
        </Text>
      </Div>
      <Div m={{ b: "1rem" }}>
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
      </Div>
      <Div m={{ b: "1rem" }}>
        <Button
          isLoading={loading}
          disabled={loading}
          w="100%"
          onClick={() => handleSubmit()}
          bg="black900"
        >
          Sign In
        </Button>
      </Div>
      <Div d="flex" justify="center">
        <Text>Dont have an account?</Text>
        <Link className="link" to="/register">
          <Text m={{ l: "5px" }}>Register</Text>
        </Link>
      </Div>
    </SideDrawer>
  );
}

function Auth({ auth }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { user } = auth;

  if (!user?.name) {
    return <></>;
  }

  return (
    <Dropdown
      isOpen={showDropdown}
      bg="black900"
      focusBg="black"
      borderColor="black900"
      focusBorderColor="black900"
      textColor="white"
      textWeight="500"
      textAlign="center"
      m={{ l: "30px" }}
      style={{ minWidth: "200px" }}
      onClick={() => setShowDropdown(!showDropdown)}
      menu={
        <Div overflow="hidden">
          <Div p={{ x: "1rem", b: "1rem", t: "1rem" }} bg="gray100">
            <Div align="center" d="flex">
              <Text textSize="caption" textWeight="bold">
                Name:
              </Text>
              <Text
                textSize="caption"
                m={{ l: "5px" }}
                textTransform="capitalize"
              >
                {user?.name}
              </Text>
            </Div>
          </Div>
          <Div h="1px" w="100%" bg="gray200" children="" />
          <Anchor
            tag={Link}
            to="/dashboard"
            className="nav-item-dropdown"
            hoverBg="gray100"
            d="block"
            p={{ x: "1rem", b: "1rem", t: "1rem" }}
          >
            Dashboard
          </Anchor>
          <Div h="1px" w="100%" bg="gray200" children="" />
          <Anchor
            onClick={() => {
              dispatch({
                type: LOGOUT_USER,
                payload: null,
              });
            }}
            className="nav-item-dropdown"
            hoverBg="gray100"
            d="block"
            p={{ x: "1rem", b: "1rem", t: "1rem" }}
          >
            Logout
          </Anchor>
        </Div>
      }
    >
      <Text textTransform="capitalize" d={{ xs: "none", lg: "flex" }}>
        Hi, {user?.name.split(" ")[1]}
      </Text>
      <Text textTransform="capitalize" d={{ xs: "flex", lg: "none" }}>
        Hi, {helper.truncateString(user?.name.split(" ")[1] || "guest", 14)}
      </Text>
    </Dropdown>
  );
}

const mapStateToProps = function (state) {
  return {
    auth: state?.auth,
  };
};

const mapDispatchToProps = {
  userLogin: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
