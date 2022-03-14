import React from "react";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, history } from "./redux/store";

import { StyleReset, ThemeProvider, Div } from "atomize";

import Navigation from "./navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const debug =
  process.env.REACT_APP_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

const theme = {
  colors: {
    black900: "#2b2a2e",
    primary: "#000000",
    secondary: "#ed3837",
  },
  transition: {
    custom: "transform 0.8s linear",
  },
};

export default function App() {
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            flex: 1,
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      }
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <StyletronProvider value={engine} debug={debug} debugAfterHydration>
        <ThemeProvider theme={theme}>
          <StyleReset />
          <Provider store={store}>
            <Router history={history}>
              <Div textWeight="300">
                <Navigation />
              </Div>
            </Router>
          </Provider>
        </ThemeProvider>
      </StyletronProvider>
    </React.Suspense>
  );
}
