import React, { useState } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles({
  root: {
    paddingTop: '13rem',
  },
});
const StatisticPage = () => {
  const [hoverData, setHoverData] = useState(null);
  const [hoveredOverCategories, setHoveredOverCategories] = useState([]);
  const [chartOptions ] = useState({
    xAxis: {
      categories: ['number of requests', 'request accepted', 'request refused', 'total to be reimbursed'],
    },
    title: {
      text: 'Expense Statistic'
  },
    series: [{
      type: 'column',
      data: [1, 2, 3, 4]
    }],
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver(e) {
              console.log(hoveredOverCategories); 
              setHoverData(e.target.category);
              setHoveredOverCategories(
                [...hoveredOverCategories, e.target.category]
              );
            }
          }
        }
      }
    }
  });
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <HighchartsReact
        highcharts={Highcharts}
        options={chartOptions}
      />
      <h3>Hovering over {hoverData}</h3>
      <ol>
        {hoveredOverCategories.map(category => (
          <li>Hovered over {category}</li>
        ))}
      </ol>
    </div>
  )
}
export default StatisticPage;