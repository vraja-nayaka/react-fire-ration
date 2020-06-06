import React from 'react';
import { useAnalytics} from 'reactfire';

export function MyPageViewLogger({ location }) {
    const analytics = useAnalytics();
  
    // By passing `location.pathname` to the second argument of `useEffect`,
    // we only log on first render and when the `pathname` changes
    React.useEffect(() => {
      analytics.logEvent('page-view', { path_name: location.pathname });
    }, [location.pathname, analytics]);
  
    return null;
  }