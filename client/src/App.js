import React from 'react';
import './App.css';
import DataProvider from './DataProvider/DataProvider';
import PointsTable from './PointsTable/PointsTable';
import ContributionPie from './ContributionPie/ContributionPie';
import PointsLineChart from './PointsLineChart/PointsLineChart';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MyContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#424242',
    },
  },
});

const App = () => {
  return (
    <DataProvider>
      <ThemeProvider theme={theme}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6'>
              <FontAwesomeIcon icon={faDragon} color='inherit' size='lg' /> The
              Prophet League
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth='lg' style={{ padding: 10 }}>
          <Grid container spacing={2} justify='center'>
            <Grid item md={8} xs={12}>
              <Paper
                style={{
                  padding: 10,
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  component='h2'
                  variant='h6'
                  color='primary'
                  gutterBottom
                >
                  GW Points Breakdown
                </Typography>
                <PointsLineChart />
              </Paper>
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper
                style={{
                  padding: 10,
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  component='h2'
                  variant='h6'
                  color='primary'
                  gutterBottom
                >
                  Contributions by Players
                </Typography>
                <ContributionPie />
              </Paper>
            </Grid>
            <Grid item md={12} xs={12}>
              <Paper
                style={{
                  padding: 10,
                  display: 'flex',
                  overflow: 'auto',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  component='h2'
                  variant='h6'
                  color='primary'
                  gutterBottom
                >
                  Contributions by Gameweek
                </Typography>
                <PointsTable />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </DataProvider>
  );
};

export default App;
