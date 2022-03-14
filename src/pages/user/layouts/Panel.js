import React, { useState } from "react";
import { Div, Button, SideDrawer, Icon, Text, Image, Row, Col } from "atomize";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import UserIcon from "../../../assets/images/Saly-25.svg";
import { Link } from "react-router-dom";

const ROUTES = [
  {
    title: "Dashboard",
    icon: <Icon name="Draft" size="70px" />,
    route: "/dashboard",
  },
];

const BasicSideDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();

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
        <Text textAlign="left" textSize="heading">
          Manage Account
        </Text>
        <Text textAlign="left" textColor="black900" textSize="subheader">
          Navigate through your account
        </Text>
        <Div p={{ y: "1rem" }}>
          <Row>
            {ROUTES.map((item, index) => {
              return (
                <Col key={index} size="6">
                  <Link to={item?.route}>
                    <Div m={{ y: "1rem" }}>
                      <Div
                        shadow="2"
                        hoverShadow="3"
                        hoverBg="gray100"
                        border="1px solid"
                        borderColor="gray200"
                        rounded="md"
                        d="flex"
                        justify="center"
                        align="center"
                        p={{ y: "2rem" }}
                        pos="relative"
                        overflow="hidden"
                      >
                        {location.pathname.includes(
                          item?.route.replace("/", "")
                        ) ? (
                          <Div bg="secondary" className="panel-active-marker" />
                        ) : null}
                        {item?.icon}
                      </Div>
                      <Text
                        textAlign="center"
                        textColor="black900"
                        m={{ t: "5px" }}
                      >
                        {item?.title}
                      </Text>
                    </Div>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Div>
      </Div>
    </SideDrawer>
  );
};

function Panel(props) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const { user } = props?.auth;

  return (
    <>
      <Div rounded="sm" shadow="3">
        <Div
          h="10rem"
          bg="gray100"
          d="flex"
          justify="flex-start"
          align="flex-end"
          p={{ x: "20px" }}
        >
          <Div rounded="circle" m={{ b: "-30px" }} w="100px" h="100px">
            <Image src={UserIcon} rounded="circle" />
          </Div>
        </Div>
        <Div p={{ t: "30px", y: "20px", x: "20px" }}>
          <Div d="flex" justify="space-between" align="center">
            <Div>
              <Text
                textSize="subheader"
                textWeight="600"
                textTransform="capitalize"
              >
                {user?.name}
              </Text>
            </Div>
            <Div>
              <Button
                onClick={() => setShowSideDrawer(true)}
                h="2.5rem"
                p={{ x: "1rem" }}
                textSize="body"
                textColor="black900"
                hoverTextColor="black900"
                bg="white"
                hoverBg="gray100"
                border="1px solid"
                borderColor="black900"
                hoverBorderColor="black900"
              >
                Manage Account
              </Button>
            </Div>
          </Div>
          <Div d="flex" justify="flex-start" align="center">
            <Icon name="Timestamp" size="20px" />
            <Text textSize="caption" m={{ l: "3px" }}>
              Joined {moment(user?.createdAt).fromNow()}
            </Text>
          </Div>
        </Div>
      </Div>
      <BasicSideDrawer
        isOpen={showSideDrawer}
        onClose={() => setShowSideDrawer(false)}
      />
    </>
  );
}

const mapStateToProps = function (state) {
  return {
    auth: state?.auth,
    home: state?.home,
  };
};

export default connect(mapStateToProps, null)(Panel);
