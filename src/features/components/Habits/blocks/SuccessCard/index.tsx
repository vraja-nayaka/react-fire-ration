import React, { useEffect, useRef } from "react";
import moment from "moment";
import { Typography, Paper, Box } from "@material-ui/core";
import { IHabit } from "features/profile/typings";
import { getFullSuccess } from "helpers/utils";
import { getSuccessBackgroundColor } from "helpers/getNextHabitExperience";

import { ChipsBlock } from "../ChipsBlock";

interface SuccessCardProps {
  habit: IHabit;
  editHabit: (data: Partial<IHabit>) => void;
}

const SuccessCard = (props: SuccessCardProps) => {
  const { habit, editHabit } = props;
  const scrollRef = useRef<HTMLDivElement>(null);

  const successArray = getFullSuccess(habit.success);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        inline: "end",
      });
    }
  }, [scrollRef]);

  return (
    <Paper elevation={3}>
      <form id="friend-progress">
        <Box p={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">{habit.name}</Typography>
            <Box display="flex" alignItems="center">
              <ChipsBlock habit={habit} editHabit={editHabit} />
            </Box>
          </Box>
          <Box display="flex">
            <Box padding={1}>
              <Box>
                <Typography variant="body1">Дата</Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {habit.unit ? habit.unit : "Значение"}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" overflow="auto">
              {successArray.map((data, index) => (
                <Box
                  padding={1}
                  flex="0 0 45px"
                  key={index}
                  bgcolor={getSuccessBackgroundColor(habit.promise, data.count)}
                  borderRadius={3}
                >
                  <Box>
                    <Typography variant="body2">
                      {moment(data.day).format("DD.MM")}
                    </Typography>
                    <Typography variant="body1" align="center">
                      {data.count}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <div ref={scrollRef} />
            </Box>
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export { SuccessCard };
