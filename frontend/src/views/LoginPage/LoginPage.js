import React, { useState } from "react";
import "./LoginPage.css";
import Grid from "@material-ui/core/Grid";
import foodies from "../../images/FoodiesLogo.png";
import fb from "../../images/fb.png";
import appstore from "../../images/app.png";
import playstore from "../../images/play.png";
import SignIN from "../../components/SignIn/SignIN";
import SignUp from "../../components/SignUp/SignUp";
import { Button } from "@material-ui/core";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const changeLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="bgImage">
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <div className="loginpage__main">
            <div>
              <div className="loginpage_rightcomponent">
                <img className="loginpage__logo" src={foodies} />
                <div className="loginPage__signin">
                  {isLogin ? <SignIN /> : <SignUp />}
                  {/* <SignUp /> */}

                  <div className="login__ordiv">
                    <div className="login__dividor"></div>
                    <div className="login__or">OR</div>
                    <div className="login__dividor"></div>
                  </div>

                  <div className="login__fb">
                    <img src={fb} width="15px" style={{ marginRight: "5px" }} />
                    Log in with Facebook
                  </div>
                  <div className="login_forgt"> Forgot password?</div>
                </div>
              </div>

              <div className="loginpage__signupoption">
                {isLogin ? (
                  <div className="loginPage__signin">
                    Don't have an account?{" "}
                    <Button
                      onClick={changeLogin}
                      style={{
                        fontWeight: "normal",
                        color: "#0395F6",
                        marginBottom: "2px",
                      }}
                    >
                      Sign up
                    </Button>
                  </div>
                ) : (
                  <div className="loginPage__signup">
                    Have an account?{" "}
                    <Button
                      onClick={changeLogin}
                      style={{
                        fontWeight: "bold",
                        color: "#0395F6",
                        marginBottom: "2px",
                      }}
                    >
                      Sign in
                    </Button>
                  </div>
                )}
              </div>

              <div className="loginPage__downloadSection">
                <div>Get the app.</div>
                <div className="loginPage__option">
                  <img
                    className="loginPage_dwimg"
                    src={appstore}
                    width="136px"
                  />
                  <img
                    className="loginPage_dwimg"
                    src={playstore}
                    width="136px"
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
