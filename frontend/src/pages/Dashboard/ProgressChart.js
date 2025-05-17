import React, { useRef, useState, useEffect } from "react"
import axios from "axios"
import {
  Card,
  CardBody,
  Row,
  Col,
  CardTitle,
  Spinner,
  Alert,
  Tooltip,
} from "reactstrap"
import { FaTasks, FaInfoCircle } from "react-icons/fa"
import DonutChart from "../AllCharts/DonutChart"

const ProgressChart = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const cardRef = useRef()

  // If you want, keep this effect to do something when data changes (optional)
  // useEffect(() => {
  //   if (data && cardRef.current) {
  //     console.log("ProgressChart height:", cardRef.current.offsetHeight)
  //   }
  // }, [data])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("user")
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/details/${username}`
        )
        setData({
          total: response.data.totalProbs || 0,
          solved: response.data.solvedProbs || 0,
        })
      } catch (err) {
        setError("Unable to fetch problem data.")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  if (loading) {
    return (
      <Card className="text-center py-5 shadow-sm border-0">
        <CardBody>
          <Spinner color="primary" size="lg" />
          <p className="mt-3 fs-5 text-secondary">Loading problem data...</p>
        </CardBody>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="shadow-sm border-0">
        <CardBody>
          <Alert color="danger" className="mb-0 text-center">
            {error}
          </Alert>
        </CardBody>
      </Card>
    )
  }

  const { total, solved } = data
  const unsolved = Math.max(total - solved, 0)

  return (
    <Card
      ref={cardRef}
      className="shadow-sm border-0 rounded"
      style={{
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        minHeight: "410px",
        cursor: "default",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)"
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)"
      }}
      aria-label="Problems solved progress chart"
    >
      <CardBody>
        <Row className="align-items-center mb-4">
          <Col xs="2" className="text-center text-primary">
            <FaTasks size={36} aria-hidden="true" />
          </Col>
          <Col xs="10" className="d-flex align-items-center">
            <CardTitle
              tag="h4"
              className="mb-0 me-2"
              id="progress-chart-title"
              style={{ userSelect: "none" }}
            >
              Problems Solved
            </CardTitle>
            <FaInfoCircle
              id="tooltip-info"
              size={18}
              className="text-muted"
              style={{ cursor: "pointer", outline: "none" }}
              aria-describedby="tooltip-info"
              tabIndex={0}
              role="button"
              aria-label="More info about problems solved chart"
              onKeyPress={e => e.key === "Enter" && toggleTooltip()}
              onClick={toggleTooltip}
            />
            <Tooltip
              placement="right"
              isOpen={tooltipOpen}
              target="tooltip-info"
              toggle={toggleTooltip}
              delay={{ show: 250, hide: 200 }}
            >
              Visual representation of total vs solved problems
            </Tooltip>
          </Col>
        </Row>

        <Row className="text-center mb-4">
          <Col xs="6" sm="6" md="6" lg="6">
            <h4 className="fw-bold text-primary">{total}</h4>
            <p className="text-muted mb-0">Total</p>
          </Col>
          <Col xs="6" sm="6" md="6" lg="6">
            <h4 className="fw-bold text-success">{solved}</h4>
            <p className="text-muted mb-0">Solved</p>
          </Col>
        </Row>

        <div
          dir="ltr"
          style={{
            maxWidth: "320px",
            margin: "0 auto",
            border: "1px solid primary",
            borderRadius: "8px",
            padding: "1rem",
            animation: "fadeInChart 0.8s ease-in-out",
          }}
        >
          <DonutChart solved={solved} unsolved={unsolved} />
        </div>

        <style>{`
          @keyframes fadeInChart {
            0% { opacity: 0; transform: translateY(15px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </CardBody>
    </Card>
  )
}

export default ProgressChart
