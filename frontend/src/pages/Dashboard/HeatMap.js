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
        width: "90%",
        cellSize: ["auto", 20],
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
          symbol:
            "path://M70.574 17.27l-4.87 18.044c24.228 6.543 46.02 15.573 65.478 26.704-21.276 15.76-35.307 42.705-35.307 73.314 0 13.593 2.77 26.463 7.707 37.955-21.82 20.365-35.004 49.398-35.004 87.504 0 70.68 42.857 131.724 104.85 161.005l-30.71 70.36h20.376l27.594-63.216c3.01 1.077 6.05 2.09 9.13 3.02 3.56 2.76 7.186 5.25 10.868 7.487l-13.03 52.71h19.28l10.945-44.32c6.856 2.546 13.842 4.224 20.9 5.007v39.312h18.69V452.8c7.872-.906 15.65-2.936 23.255-6.056l11.212 45.412h19.25l-13.44-54.418c3.4-2.222 6.75-4.66 10.036-7.343 3.22-1.07 6.398-2.226 9.537-3.456l28.46 65.216h20.376l-31.8-72.863c59.226-30.165 99.74-89.782 99.74-158.502 0-37.114-12.51-65.62-33.32-85.897 5.383-11.896 8.435-25.327 8.435-39.56 0-30.5-13.928-57.36-35.073-73.144 19.638-11.334 41.452-20.41 65.396-26.876l-4.87-18.043c-26.26 7.092-50.213 17.245-71.75 30-34.084-18.84-77.19-28.164-120.214-28.114-40.908.048-81.73 8.575-114.655 25.448-20.227-11.394-42.7-20.644-67.47-27.333zM252.707 38.67c36.446-.044 72.955 6.705 102.084 20.348-45.112 31.892-77.918 76.2-97.15 127.79C238.314 134.672 205 88.95 157.073 56.388c27.807-11.744 61.69-17.68 95.635-17.722zm-83.605 68.373c19.4 0 35.33 15.923 35.33 35.32 0 19.4-15.93 35.324-35.33 35.324S133.77 161.76 133.77 142.36c0-19.398 15.932-35.32 35.332-35.32zm179.44 0c19.4 0 35.33 15.923 35.33 35.32 0 19.4-15.93 35.324-35.33 35.324-19.402 0-35.333-15.923-35.333-35.323 0-19.398 15.93-35.32 35.33-35.32zm-110.378 80.69c4.052 10.347 7.523 21 10.424 31.913l9.03 33.964 9.03-33.964c2.895-10.888 6.368-21.472 10.405-31.72 14.39 21.47 37.346 35.386 63.236 35.386 14.44 0 27.964-4.346 39.608-11.896-4.003 70.85-18.94 124.726-39.34 161.416-23.964 43.104-54.35 62.274-83.537 61.836-29.184-.438-59.806-20.672-83.803-64.074-20.432-36.954-35.36-90.513-39.354-160.03C145.8 218.65 159.81 223.31 174.8 223.31c25.967 0 48.984-14 63.364-35.58zm-125.266 2.147c.433.61.864 1.22 1.31 1.816 2.165 81.335 18.39 144.056 42.653 187.942 3.655 6.61 7.513 12.784 11.538 18.55-48.72-28.262-81.132-79.294-81.132-137.394 0-32.026 9.226-54.484 25.632-70.913zm288.282 1.428c15.53 16.296 24.226 38.38 24.226 69.486 0 56.37-30.516 106.083-76.828 134.804 2.87-4.334 5.65-8.887 8.315-13.682 24.163-43.46 40.328-106.15 42.628-188.473.56-.707 1.122-1.41 1.66-2.135zm-237.496 59.052c-3.753 6.263-6.096 14.53-6.096 23.24 0 20.065 12.095 35.915 26.82 35.915 12.53 0 23.354-11.585 26.21-27.465-4.692 4.098-10.472 6.34-16.456 6.34-15.98 0-29.423-16.616-30.478-38.03zm185.912 2.477c-1.056 21.413-14.496 38.03-30.477 38.03-5.985 0-11.763-2.242-16.458-6.34 2.858 15.88 13.68 27.466 26.21 27.466 14.726 0 26.21-15.85 26.21-35.916 0-8.71-1.732-16.977-5.484-23.24h-.002zm-68.73 28.97c-3.51 13.094-14.307 23.18-24.53 23.18-9.984 0-20.61-10.057-23.943-22.507-.813 3.397-1.752 7.03-1.752 10.796 0 19.225 11.59 34.41 25.698 34.41s25.697-15.185 25.697-34.41c0-3.986-.26-7.9-1.168-11.47h-.002zm35.04 66.706c-3.435 16.552-14.208 29.013-27.45 29.013-8.24 0-15.752-4.6-21.024-12.146.738 18.326 12.065 33.062 25.697 33.062 14.107 0 25.696-15.862 25.696-35.086 0-5.407-1.303-10.277-2.92-14.844zm-115.636 1.347c-1.294 4.168-1.752 8.69-1.752 13.497 0 19.224 11.59 35.085 25.697 35.085 13.633 0 24.375-14.737 25.113-33.063-5.272 7.545-12.784 12.146-21.025 12.146-12.916 0-24.314-11.735-28.032-27.666z",
          coordinateSystem: "calendar",
          color: "#fff",
          data: filteredData,
          symbolSize: 25,
          showEffectOn: "render",
          rippleEffect: {
            color: "yellow",
            brushType: "stroke",
            scale: 1,
          },
          tooltip: {
            show: false,
          },
          itemStyle: {
            color: "yellow",
            shadowBlur: 50,
            shadowColor: "yellow",
          },
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
      <CardBody>
        <div id="main" style={{ width: "100%", height: "300px" }}></div>
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
