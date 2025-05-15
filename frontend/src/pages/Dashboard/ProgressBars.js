import React, { useState, useEffect } from "react"; 
import { Card, CardBody, Progress, Row, Col } from "reactstrap"
import { FaFeather } from "react-icons/fa6"
import { FaEarlybirds } from "react-icons/fa"
import { GiEagleHead } from "react-icons/gi"
import axios from "axios";
const ProgressBars = ({ easy, medium, hard }) => {
  const totalProblems = easy + medium + hard;
  const easyPercentage = (easy / totalProblems)// 0.5 * 100;
  const mediumPercentage = 0.25 * 100 //(medium / totalProblems)/ 0.25 * 100;
  const hardPercentage = 0.75 * 100 //(hard / totalProblems)/ 0.75 * 100
  
  const [data, setData] = useState([]);

  const username = localStorage.getItem('user')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('user');
        const response = await axios.get(`http://localhost:9000/details/${username}`);
        setData(response.data);
        console.log(response.data);
        console.log(username);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  
  return (
    <React.Fragment>
      <Card>
      
        <CardBody >
          <h4 className="card-title">Problem Levels</h4>
          <Row p-6 className="flex space-between">
            <Col md="3">
              <FaFeather color="teal" size={50} />
            </Col>
            <Col md="8">
            <div className="space-y-2">
                <div className="flex w-full items-end text-xs">
                  <div className=" text-label-3 dark:text-dark-label-3 fs-5">
                    Easy
                  </div>
                  <div className="flex flex-1 items-center">
                <span className="mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1 float-end">
                {data.easySolved}/{data.easyTotal}
                </span>
              </div>
                  <div className="lc-lg:hidden lc-xl:inline text-label-3 dark:text-dark-label-3">
                    <span className="space-x-1.5">
                      <span>Progress</span>
                      <span className="font-medium text-label-2 dark:text-dark-label-2">
                        : {(data.easySolved/data.easyTotal)*100}%
                      </span>
                    </span>
                  </div>
                </div>
                <Progress
                  value={(data.easySolved/data.easyTotal)*100}
                  color="success"
                  className="mt-2"
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row p-6 className="flex space-between">
            <Col md="3">
              <FaEarlybirds color="brown" size={50} />
            </Col>
            <Col md="8">
              <div className="space-y-2">
                <div className="flex w-full items-end text-xs">
                  <div className="w-[53px] text-label-3 dark:text-dark-label-3 fs-5">
                    Medium
                  </div>
                  <div className="flex flex-1 items-center">
                <span className="float-end text-right mr-[5px] text-base items-end font-medium leading-[20px] float-end text-label-2 dark:text-dark-label-2">
                  {data.mediumSolved}/{data.mediumTotal}
                </span>
              </div>
              <div className="lc-lg:hidden lc-xl:inline text-label-3 dark:text-dark-label-3">
                <span className="space-x-1.5">
                  <span>Progress</span>
                  <span className="font-medium text-label-2 dark:text-dark-label-2">
                  : {(data.mediumSolved/data.mediumTotal)*100}%
                  </span>
                </span>
              </div>
                </div>
                <Progress
                  value={(data.mediumSolved/data.mediumTotal)*100}
                  color="info"
                  className="mt-2"
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row p-6 className="flex space-between">
            <Col md="3">
              <GiEagleHead color="chocolate" size={50} />
            </Col>
            <Col md="8">
              <div className="space-y-2">
                <div className="flex w-full items-end text-xs">
                  <div className=" text-label-3 dark:text-dark-label-3 fs-5">
                    Hard
                  </div>
                  <div className="flex flex-1 items-center">
                <span className="mr-[5px] text-base font-medium leading-[20px] text-label-1 dark:text-dark-label-1 float-end">
                  {data.hardSolved}/{data.hardTotal}
                </span>
                
              </div>
              <div className="lc-lg:hidden lc-xl:inline text-label-3 dark:text-dark-label-3">
                <span className="space-x-1.5">
                  <span>Progress</span>
                  <span className="font-medium text-label-2 dark:text-dark-label-2">
                  : {(data.hardSolved/data.hardTotal)*100}%
                  </span>
                </span>
              </div>
                </div>
                <Progress
                  value={(data.hardSolved/data.hardTotal)*100}
                  color="warning"
                  className="mt-2"
                />
              </div>
            </Col>
          </Row>
        </CardBody>
      
      </Card>

    </React.Fragment>
  )
}

export default ProgressBars;

