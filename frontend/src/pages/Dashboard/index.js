import React, { useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Container,
  Button,
  UncontrolledTooltip,
} from "reactstrap";

// Components
import Breadcrumb from "../../components/Common/Breadcrumb";
import ProgressChart from "./ProgressChart";
import StreakBoard from "./StreakBoard";
import ProgressBars from "./ProgressBars";
import HeatMap from "./HeatMap";
import LeaderBoard from "./LeaderBoard";
import Profile from "./Profile";

// Utils
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Redux Action
import { setBreadcrumbItems } from "../../store/actions";

const Dashboard = ({ setBreadcrumbItems }) => {
  document.title = "Dashboard | Owl Coders Heatmap Report";

  const reportRef = useRef();

  useEffect(() => {
    const breadcrumbItems = [
      { title: "Owl Coders", link: "#" },
      { title: "Dashboard", link: "#" },
    ];
    setBreadcrumbItems("Dashboard", breadcrumbItems);
  }, [setBreadcrumbItems]);

  // ----- PDF Export Function -----
  const generatePdf = useCallback(async () => {
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2, // High DPI
        useCORS: true, // Support for external images
      });
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF("p", "mm", "a4");
      const width = 180;
      const height = (canvas.height / canvas.width) * width;
      pdf.addImage(imgData, "JPEG", 10, 10, width, height);
      pdf.save("owlcoders-dashboard-report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }, []);

  // ----- Print Function -----
  const printInvoice = useCallback(() => {
    window.print();
  }, []);

  return (
    <div className="dashboard-wrapper" ref={reportRef}>
      <div className="vertical-menu">
        <Profile />
      </div>

      <div className="main-content">
        <Container fluid>
          <Breadcrumb />

          {/* Controls */}
          <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
            <Button
              color="success"
              id="printBtn"
              onClick={printInvoice}
              className="btn-icon"
            >
              <i className="fa fa-print" />
            </Button>
            <UncontrolledTooltip target="printBtn">Print Page</UncontrolledTooltip>

            <Button
              color="primary"
              id="pdfBtn"
              onClick={generatePdf}
              className="btn-icon"
            >
              <i className="fa fa-download me-1" /> Download PDF
            </Button>
            <UncontrolledTooltip target="pdfBtn">Download Dashboard as PDF</UncontrolledTooltip>
          </div>

          {/* Top Row Widgets */}
          <Row className="gy-3">
            <Col xl="4" md="6">
              <ProgressChart />
            </Col>
            <Col xl="4" md="6">
              <StreakBoard />
            </Col>
            <Col xl="4" md="12">
              <ProgressBars />
            </Col>
          </Row>

          {/* Heatmap Row */}
          <Row className="gy-3 mt-2">
            <Col xs="12">
              <HeatMap />
            </Col>
          </Row>

          {/* Leaderboard */}
          <Row className="gy-3 mt-3">
            <Col xs="12">
              <LeaderBoard />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default connect(null, { setBreadcrumbItems })(Dashboard);
