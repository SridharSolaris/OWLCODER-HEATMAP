import React, { useEffect, useState } from "react"
import { Card, CardBody } from "reactstrap"
import * as echarts from "echarts"
import axios from "axios"


const HeatMap = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("user")
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/details/${username}`,
        )
        setData(response.data.calendarData)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const chartDom = document.getElementById("main")
    const myChart = echarts.init(chartDom)

    const getVirtualData = () => {
      const result = data.map(item => [item.date, item.count])
      return result
    }

    const filteredData = getVirtualData()
      .filter(item => item[1] > 45)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)

    const option = {
      darkMode: true,
      title: {
        top: 20,
        left: "center",
        text: "Heat Map",
        textStyle: {
          color: "#B9B8CE",
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "#333",
        borderColor: "#666",
        borderWidth: 2,
        padding: 10,
        textStyle: {
          fontSize: 14,
          color: "#fff",
        },
        extraCssText: "border-radius: 5px;",
        formatter: function (params) {
          return (
            "Date: " + params.value[0] + "<br/>" + "Count: " + params.value[1]
          )
        },
      },
      visualMap: [
        {
          seriesIndex: 0,
          min: 1,
          max: 51,
          type: "continuous",
          orient: "horizontal",
          left: "center",
          top: 50,
          textStyle: {
            color: "#ccccca",
          },
          inRange: {
            color: ["#c6e48b", "#7bc96f", "#239a3b", "#196127"],
          },
        },
        {
          show: false,
          seriesIndex: 1,
          inRange: {
            color: ["yellow"],
          },
        },
      ],
      calendar: {
        top: 120,
        left: "center",
        width: "95%",
        cellSize: ["auto", 15],
        range: "2024", // Adjusted to match the year of the data
        splitLine: {
          show: true,
          lineStyle: {
            color: "#000",
            width: 4,
            type: "solid",
          },
        },
        itemStyle: {
          color: "#323c48",
          borderWidth: 1,
          borderColor: "#111",
        },
        yearLabel: { show: false },
        monthLabel: {
          show: true,
          nameMap: "en",
          align: "left",
          color: "#ccccca",
        },
      },
      series: [
        {
          data: getVirtualData(),
          name: `Submissions (${data})`,
          type: "heatmap",
          coordinateSystem: "calendar",
        },
        {
  name: "Top 3",
  type: "effectScatter",
  coordinateSystem: "calendar",
 symbol: "image://images/icon1.svg",
  symbolSize: 60,
  symbolKeepAspect: true,
  showEffectOn: "render",
  rippleEffect: {
    color: "red",
    brushType: "fill",
    scale: 1,
  },
  tooltip: {
    show: false,
  },
  itemStyle: {
    color: "orange",
    shadowBlur: 50,
    shadowColor: "orange",
  },
  data: filteredData,
  zlevel: 1,
},
      ],
      backgroundColor: "#100C2A",
    }

    option && myChart.setOption(option)

    // Clean up
    return () => {
      myChart.dispose()
    }
  }, [data])

  return (
    <Card>
  <CardBody style={{ overflowX: "auto" }}>
    <div id="main" style={{ width: "1500px", height: "300px" }}></div>
  </CardBody>
</Card>

  )
}

export default HeatMap

//HeatMap2
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, CardBody } from 'reactstrap';
// import HeatMap from '@uiw/react-heat-map';
// import Tooltip from "@uiw/react-tooltip";
// import ActivityCalendar from 'react-activity-calendar';
// const MyChart = () => {
//   const [data, setData] = useState(null); // Initialize with null

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const username = localStorage.getItem('user');
//         const response = await axios.get(`http://localhost:9000/details/${username}`);
//         const transformedData = response.data.calendarData.map(item => ({
//           date: item.date,
//           count: item.count
//         }));
//         setData(transformedData);
//         console.log(transformedData);
//         console.log(username);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (

//     <Card>
//       <CardBody>
//         {data && (
//           <HeatMap
//           rectSize={20}
//             value={data}
//             width='100%'
//             height={200}
//             panelColors={{
//               1: '#606060',
//               26:"#c6e48b",51: "#7bc96f",76: "#239a3b", 101:"#196127",
//             }}
//             style={{color: 'purple', '--rhm-rect': '#b9b9b9' }}
//             startDate={new Date('2024-01-01')} // Specify a valid start date
//             mode='light'
//             radius='50%'
//             rectRender={(props, data) => {
//         // if (!data.count) return <rect {...props} />;
//         return (
//           <Tooltip placement="top" content={`count: ${data.count || 0}`}>
//             <rect {...props} />
//           </Tooltip>
//         );
//       }}
//           />
//         )}
//       </CardBody>
//     </Card>
//   );
// };

// export default MyChart;
