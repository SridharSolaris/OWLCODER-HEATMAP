import React, { useEffect, useState } from "react";
import { Card, Spinner, UncontrolledTooltip } from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setBreadcrumbItems } from "../../store/actions";

// Import fallback avatar
import user6 from "../../assets/images/users/user-6.jpg";

const Profile = (props) => {
  document.title = "Owl Coder HeatMap";

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const breadcrumbItems = [
    { title: "OwlCoder", link: "#" },
    { title: "Pages", link: "#" },
    { title: "Dashboard", link: "#" },
  ];

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems);

    const fetchData = async () => {
      try {
        const username = localStorage.getItem("user");
        if (!username) throw new Error("Username not found in localStorage");

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/details/${username}`
        );
        setData(response.data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props]);

  const user = {
    username: data.username || "user@owlcoder",
    name: data.name || "Student Name",
    branch: data.branch || "Branch Info",
    college: data.clg || "College Info",
    imgUrl: user6,
    socials: [
      {
        id: 1,
        title: "Facebook",
        icon: "fab fa-facebook-f",
        link: "#",
        colorclass: "primary",
      },
      {
        id: 2,
        title: "Twitter",
        icon: "fab fa-twitter",
        link: "#",
        colorclass: "info",
      },
      {
        id: 3,
        title: "mobile",
        icon: "fa fa-phone",
        link: "#",
        colorclass: "danger",
      },
      {
        id: 4,
        title: "skype",
        icon: "fab fa-skype",
        link: "#",
        colorclass: "info",
      },
    ],
  };

  if (loading) {
    return (
      <Card className="text-center p-5">
        <Spinner color="primary" />
        <p className="mt-3">Loading profile...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="text-center p-5">
        <p className="text-danger">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="directory-card shadow-lg border-0">
      <div className="directory-bg text-center position-relative bg-light">
        <div className="directory-overlay pt-4">
          <img
            className="rounded-circle avatar-xl img-thumbnail"
            src={user.imgUrl}
            alt="Profile"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = user6;
            }}
          />
        </div>
      </div>

      <div className="directory-content text-center p-4">
        <h4 className="fw-semibold mt-3">{user.name}</h4>
        <p className="text-muted mb-1">@{user.username}</p>

        <div className="my-3">
          <p className="mb-1 text-muted">
            <i className="fas fa-code-branch me-2"></i>
            {user.branch}
          </p>
          <p className="mb-0 text-muted">
            <i className="fas fa-university me-2"></i>
            {user.college}
          </p>
        </div>

        <hr />

        <h6 className="text-uppercase text-muted mt-4 mb-3">Social Links</h6>
        <ul className="list-inline">
          {user.socials.map((social) => {
            const tooltipId = `social-${social.id}`;
            return (
              <li className="list-inline-item mx-2" key={social.id}>
                <Link
                  to={social.link}
                  className={`btn btn-soft-${social.colorclass} rounded-circle`}
                  id={tooltipId}
                  style={{ width: 40, height: 40, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                >
                  <i className={social.icon}></i>
                </Link>
                <UncontrolledTooltip placement="top" target={tooltipId}>
                  {social.title}
                </UncontrolledTooltip>
              </li>
            );
          })}
        </ul>
      </div>
    </Card>
  );
};

export default connect(null, { setBreadcrumbItems })(Profile);
