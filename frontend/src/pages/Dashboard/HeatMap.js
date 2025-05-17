import React, { useEffect, useState, useRef } from "react"
import { Card, CardBody, Row, Col, Tooltip } from "reactstrap"
import * as echarts from "echarts"
import axios from "axios"
import { FaFire, FaInfoCircle } from "react-icons/fa"

const HeatMap = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("user")
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/details/${username}`
        )
        setData(response.data.calendarData || [])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getFormattedData = () => {
    return data.map(item => [item.date, item.count])
  }

  const getTopSubmissions = () => {
    return getFormattedData()
      .filter(item => item[1] > 45)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  }

  const renderChart = () => {
    if (!chartRef.current) return

    if (chartInstance.current) {
      chartInstance.current.dispose()
    }

    const chart = echarts.init(chartRef.current)
    chartInstance.current = chart

    const option = {
      darkMode: true,
      backgroundColor: "#100C2A",
      tooltip: {
        trigger: "item",
        position: function (point, params, dom, rect, size) {
          const [x, y] = point
          const { contentSize, viewSize } = size
          let posX = x
          let posY = y

          if (x + contentSize[0] > viewSize[0]) {
            posX = x - contentSize[0]
          }
          if (y + contentSize[1] > viewSize[1]) {
            posY = y - contentSize[1]
          }
          return [posX, posY]
        },
        formatter: params =>
          `<strong>${params.value[1]} solved</strong><br/>📅 ${params.value[0]}`,
        backgroundColor: "#222",
        borderColor: "#444",
        borderWidth: 2,
        padding: 10,
        extraCssText: "border-radius: 5px;",
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
      },
      visualMap: [
        {
          min: 1,
          max: 51,
          type: "continuous",
          orient: "horizontal",
          left: "center",
          top: 50,
          textStyle: { color: "#ccccca" },
          inRange: {
            color: ["#c6e48b", "#7bc96f", "#239a3b", "#196127"],
          },
        },
      ],
      calendar: {
        top: 120,
        left: "center",
        width: "95%",
        cellSize: ["auto", 20],
        range: "2024",
        splitLine: {
          show: true,
          lineStyle: {
            color: "#100C2A",
            width: 4,
          },
        },
        itemStyle: {
          color: "#323c48",
          borderWidth: 1,
          borderColor: "#111",
        },
        yearLabel: { show: false },
        monthLabel: {
          nameMap: "en",
          margin: 15,
          color: "#999",
        },
        dayLabel: { show: false },
      },
      series: [
        {
          type: "heatmap",
          coordinateSystem: "calendar",
          data: getFormattedData(),
          name: "Submissions",
        },
        {
          type: "effectScatter",
          coordinateSystem: "calendar",
          data: getTopSubmissions(),
          symbol: "image://images/icon1.svg",
          symbolSize: 40,
          symbolKeepAspect: true,
          rippleEffect: {
            color: "red",
            brushType: "fill",
            scale: 1,
          },
          itemStyle: {
            color: "orange",
            shadowBlur: 50,
            shadowColor: "orange",
          },
          zlevel: 1,
          tooltip: { show: true },
        },
      ],
    }

    chart.setOption(option)

    // Resize on window change
    window.addEventListener("resize", chart.resize)
    return () => {
      window.removeEventListener("resize", chart.resize)
      chart.dispose()
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      renderChart()
    }
  }, [data])

  return (
  <Card className="shadow-sm border-0" style={{ minHeight: "410px" }}>
    <CardBody>
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <div className="d-flex align-items-center gap-2 justify-content-center">
            <FaFire size={36} className="text-danger" />
            <h4 className="card-title mb-0 text-center">Submissions Heatmap</h4>
            <FaInfoCircle
              id="heatmap-tooltip"
              size={18}
              className="text-muted "
              style={{ cursor: "pointer", outline: "none" }}
              onClick={toggleTooltip}
              role="button"
              tabIndex={0}
              aria-label="More info about submission heatmap"
            />
            <Tooltip
              placement="right"
              isOpen={tooltipOpen}
              target="heatmap-tooltip"
              toggle={toggleTooltip}
            >
              Visualizes your daily submission activity throughout the year.
            </Tooltip>
          </div>
        </Col>
      </Row>

      {loading ? (
        <div style={{ color: "#fff", textAlign: "center" }}>
          Loading Heatmap...
        </div>
      ) : (
        <div
          ref={chartRef}
          id="main"
          style={{ width: "100%", minWidth: "800px", height: "350px" }}
        />
      )}
    </CardBody>
  </Card>
)

}

export default HeatMap
