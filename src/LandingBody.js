import React from "react";
import Footer from "./Footer";
import MockUp from "./MockUp";
import QuoteComponent from "./QuoteComponent";
import TriCardComponent from "./TriCardComponent";

function LandingBody() {
  return (
    <>
      <div className="landingBody">
        <TriCardComponent />
        <QuoteComponent />
        <MockUp />
        <Footer />
      </div>
    </>
  );
}

export default LandingBody;
