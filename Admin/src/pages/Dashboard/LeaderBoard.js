import React, { useState, useEffect } from 'react';
import { Table, Card, CardBody, Pagination,
    PaginationItem,
    PaginationLink } from "reactstrap";
import "../Dashboard/dash.css"
// Import Images
import user2 from "../../assets/images/users/user-2.jpg";
import user3 from "../../assets/images/users/user-3.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";

const LeaderBoard = () => {
    const [transactions, setTransactions] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [transactionsPerPage, setTransactionsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        // Simulating loading of data from an external source
        const getRandomNumberInRange = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        const generateRandomData = () => {
            const data = [];
            const totalEntries = 50; // Increase the number of total entries for demonstration purposes
            const maxTotal = 150;

            for (let i = 0; i < totalEntries; i++) {
                const hard = getRandomNumberInRange(20, 80);
                const medium = getRandomNumberInRange(10, 40);
                const easy = getRandomNumberInRange(5, 30);
                const totsub = hard + medium + easy;
                const points = hard * 20 + medium * 15 + easy * 10;
                const remainingTotal = maxTotal - totsub;
                let rollPrefix = ['21A', '21P', '21M'][getRandomNumberInRange(0, 2)];
                let clgName;
                if (rollPrefix === '21A') {
                    clgName = 'AEC';
                } else if (rollPrefix === '21P') {
                    clgName = 'ACET';
                } else if (rollPrefix === '21M') {
                    clgName = 'ACOE';
                }
                data.push({
                    imgUrl: `user${getRandomNumberInRange(2, 6)}`,
                    name: `21${['A', 'P', 'M'][getRandomNumberInRange(0, 2)]}${getRandomNumberInRange(91, 99)}A${getRandomNumberInRange(0, 9)}${getRandomNumberInRange(100,999)}`,
                    clg: clgName,
                    totsub: totsub.toString(),
                    Hard: hard.toString(),
                    medium: medium.toString(),
                    easy: remainingTotal >= 5 ? easy.toString() : remainingTotal.toString(),
                    points: points.toString()
                });
            }

            return data;
        };

        const randomData = generateRandomData();
        setTransactions(randomData);
    }, []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleChangeTransactionsPerPage = (event) => {
        setTransactionsPerPage(parseInt(event.target.value));
    }

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    }
    const handleCurrentPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    }

    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;

    let filteredTransactions = transactions.filter(transaction =>
        transaction.name.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sort transactions based on points (descending order)
    filteredTransactions = filteredTransactions.sort((a, b) => parseInt(b.points) - parseInt(a.points));

    return (
        <React.Fragment>
            <Card>
                <CardBody>
                    <h4 className="card-title mb-4">LEADERBOARD</h4>
                    <input type="text" className="form-control mb-3" placeholder="Search..." value={searchText} onChange={handleSearchChange} />
                    <div className="table-responsive">
                        <Table className="align-middle table-centered table-vertical table-nowrap">
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>NAME</th>
                                    <th>COLLEGE</th>
                                    <th>PROBLEMS SOLVED</th>
                                    <th>HARD</th>
                                    <th>MEDIUM</th>
                                    <th>EASY</th>
                                    <th>POINTS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.slice(startIndex, endIndex).map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{transaction.name}</td>
                                        <td>{transaction.clg}</td>
                                        <td>{transaction.totsub}</td>
                                        <td>{transaction.Hard}</td>
                                        <td>{transaction.medium}</td>
                                        <td>{transaction.easy}</td>
                                        <td>{transaction.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className="justify-content-center">
                        <label style={{ textAlign: "right" }}>Show: </label>
                        <select value={transactionsPerPage} onChange={handleChangeTransactionsPerPage}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            {/* Add more options for different numbers */}
                        </select>
                        <nav aria-label="Page navigation" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                            <Pagination>
                                <PaginationItem ><PaginationLink  onClick={handlePrevPage} disabled={currentPage === 1}>Previous</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink onClick={()=>handleCurrentPage(currentPage-1)} hidden={currentPage === 1}>{currentPage-1}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink className='active' onClick={()=>handleCurrentPage(currentPage)}>{currentPage}</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink onClick={()=>handleCurrentPage(currentPage+1)} hidden={endIndex >= filteredTransactions.length}>{currentPage+1}</PaginationLink></PaginationItem>
                                <PaginationItem ><PaginationLink onClick={handleNextPage} disabled={endIndex >= filteredTransactions.length}>Next</PaginationLink></PaginationItem>
                            </Pagination>
                        </nav>
                    </div>
                </CardBody>
            </Card>
        </React.Fragment>
    );
}

export default LeaderBoard;
