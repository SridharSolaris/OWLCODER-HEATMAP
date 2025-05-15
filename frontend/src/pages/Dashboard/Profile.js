import React, { useEffect, Component, useState } from "react"
import { Row, Col, Card, UncontrolledTooltip } from "reactstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import axios from "axios"

// Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

// Import Components

// Import Images
import user6 from "../../assets/images/users/user-6.jpg"
import user11 from "../../assets/images/users/user-11.jpg"
const Profile = props => {
  document.title = "Owl Coder HeatMap"

  const breadcrumbItems = [
    { title: "OwlCoder", link: "#" },
    { title: "Pages", link: "#" },
    { title: "Dashboard", link: "#" },
  ]

  const [data, setData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("user")
        const response = await axios.get(
          `${process.env.BACKEND}/details/${username}`,
        )
        setData(response.data)
        console.log(response.data)
        console.log(username)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    props.setBreadcrumbItems("Dashboard", breadcrumbItems)
  }, [])

  const user = {
    username: data.username,
    socials: [
      {
        id: 1,
        title: "Facebook",
        icon: "fab fa-facebook-f",
        link: "#",
        colorclass: "px-0 btn primary",
      },
      {
        id: 2,
        title: "Twitter",
        icon: "fab fa-twitter",
        link: "#",
        colorclass: "px-0 btn info",
      },
      {
        id: 3,
        title: "mobile",
        icon: "fa fa-phone",
        link: "#",
        colorclass: "px-0 btn danger",
      },
      {
        id: 4,
        title: "skype",
        icon: "fab fa-skype",
        link: "#",
        colorclass: "px-0 btn info",
      },
    ],
    imgUrl: user6,
    name: data.name,
    branch: data.branch,
    college: data.clg,
  }

  return (
    <React.Fragment>
      <Card className="directory-card">
        <div>
          <div className="directory-bg text-center">
            {/* <img
                // className="covered"
                src={user.imgUrl}
                alt="Generic placeholder"
              /> */}
            <div className="directory-overlay">
              <img
                className="rounded-circle avatar-lg img-thumbnail"
                src={user.imgUrl}
                alt="Generic placeholder"
              />
            </div>
          </div>

          <div className="directory-content text-center p-4">
            <p className=" mt-4">{user.name}</p>
            <h5 className="font-size-16">{user.username}</h5>

            <p className="text-muted">
              {user.branch}
              <br /> {user.college}
            </p>
            <hr />
            <h6>Social Media Accounts</h6>
            <ul className="social-links list mb-0 ">
              {user.socials.map((social, key) => (
                <React.Fragment key={key}>
                  <li className="list-inline-item">
                    <Link
                      title=""
                      className={"tooltips btn-" + social.colorclass}
                      id={social.title + user.id}
                      to={social.link}
                    >
                      <i className={social.icon}></i>
                    </Link>
                    <UncontrolledTooltip
                      placement="top"
                      target={social.title + user.id}
                    >
                      {social.title}
                    </UncontrolledTooltip>
                  </li>{" "}
                </React.Fragment>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(Profile)
