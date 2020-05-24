import React from 'react';
import { Grid, Typography } from '@material-ui/core';

interface StatsValuesProps {
    summ: number;
    average: number;
    inSuccession: number;

}

const StatsValues = (props: StatsValuesProps) => {
    const {summ, average, inSuccession} = props;

    return (
      <>
        <Grid container>
          <Grid item xs={8}>
            <Typography>Сумма</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{summ}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Typography>Среднее в день</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>{average}</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Typography>Удалось подряд</Typography>
          </Grid>
          <Grid item xs={4}>
    <Typography>{inSuccession}</Typography>
          </Grid>
        </Grid>
      </>
    )
  };

export default StatsValues;
