import React, { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardBody, Row, Col } from "reactstrap"
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

  //   const options = {
  //     colors: ['#ccc', '#7a6fbe', 'rgb(40, 187, 227)'],
  //     chart: {
  //         toolbar: {
  //             show: false,
  //         },
  //     },
  //     dataLabels: {
  //         enabled: false
  //     },
  //     stroke: {
  //         curve: 'smooth',
  //         width: 0.1,
  //     },
  //     grid: {
  //         borderColor: '#f8f8fa',
  //         row: {
  //             colors: ['transparent', 'transparent'],
  //             opacity: 0.5
  //         },
  //     },
  //     xaxis: {
  //         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //         axisBorder: {
  //             show: false
  //         },
  //         axisTicks: {
  //             show: false
  //         }
  //     },
  //     legend: {
  //         show: false
  //     },
  // };

  // const series = [
  //     {
  //         name: 'Series A',
  //         data: [0, 150, 60, 180, 90, 75, 30, 0, 0, 0, 0, 0] // Add zeros for the entire year
  //     },
  //     {
  //         name: 'Series B',
  //         data: [0, 45, 150, 36, 60, 240, 30, 0, 0, 0, 0, 0] // Add zeros for the entire year
  //     },
  //     {
  //         name: 'Series C',
  //         data: [0, 15, 195, 21, 360, 120, 30, 0, 0, 0, 0, 0] // Add zeros for the entire year
  //     }
  // ];

  return (
    <React.Fragment>
      <Card>
        <CardBody className="">
          <h4 className="card-title mb-4 ">Streak</h4>
          <Row className="text-center mt-1 py-4">
            <row>
              <h5 className="font-size-10">NO OF ACTIVE DAYS(TOTAL)</h5>
            </row>
            <row p-5>
              <Col md="3"></Col>
              <Col md="">
                <button className="my-button">{`${data.activeDays}/${data.totalDays}`}</button>
              </Col>
              <Col md="3"></Col>
            </row>
            <h5 className="font-size-10">CURRENT STREAK/BEST STREAK</h5>
            <row p-5>
              <Col md="3"></Col>
              <Col md="">
                <button className="my-button">{`${data.currentStreak}/${data.bestStreak}`}</button>
              </Col>
              <Col md="3"></Col>
            </row>
            <h5 className="font-size-10">HIGHEST STREAK(OVERALL)</h5>
            <row p-5>
              <Col md="3"></Col>
              <Col md="12">
                <button className="my-button">{`${data.highestStreak}`}</button>
              </Col>
              <Col md="3"></Col>
            </row>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )

  // return (
  //   <React.Fragment>
  //     <Card>
  //       <CardBody>
  //         <h4 className="card-title mb-4">Streak</h4>
  //         <Row className="text-center mt-1">
  //           <Col md="4">
  //             <h5 className="font-size-10">NO OF ACTIVE DAYS(TOTAL)</h5>
  //             <button className="my-button">{`${data.activeDays}/${data.totalDays}`}</button>
  //           </Col>
  //           <Col md="4">
  //             <h5 className="font-size-10">CURRENT STREAK/BEST STREAK</h5>
  //             <button className="my-button">{`${data.currentStreak}/${data.bestStreak}`}</button>
  //           </Col>
  //           <Col md="4">
  //             <h5 className="font-size-10">HIGHEST STREAK(OVERALL)</h5>
  //             <button className="my-button">{`${data.highestStreak}`}</button>
  //           </Col>
  //         </Row>
  //       </CardBody>
  //     </Card>
  //   </React.Fragment>
  // );
}

export default StreakBoard
