import { useEffect } from "react";
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

export const useSearchProduct = (searchRef, stream) => {
  useEffect(() => {
    const subscription = fromEvent(searchRef.current, "input")
      .pipe(debounceTime(500))
      .subscribe((e) => {
        const { dataTemp } = stream.currentState();
        stream.updateData({
          dataList: dataTemp.filter(({ title }) => {
            const keyReg = new RegExp(e.target.value, "i");
            return title.match(keyReg);
          }),
        });
      });
    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
