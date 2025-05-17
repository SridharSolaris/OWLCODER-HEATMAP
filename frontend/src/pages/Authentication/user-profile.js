import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  Spinner,
} from "reactstrap";
import Profile from "pages/Dashboard/Profile";
import * as Yup from "yup";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "components/Common/withRouter";

import { editProfile, resetProfileFlag } from "../../store/actions";

const UserProfile = () => {
  const dispatch = useDispatch();

  // State for user data loading
  const [loadingUser, setLoadingUser] = useState(true);

  // Better naming for userId
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  // Select redux state slice for profile errors/success
  const selectProfileState = (state) => state.Profile;
  const ProfileProperties = createSelector(selectProfileState, (profile) => ({
    error: profile.error,
    success: profile.success,
  }));

  const { error, success } = useSelector(ProfileProperties);

  // Set document title and load user data from localStorage once
  useEffect(() => {
    document.title = "Profile | OwlCoder";

    const loadUser = () => {
      try {
        const authUserStr = localStorage.getItem("authUser");
        if (!authUserStr) throw new Error("User not found in localStorage");

        const obj = JSON.parse(authUserStr);
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
          setUsername(obj.displayName || "");
          setEmail(obj.email || "");
          setUserId(obj.uid || "");
        } else if (
          process.env.REACT_APP_DEFAULTAUTH === "fake" ||
          process.env.REACT_APP_DEFAULTAUTH === "jwt"
        ) {
          setUsername(obj.username || "");
          setEmail(obj.email || "");
          setUserId(obj.uid || "");
        }
      } catch (err) {
        console.error("Error loading user from localStorage", err);
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  // Reset profile success/error flags after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timeout = setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [dispatch, success, error]);

  // Formik validation & submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: username || "",
      userId: userId || "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    },
  });

  if (loadingUser) {
    return (
      <Container fluid className="text-center p-5">
        <Spinner color="primary" />
        <p className="mt-3">Loading user data...</p>
      </Container>
    );
  }

  return (
    <>
      <div className="page-content p-0">
        <Container fluid>
          <Row>
            <Col lg="12">
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}

              <Profile />
            </Col>
          </Row>

          <h4 className="card-title mb-4 d-flex align-items-center">
            {/* You can add an icon here if you want */}
            <i className="fas fa-user-edit me-2"></i> Change User Name
          </h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={formik.handleSubmit}
                noValidate
              >
                <div className="form-group">
                  <Label htmlFor="username" className="form-label">
                    User Name
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    invalid={
                      formik.touched.username && formik.errors.username
                        ? true
                        : false
                    }
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <FormFeedback type="invalid">
                      {formik.errors.username}
                    </FormFeedback>
                  ) : null}
                  <Input name="userId" value={userId} type="hidden" />
                </div>

                <div className="text-center mt-4">
                  <Button type="submit" color="danger" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? "Updating..." : "Update User Name"}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default withRouter(UserProfile);
