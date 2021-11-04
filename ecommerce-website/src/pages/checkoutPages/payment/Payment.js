import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core';
import Cod from './components/Cod';  
import UPI from './components/UPI';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Payment({history}) {
  const theme = useTheme();
  const [selectedTab, setselectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setselectedTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setselectedTab(index);
  };

  return (
    <>
      <Box sx={{ width: 550,height:450,margin:"auto",marginTop:"30px",border:"1px solid black"}} >
        <Tabs
            value={selectedTab}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Cash On Delivery" />
            <Tab label="Card" />
            
          </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          
          onChangeIndex={handleChangeIndex}
          >
            <TabPanel index={0} dir={theme.direction}/>
              
            <TabPanel index={1} dir={theme.direction}/>

        </SwipeableViews>
        
        {selectedTab===0 && <Cod history={history}/>}
        
        {selectedTab==1 && <UPI  history={history}/>}
      </Box>
      
    </>
    
    
  );
}