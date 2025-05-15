import React, { Component } from 'react';

import C3Chart from 'react-c3js';
import 'c3/c3.css';

class DonutChart extends Component {

    render() {
        const data = {
            columns: [
                ['Solved', 20],
                ['Unsolved', 12]
                //['In-Store Sales', 50],
            ],
            type: "donut",
        };

    const donut = {
        title: "Solved",
        width: 10,
        label: { show: !1 }
    };

    const color = {
        pattern: ['rgb(0,255,0)','rgb(255,0,0)']  // '#28bbe3']
    };

    const size = {
        height: 150
    };

        return (
            <React.Fragment>
                <C3Chart data={data} donut={donut} color={color} size={size} dir="ltr" />
            </React.Fragment>
        );
    }
}

export default DonutChart;