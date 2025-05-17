import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Card,
  CardBody,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  Row,
  Col
} from "reactstrap";
import "../Dashboard/dash.css";

// Sample avatars
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";

const userImages = [user2, user3, user4, user5, user6];

const LeaderBoard = () => {
  const [searchText, setSearchText] = useState("");
  const [transactionsPerPage, setTransactionsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getRandomNumber = (min, max) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    const generateRandomData = () => {
      return Array.from({ length: 50 }, () => {
        const hard = getRandomNumber(20, 80);
        const medium = getRandomNumber(10, 40);
        const easy = getRandomNumber(5, 30);
        const total = hard + medium + easy;
        const points = hard * 20 + medium * 15 + easy * 10;
        const rollPrefix = ["21A", "21P", "21M"][getRandomNumber(0, 2)];
        const college = { "21A": "AEC", "21P": "ACET", "21M": "ACOE" }[rollPrefix];
        const avatarIndex = getRandomNumber(0, userImages.length - 1);
        return {
          avatar: userImages[avatarIndex],
          name: `21${rollPrefix}${getRandomNumber(91, 99)}A${getRandomNumber(
            0,
            9
          )}${getRandomNumber(100, 999)}`,
          clg: college,
          totsub: total,
          hard,
          medium,
          easy,
          points
        };
      });
    };

    setTransactions(generateRandomData());
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) =>
        t.name.toLowerCase().includes(searchText.toLowerCase().trim())
      )
      .sort((a, b) => b.points - a.points);
  }, [transactions, searchText]);

  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * transactionsPerPage;
    return filteredTransactions.slice(start, start + transactionsPerPage);
  }, [filteredTransactions, currentPage, transactionsPerPage]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to page 1 on search
  };

  const handleChangePerPage = (e) => {
    setTransactionsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const renderPagination = () => (
    <Pagination className="justify-content-center mt-3">
      <PaginationItem disabled={currentPage <= 1}>
        <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>Previous</PaginationLink>
      </PaginationItem>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        return (
          <PaginationItem key={pageNum} active={pageNum === currentPage}>
            <PaginationLink onClick={() => setCurrentPage(pageNum)}>
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      <PaginationItem disabled={currentPage >= totalPages}>
        <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>Next</PaginationLink>
      </PaginationItem>
    </Pagination>
  );

  return (
    <Card>
      <CardBody>
        <h4 className="card-title mb-3 text-uppercase">Leaderboard</h4>

        <Row className="align-items-center mb-3">
          <Col md="6">
            <Input
              type="text"
              placeholder="Search by name..."
              value={searchText}
              onChange={handleSearch}
            />
          </Col>
          <Col md="6" className="text-md-end mt-2 mt-md-0">
            <label className="me-2">Show:</label>
            <select
              className="form-select d-inline w-auto"
              value={transactionsPerPage}
              onChange={handleChangePerPage}
            >
              {[5, 10, 20, 50].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </Col>
        </Row>

        <div className="table-responsive">
          <Table className="align-middle table-centered table-nowrap mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>College</th>
                <th>Total</th>
                <th>Hard</th>
                <th>Medium</th>
                <th>Easy</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((entry, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * transactionsPerPage + index + 1}</td>
                    <td>
                      <img
                        src={entry.avatar}
                        alt="avatar"
                        className="rounded-circle me-2"
                        width="32"
                        height="32"
                      />
                      {entry.name}
                    </td>
                    <td>{entry.clg}</td>
                    <td>{entry.totsub}</td>
                    <td>{entry.hard}</td>
                    <td>{entry.medium}</td>
                    <td>{entry.easy}</td>
                    <td><strong>{entry.points}</strong></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-3">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {renderPagination()}
      </CardBody>
    </Card>
  );
};

export default LeaderBoard;
