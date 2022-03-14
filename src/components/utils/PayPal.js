import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import scriptLoader from "react-async-script-loader";
import { Icon } from "atomize";
import helper from "../helper";

let CLIENT_ID = process.env.REACT_APP_PAYPAL_KEY;

let PayPalButton = null;
class Paypal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showButtons: false,
      loading: true,
      paid: false,
    };

    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  // set new client ID before component did mount from this.props?.token

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM,
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    const { user, plan } = this.props;
    return actions.order.create({
      purchase_units: [
        {
          description: plan?.body,
          amount: {
            currency_code: "USD",
            value: plan?.price,
          },
        },
      ],
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then((details) => {
      toast("Payment Approved", {
        position: "top-right",
        type: "success",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      this.props.handleSuccess("paypal", { reference: data.orderID });
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;
    const { plan } = this.props;

    return (
      <div className="paypal-container">
        {loading && (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="Loading" size="50px" color="black900" />
          </div>
        )}

        {showButtons && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <span>Amount:</span>
              <h1 style={{ fontSize: "30px", marginLeft: "5px" }}>
                ${helper.formatToMoney(plan?.price || 0)}
              </h1>
            </div>
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
        )}

        {paid && (
          <h2>
            Congrats! your payment has been made successfully{" "}
            <span role="img" aria-label="emoji">
              {" "}
              😉
            </span>
          </h2>
        )}
      </div>
    );
  }
}

export default scriptLoader(
  `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`
)(Paypal);
