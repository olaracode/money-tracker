import React from "react";
import { Box, CircularProgress, Grid, Paper } from "@material-ui/core";

function QuoteComponent() {
  return (
    <div className="quoteComponent">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fill-opacity="1"
          d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,170.7C560,203,640,213,720,186.7C800,160,880,96,960,101.3C1040,107,1120,181,1200,202.7C1280,224,1360,192,1400,176L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
        ></path>
      </svg>
      <div className="quoteContainer">
        <h3 className="quoteH3">
          'Solo puede haber economia cuando hay eficiencia'
        </h3>
        <p className="quoteP">-Benjamin Desraeli</p>
      </div>
      <div className="quoteStatsContainer">
        <Grid container spacing={10}>
          <Grid item xs={12} sm={4}>
            <Paper>
              <div className="quotesPaperContainer">
                <h1 className="statsH1">50%</h1>
              </div>
              <p className="statsP">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <div className="quotesPaperContainer">
                <h1 className="statsH1">20%</h1>
              </div>
              <p className="statsP">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <div className="quotesPaperContainer">
                <h1 className="statsH1">80%</h1>
              </div>
              <p className="statsP">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
      <svg className="quoteWaveBot" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fill-opacity="1"
          d="M0,64L40,90.7C80,117,160,171,240,186.7C320,203,400,181,480,144C560,107,640,53,720,80C800,107,880,213,960,234.7C1040,256,1120,192,1200,144C1280,96,1360,64,1400,48L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default QuoteComponent;
