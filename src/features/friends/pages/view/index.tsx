import { SuspenseWithPerf } from "reactfire";
import React from "react";
import { Box } from "@material-ui/core";
import FriendCard from "features/components/FriendCard";
import Habits from "features/components/Habits";
import LoadingScreen from "features/components/LoadingScreen";
import { api } from "api";

const FriendsViewPage = () => {
  const { name, avatar, id, experience, lastOnlineTime } = api.useUser();
  const { habits, editHabit } = api.useHabits();

  return (
    <Box>
      <Box>
        <FriendCard
          name={name}
          avatar={avatar}
          experience={experience}
          lastOnlineTime={lastOnlineTime}
          userId={id}
        />
      </Box>
      <Box>
        <Habits habits={habits} editHabit={editHabit} />
      </Box>
    </Box>
  );
};

const FriendsViewPageContainer = () => (
  <SuspenseWithPerf
    fallback={<LoadingScreen />}
    traceId={"load-FriendsViewPage"}
  >
    <FriendsViewPage />
  </SuspenseWithPerf>
);

export default FriendsViewPageContainer;
