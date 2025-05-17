import React, { useState, useEffect } from "react"
import { Card, CardBody, Progress, Row, Col, Spinner, Tooltip } from "reactstrap"
import { FaFeather, FaEarlybirds, FaInfoCircle, FaLayerGroup } from "react-icons/fa"
import { GiEagleHead } from "react-icons/gi"
import axios from "axios"

const LevelProgress = ({ icon: Icon, level, solved, total, iconColor, progressColor }) => {
  const percentage = total > 0 ? ((solved / total) * 100).toFixed(1) : 0

  return (
    <Row className="align-items-center mb-4">
      <Col md="3" className="text-center">
        <Icon color={iconColor} size={50} />
      </Col>
      <Col md="9">
        <h6 className="text-muted mb-1">{level}</h6>
        <div className="d-flex justify-content-between">
          <span className="fw-semibold">{solved}/{total}</span>
          <span className="text-muted">Progress: {percentage}%</span>
        </div>
        <Progress value={percentage} color={progressColor} className="mt-2" />
      </Col>
    </Row>
  )
}

const ProgressBars = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("user")
        const response = await axios.get(`${process.env.REACT_APP_BACKEND}/details/${username}`)
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
        setData({
          easySolved: 0,
          easyTotal: 0,
          mediumSolved: 0,
          mediumTotal: 0,
          hardSolved: 0,
          hardTotal: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Card className="text-center p-5">
        <Spinner color="primary" />
        <p className="mt-3">Loading progress...</p>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm rounded border-0" style={{ minHeight: "410px" }}>
      <CardBody>
        <Row className="align-items-center mb-4">
          <Col xs="2" className="text-center text-info">
            <FaLayerGroup size={36} />
          </Col>
          <Col xs="10" className="d-flex align-items-center">
            <h4 className="card-title mb-0 me-2">Problem Levels</h4>
            <FaInfoCircle
              id="progress-tooltip"
              size={18}
              className="text-muted"
              style={{ cursor: "pointer", outline: "none" }}
              onClick={toggleTooltip}
              role="button"
              tabIndex={0}
              aria-label="More info about problem levels"
            />
            <Tooltip
              placement="right"
              isOpen={tooltipOpen}
              target="progress-tooltip"
              toggle={toggleTooltip}
            >
              Shows progress across Easy, Medium, and Hard problems.
            </Tooltip>
          </Col>
        </Row>

        <LevelProgress
          icon={FaFeather}
          level="Easy"
          solved={data.easySolved}
          total={data.easyTotal}
          iconColor="teal"
          progressColor="success"
        />

        <LevelProgress
          icon={FaEarlybirds}
          level="Medium"
          solved={data.mediumSolved}
          total={data.mediumTotal}
          iconColor="brown"
          progressColor="info"
        />

        <LevelProgress
          icon={GiEagleHead}
          level="Hard"
          solved={data.hardSolved}
          total={data.hardTotal}
          iconColor="chocolate"
          progressColor="warning"
        />
      </CardBody>
    </Card>
  )
}

export default ProgressBars
