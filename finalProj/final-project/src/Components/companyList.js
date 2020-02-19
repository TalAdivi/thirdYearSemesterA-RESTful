import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

let res;
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '60%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function ScrollableTabsButtonAuto(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [companies, setCompanies] = React.useState([])
  let currentCompany="";

  const handleChange = (event, newValue) => {
    setValue(newValue);
    currentCompany=companies[newValue].name;
    console.log("currnet",currentCompany)
    sendData(currentCompany);
  };

  const sendData = (currentCompany) => {
    console.log("currnetsend",currentCompany)
    props.parentCallback(currentCompany);
  };

    useEffect(() => {
      async function initCompanies() {
        try {
          res = await fetch('https://mern-finalproj-api.herokuapp.com/Help4U/companies').then(res => res.json())
        }
        catch (e) {
          console.log(e);
        }
        if (res.status == 200 && res.data != null) {
          setCompanies(res.data);
        }
      }
      initCompanies();
    }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="white">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {companies.map((name, index) => (
              <Tab label={name.name} {...a11yProps({index})}/>

            ))}
        </Tabs>
      </AppBar>
    </div>
  );
}





