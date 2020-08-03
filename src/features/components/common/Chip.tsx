import React from 'react'
import { Typography, Tooltip, Box, Fade } from '@material-ui/core'

interface ChipProps {
    label: string | number;
    bgcolor: string;
    icon: React.ReactElement;
    tooltip: string;
}

function Chip({ label, bgcolor, icon, tooltip }: ChipProps) {
    return (
        <Typography component="div" >
            <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title={tooltip}
            >
                <Box
                    display="inline-flex"
                    boxSizing="border-box"
                    color="inherit"
                    alignItems="center"
                    fontSize="0.8125rem"
                    height={32}
                    padding={1}
                    margin={1}
                    borderRadius={20}
                    bgcolor={bgcolor}
                >
                    {icon}
                    <Box paddingX={0.5}>
                        {label}
                    </Box>
                </Box>
            </Tooltip>
        </Typography>
    )
}

export default Chip


