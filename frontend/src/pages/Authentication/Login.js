// import React from 'react'
// import { Link } from 'react-router-dom';
// import { Container, Row, Col, Card, CardBody, Label, Form, Alert, Input, FormFeedback } from 'reactstrap';
// import logoDark from "../../assets/images/logo-dark.png";
// import logoLight from "../../assets/images/logo-dark.png";
// import { useSelector, useDispatch } from "react-redux";
// import { createSelector } from "reselect";
// import PropTypes from "prop-types";

// // Formik validation
// import * as Yup from "yup";
// import { useFormik } from "formik";
// import withRouter from 'components/Common/withRouter';

// // actions
// import { loginUser, socialLogin } from "../../store/actions";

// const Login = props => {
//   document.title = "Login | Lexa - Responsive Bootstrap 5 Admin Dashboard";

//   const dispatch = useDispatch();

//   const validation = useFormik({
//     // enableReinitialize : use this  flag when initial values needs to be changed
//     enableReinitialize: true,

//     initialValues: {
//       email: "admin@themesbrand.com" || '',
//       password: "123456" || '',
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Please Enter Your Email"),
//       password: Yup.string().required("Please Enter Your Password"),
//     }),
//     onSubmit: (values) => {
//       dispatch(loginUser(values, props.router.navigate));
//     }
//   });

//   const selectLoginState = (state) => state.Login;
//   const LoginProperties = createSelector(
//     selectLoginState,
//     (login) => ({
//       error: login.error
//     })
//   );

//   const {
//     error
//   } = useSelector(LoginProperties);

//   const signIn = type => {
//     dispatch(socialLogin(type, props.router.navigate));
//   };

//   //for facebook and google authentication
//   const socialResponse = type => {
//     signIn(type);
//   };

//    return (
//     <React.Fragment>
//       <div className="account-pages my-5 pt-sm-5">
//         <Container>
//           <Row className="justify-content-center">
//             <Col md={8} lg={6} xl={5}>
//               <Card className="overflow-hidden">
//                 <CardBody className="pt-0">

//                   <h3 className="text-center mt-5 mb-4">
//                     <Link to="/" className="d-block auth-logo">
//                       <img src={logoDark} alt="" height="30" className="auth-logo-dark" />
//                       <img src={logoLight} alt="" height="30" className="auth-logo-light" />
//                     </Link>
//                   </h3>

//                   <div className="p-3">
//                     <h4 className="text-muted font-size-18 mb-1 text-center">Welcome Back !</h4>
//                     <p className="text-muted text-center">Sign in to continue to Lexa.</p>
//                     <Form
//                       className="form-horizontal mt-4"
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         validation.handleSubmit();
//                         return false;
//                       }}
//                     >
//                       {error ? <Alert color="danger">{error}</Alert> : null}
//                       <div className="mb-3">
//                         <Label htmlFor="username">Username</Label>
//                         <Input
//                           name="email"
//                           className="form-control"
//                           placeholder="Enter email"
//                           type="email"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           value={validation.values.email || ""}
//                           invalid={
//                             validation.touched.email && validation.errors.email ? true : false
//                           }
//                         />
//                         {validation.touched.email && validation.errors.email ? (
//                           <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
//                         ) : null}
//                       </div>
//                       <div className="mb-3">
//                         <Label htmlFor="userpassword">Password</Label>
//                         <Input
//                           name="password"
//                           value={validation.values.password || ""}
//                           type="password"
//                           placeholder="Enter Password"
//                           onChange={validation.handleChange}
//                           onBlur={validation.handleBlur}
//                           invalid={
//                             validation.touched.password && validation.errors.password ? true : false
//                           }
//                         />
//                         {validation.touched.password && validation.errors.password ? (
//                           <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
//                         ) : null}
//                       </div>
//                       <Row className="mb-3 mt-4">
//                         <div className="col-6">
//                           <div className="form-check">
//                             <input type="checkbox" className="form-check-input" id="customControlInline" />
//                             <label className="form-check-label" htmlFor="customControlInline">Remember me
//                             </label>
//                           </div>
//                         </div>
//                         <div className="col-6 text-end">
//                           <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Log In</button>
//                         </div>
//                       </Row>
//                       <Row className="form-group mb-0">
//                         <Link to="/forgot-password" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
//                         <div className="col-12 mt-4 d-flex justify-content-center">
//                           <Link
//                             to="#"
//                             className="social-list-item bg-danger text-white border-danger"
//                             onClick={e => {
//                               e.preventDefault();
//                               socialResponse("google");
//                             }}
//                           >
//                             <i className="mdi mdi-google" />
//                           </Link>
//                         </div>
//                       </Row>
//                     </Form>
//                   </div>
//                 </CardBody>
//               </Card>

