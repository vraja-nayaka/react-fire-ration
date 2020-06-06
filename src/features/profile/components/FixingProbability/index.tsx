import React from 'react';
import { Typography } from '@material-ui/core';

interface FixingProbabilityProps {
    probability: number;
}

const FixingProbability = (props: FixingProbabilityProps) => {
    const { probability } = props;

    return <Typography variant="inherit">Вероятность закрепления привычки: {probability} %</Typography>
};

export default FixingProbability;