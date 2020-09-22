import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

function Footer() {
  return (
    <div>
      <footer>
        <div className="footerContainer">
          <div>
            <hr className="divider" />
            <div className="rsiconContainer">
              <FacebookIcon className="RS" />
              <InstagramIcon className="RS" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