//               <div className="mt-5 text-center">
//                 <p>Don't have an account ? <Link to="/register" className="text-primary"> Signup Now </Link></p>
//                 © {new Date().getFullYear()} Lexa <span className="d-none d-sm-inline-block"> - Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand.</span>
//               </div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//     </React.Fragment>
//   )
// }

// export default withRouter(Login);

// Login.propTypes = {
//   history: PropTypes.object,
// };

// import axios from 'axios';
// import React, { useState } from 'react';

// const Form1 = () => {
//     const [Logindata, setLogindata] = useState({
//         "username":"",
//         "password":""
//     })

//     const handleLogin = () => {
//         axios.post('http://localhost:9000/getlogins', Logindata).then((res) => {
//             if (res.data === null) {
//                 alert('User Not Found')
//             } else if (res.data === false) {
//                 alert('Invalid Password')
//             } else {
//                 localStorage.setItem('user', Logindata.username);
//                 alert(localStorage.getItem('user'))
//                 window.location.href='/'
//             }
//         })
//     }

//     return (
//         <center>
//             <div className="login-container" style={{ padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '300px' }}>
//                 <h2 style={{ marginBottom: '30px', fontWeight: 'bold' }}>Login</h2>
//                 <label htmlFor="username" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Username:</label>
//                 <input type="text" id="username" name="username" value={Logindata.username} onChange={(e) => setLogindata({...Logindata, username: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
//                 <label htmlFor="password" style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Password:</label>
//                 <input type="password" id="password" name="password" value={Logindata.password} onChange={(e) => setLogindata({...Logindata, password: e.target.value})} required style={{ width: '100%', padding: '10px', marginBottom: '30px', borderRadius: '5px', border: '1px solid #ccc' }} />
//                 <button onClick={handleLogin} style={{ background: '#ffed94', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Login</button>
//             </div>
//         </center>
//     );
// };

// export default Form1;

import axios from "axios"
import React, { useState } from "react"

import { Link } from "react-router-dom"
import { Row, Col, CardBody, Card, Container, Input, Form } from "reactstrap"

// import images
import { GiOwl } from "react-icons/gi"
const Login = () => {
  const [Logindata, setLogindata] = useState({
    username: "",
    password: "",
  })

  const handleLogin = event => {
    event.preventDefault()
    axios.post("http://localhost:9000/getlogins", Logindata).then(res => {
      if (res.data === null) {
        alert("User Not Found")
      } else if (res.data === false) {
        alert("Invalid Password")
      } else {
        localStorage.setItem("user", Logindata.username)
        alert(localStorage.getItem("user"))
        window.location.href = "/"
      }
    })
  }
  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-3 mb-3">
                    <Link to="/" className="d-block auth-logo">
                      <GiOwl
                        color="maroon"
                        size={80}
                        className="auth-logo-dark"
                      />
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      Welcome Back !
                    </h4>
                    <p className="text-muted text-center">
                      Sign in to continue to OwlCoder.
                    </p>
                    <Form
                      className="form-horizontal mt-4"
                      onSubmit={handleLogin}
                    >
                      <div className="mb-3">
                        <Input
                          name="username"
                          id="username"
                          label="Username"
                          value={Logindata.username}
                          onChange={e =>
                            setLogindata({
                              ...Logindata,
                              username: e.target.value,
                            })
                          }
                          className="form-control"
                          placeholder="Test User: 21A91A05I2"
                          type="text"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <Input
                          name="password"
                          label="Password"
                          id="password"
                          value={Logindata.password}
                          onChange={e =>
                            setLogindata({
                              ...Logindata,
                              password: e.target.value,
                            })
                          }
                          type="password"
                          required
                          placeholder="Test Pswd: Owl@123"
                        />
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-6">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-6 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                      <div className="form-group mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/page-recoverpw" className="text-muted">
                            <i className="mdi mdi-lock"></i> Forgot your
                            password?
                          </Link>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link to="/register" className="text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} OwlCoder HeatMap Report
                  Generation
                  <span className="d-none d-sm-inline-block">
                    {" "}
                    - Developed by ProjectSpace Team22.
                  </span>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Login
