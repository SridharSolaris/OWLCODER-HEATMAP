import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardBody, Row, Col, Tooltip } from "reactstrap"
import { FaBolt, FaInfoCircle } from "react-icons/fa"
import "../Dashboard/dash.css"

const StreakBoard = () => {
  const [data, setData] = useState({
    activeDays: 0,
    totalDays: 0,
    currentStreak: 0,
    bestStreak: 0,
    highestStreak: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("user")
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/details/${username}`,
        )
        setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  return (
    <Card className="shadow-sm border-0 rounded" style={{ minHeight: "410px" }}>
      <CardBody>
        <Row className="align-items-center mb-4">
          <Col xs="2" className="text-center text-warning">
            <FaBolt size={36} />
          </Col>
          <Col xs="10" className="d-flex align-items-center">
            <h4 className="card-title mb-0 me-2">Streak</h4>
            <FaInfoCircle
              id="streak-tooltip"
              size={18}
              className="text-muted"
              style={{ cursor: "pointer", outline: "none" }}
              onClick={toggleTooltip}
              role="button"
              tabIndex={0}
              aria-label="More info about streak"
            />
            <Tooltip
              placement="right"
              isOpen={tooltipOpen}
              target="streak-tooltip"
              toggle={toggleTooltip}
            >
              Tracks your activity streaks and consistency.
            </Tooltip>
          </Col>
        </Row>

        <Row className="text-center mt-1 py-4">
          <h5 className="font-size-10">NO OF ACTIVE DAYS (TOTAL)</h5>
          <Col className="mb-3">
            <button className="my-button">{`${data.activeDays}/${data.totalDays}`}</button>
          </Col>

          <h5 className="font-size-10">CURRENT STREAK / BEST STREAK</h5>
          <Col className="mb-3">
            <button className="my-button">{`${data.currentStreak}/${data.bestStreak}`}</button>
          </Col>

          <h5 className="font-size-10">HIGHEST STREAK (OVERALL)</h5>
          <Col>
            <button className="my-button">{`${data.highestStreak}`}</button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default StreakBoard
