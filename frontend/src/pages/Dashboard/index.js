import React , {useEffect, useRef} from "react"
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {
  Row,
  Col,
  Container, 
  Button, 
} from "reactstrap"

// Pages Components

import Breadcrumb from "../../components/Common/Breadcrumb"
import ProgressChart from "./ProgressChart";
import StreakBoard from "./StreakBoard";
import ProgressBars from "./ProgressBars";
import HeatMap from "./HeatMap";
import LeaderBoard from "./LeaderBoard";
import Profile from "./Profile";

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

const Dashboard = (props) => {

  document.title = "Dashboard | Owl coders Heat map Generation";


  const breadcrumbItems = [
    { title: "Owl Coders", link: "#" },
    { title: "Dashboard", link: "#" }
  ]
  
  useEffect(() => {
    props.setBreadcrumbItems('Dashboard' , breadcrumbItems)
  },)

  const generatePdf = async () => {
    try {
        const canvas = await html2canvas(reportRef.current);
        const imgData = canvas.toDataURL("image/webp");
        const pdf = new jsPDF();
        const width = 180; // Width of the image in mm
        const height = (canvas.height / canvas.width) * width; // Maintain aspect ratio
        const margin = 10; // Margin in mm
        
        // Add image to PDF
        pdf.addImage(imgData, "JPEG", margin, margin, width, height);
            // pdf.addImage(imgData, "PNG", 10, 10, 300, 100);
            pdf.save("report.pdf");
        
    } 
    catch (error) {
        console.error("Error generating PDF:", error);
    }
};

const printInvoice = () => {
  window.print()
}
  
  // const reports = [
    // { title: "Orders", iconClass: "cube-outline", total: "1,587", average: "+11%", badgecolor: "info" },
    // { title: "Revenue", iconClass: "buffer", total: "$46,782", average: "-29%", badgecolor: "danger" },
    // { title: "Average Price", iconClass: "tag-text-outline", total: "$15.9", average: "0%", badgecolor: "warning" },
    // { title: "Product Sold", iconClass: "briefcase-check", total: "1890", average: "+89%", badgecolor: "info" },
  // ]
  const reportRef = useRef();
  return (
    <div ref={reportRef}>
    <div className="vertical-menu" >
    <Profile/>
    </div>
      <div className="main-content">
        <Container fluid>
        <Breadcrumb />
        <div className="float-end">
            <Link to="#" onClick={printInvoice} className="btn btn-success waves-effect waves-light me-2"><i className="fa fa-print"></i></Link>{" "}
        </div>
        <Button onClick={generatePdf} type="button" color="primary" className="waves-effect waves-light">Download Report</Button>
        <br/><br/>
      {/*mimi widgets */}
      {/* <Miniwidget reports={reports} /> */}

      <Row>
        <Col xl="4" >
          {/* Monthly Earnings */}
          <ProgressChart />
        </Col>

        <Col xl="4">
          {/* Email sent */}
          <StreakBoard />
        </Col>

        <Col xl="4">
          <ProgressBars />
        </Col>

      </Row>
      <Row>

        <Col xl="12" lg="12">
          {/* inbox */}
          <HeatMap />
        </Col>
        {/* <Col xl="4" lg="6"> */}
          {/* recent activity */}
          {/* <RecentActivity /> */}

        {/* </Col> */}
        {/* <Col xl="4"> */}
          {/* widget user */}
          {/* <WidgetUser /> */}

          {/* yearly sales */}
          {/* <YearlySales /> */}
        {/* </Col> */}
      </Row>

      <Row>
        <Col xl="12">
          {/* latest transactions */}
          <LeaderBoard />
        </Col>

        {/* <Col xl="6"> */}
          {/* latest orders */}
          {/* <LatestOrders /> */}
        {/* </Col> */}
      </Row>
      </Container>
      </div>
    </div>
  )
}

export default connect(null, { setBreadcrumbItems })(Dashboard);