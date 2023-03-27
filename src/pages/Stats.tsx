import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Typography } from '@mui/material';
import Chart from '../components/chart/Chart';
import Header from '../components/common/Header';
import PageContainer from '../components/common/PageContainer';
import { useAppSelector } from '../global/store';
import useCharts from '../hooks/useCharts';

const Stats = () => {
  const { producersList } = useAppSelector((state) => state.producer);
  const [tab, setTab] = useState(0);
  const { countryStates, countryStatesCount, crops, cropsCount, soil } =
    useCharts();

  return (
    <PageContainer>
      <Header title="Estatísticas" />

      <Box sx={{ width: '100%' }}>
        <Tabs
          sx={{ background: '#fff' }}
          value={tab}
          onChange={(_, newValue: number) => {
            setTab(newValue);
          }}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Estados" />
          <Tab label="Culturas" />
          <Tab label="Solo" />
        </Tabs>
      </Box>
      <Box sx={{ display: 'flex', width: 1, height: 1 }}>
        <TabPanel value={tab} index={0}>
          <Chart
            labels={countryStates as string[]}
            occurrences={countryStatesCount as number[]}
          />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Chart
            labels={crops as string[]}
            occurrences={cropsCount as number[]}
          />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Chart
            labels={['Area Agriculturável', 'Area de Vegetação']}
            occurrences={Object.values(soil)}
          />
        </TabPanel>
      </Box>
    </PageContainer>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <>
      {value === index && (
        <Box
          role="tabpanel"
          hidden={value !== index}
          aria-labelledby={`simple-tab-${index}`}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
          {...other}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 1,
              height: '95%',
            }}
          >
            {children}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Stats;
