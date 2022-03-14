import React, { useState } from "react";
import { Div, Text, Button, SideDrawer, Icon, Image } from "atomize";
import { Link } from "react-router-dom";
import LOGO from "../../assets/images/logo-w.png";

function MobileNav({ isLogin, isRegister }) {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  return (
    <>
      <Button
        className="drawer-toggler"
        h="3rem"
        w="3rem"
        bg="black900"
        hoverBg="black900"
        shadow="2"
        hoverShadow="4"
        rounded="circle"
        d={{ xs: "flex", lg: "none" }}
        onClick={() => setShowSideDrawer(!showSideDrawer)}
      >
        {showSideDrawer ? (
          <Icon name="Cross" color="white" size="20px" />
        ) : (
          <Icon name="Menu" color="white" size="20px" />
        )}
      </Button>
      <BasicSideDrawer
        isOpen={showSideDrawer}
        onClose={() => setShowSideDrawer(false)}
      />
    </>
  );
}

const BasicSideDrawer = ({ isOpen, onClose }) => {
  return (
    <SideDrawer
      left="0px"
      p={{ y: "0px", x: "0px" }}
      w={{ xs: "100vw", sm: "16rem" }}
      d={{ xs: "block", lg: "none" }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Div bg="primary" p={{ y: "1rem", x: "1.5rem" }} textAlign="left">
        <Image src={LOGO} w={{ xs: "150px", lg: "190px" }} />
      </Div>
      <Div p={{ y: "2rem", x: "1.5rem" }}>
        <Div className="mobile-nav-link">
          <Link to="/">
            <Text>Home</Text>
          </Link>
        </Div>
        <Div className="mobile-nav-link">
          <Link to="/about">
            <Text>About</Text>
          </Link>
        </Div>
        <Div className="mobile-nav-link">
          <Link to="/contact">
            <Text>Contact Us</Text>
          </Link>
        </Div>
      </Div>
    </SideDrawer>
  );
};

export default MobileNav;
