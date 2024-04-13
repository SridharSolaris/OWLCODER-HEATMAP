import React, { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap"
import SimpleBar from "simplebar-react"
import { GiTwoCoins } from "react-icons/gi";
import { FaInfo } from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";


//i18n
import { withTranslation } from "react-i18next"

const NotificationDropdown = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block ms-1"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="ti-bell"></i>
          <span className="badge text-bg-danger rounded-pill">3</span>
        </DropdownToggle>

        <DropdownMenu style={{'border-radius': '0.5rem'}} className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h5 className="m-0"> {props.t("Notifications")} (3) </h5>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            <Link to="#" className="text-reset notification-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar me-3">
                    <span className="avatar-title border-success rounded ">
                      <GiTwoCoins/>
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">+1 Points for Daily Check-in</h6>
                  <div className="text-muted">
                    <p className="mb-1">Practice Daily!</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="#" className="text-reset notification-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar me-3">
                    <span className="avatar-title border-warning rounded ">
                      <MdEmojiEvents/>
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">Coding Contest Coming!</h6>
                  <div className="text-muted">
                    <p className="mb-1">Be Ready to Rock</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="#" className="text-reset notification-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar me-3">
                    <span className="avatar-title border-info rounded ">
                      <FaInfo/>
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">APT LOGIC CLASS is Live Now!</h6>
                  <div className="text-muted">
                    <p className="mb-1">It is a long established fact that a preparation worth time</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link to="#" className="text-reset notification-item">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title border-primary rounded-circle ">
                      <i className="mdi mdi-cart-outline"></i>
                    </span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">You're in Top Place</h6>
                  <div className="text-muted">
                    <p className="mb-1">See the LeaderBoard.</p>
                  </div>
                </div>
              </div>
            </Link>
          </SimpleBar>
          <div className="p-2 border-top d-grid">
            <Link
              className="btn btn-sm btn-link font-size-14 btn-block text-center"
              to="#"
            >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              {props.t("View all")}{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default withTranslation()(NotificationDropdown)

NotificationDropdown.propTypes = {
  t: PropTypes.any
}