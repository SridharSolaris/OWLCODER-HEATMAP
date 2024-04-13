// import React, { useState } from "react"
// import { Card, CardBody,Row,CardTitle } from "reactstrap"
// import DonutChart from '../AllCharts/DonutChart';
// import axios from "axios";

// const MonthlyEarnings = async(props) => {
//     const [data,setData] = useState([]);

//     await axios.get('http://localhost:9000/getdetails')
//     .then((res) => {
//         console.log(res.data);
//         setData(res.data);
//     })

//     return (
//         <React.Fragment>
//             <Card>
//                 <CardBody>
//                     <CardTitle className="h4 mb-4"> Problems Solved </CardTitle>
//                     {
//                         data.map((item,ind) => {
//                             return( <Row className="text-center mt-4" key={ind}>
//                             <div className="col-6">
//                                 <h4 className="font-size-20">{item.totalProbs}</h4>
//                                 <p className="text-muted">Total</p>
//                             </div>
//                             <div className="col-6">
//                                 <h4 className="font-size-20">{item.solvedProbs}</h4>
//                                 <p className="text-muted">Solved</p>
//                             </div>
//                         </Row>)
//                         })
//                     }

                    
//                     <div dir="ltr">
//                         <DonutChart />
//                     </div>

//                 </CardBody>
//             </Card>
//         </React.Fragment>
//     )

// }

// export default MonthlyEarnings
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, Row, CardTitle } from "reactstrap";
import DonutChart from "../AllCharts/DonutChart";

const ProgressChart = (props) => {
  const [data, setData] = useState({
    totalProbs: 0,
    solvedProbs: 0,
  });

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
        <CardBody className="bg-emerald-300">
          <CardTitle className="h4 mb-4">Problems Solved</CardTitle>
          <Row className="text-center mt-4">
            <div className="col-6">
              <h4 className="font-size-20">{data.totalProbs}</h4>
              <p className="text-muted">Total</p>
            </div>
            <div className="col-6">
              <h4 className="font-size-20">{data.solvedProbs}</h4>
              <p className="text-muted">Solved</p>
            </div>
          </Row>
          <div dir="ltr">
            <DonutChart />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default ProgressChart;
