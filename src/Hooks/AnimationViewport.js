import { useEffect } from "react";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";

export const useAnimationViewport = (elementRef) => {
  useEffect(() => {
    const subscription = fromEvent(window, "scroll")
      .pipe(filter(() => elementRef.current))
      .subscribe(() => {
        if (
          elementRef.current.getBoundingClientRect().y -
            window.innerHeight +
            elementRef.current.getBoundingClientRect().height / 3 <
          0
        ) {
          elementRef.current.style.opacity = 1;
          elementRef.current.style.transform = "translateY(0)";
          subscription.unsubscribe();
        }
      });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
