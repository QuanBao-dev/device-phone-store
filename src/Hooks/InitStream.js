import { useEffect } from "react";

export const useInitStream = (setState, stream) => {
  useEffect(() => {
    const subscription = stream.subscribe(setState);
    stream.init();
    return () => {
      subscription.unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};