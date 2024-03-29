import "./ClientLogos.css";

import React, { useEffect, useRef, useState } from "react";
import { useInitStream } from "../../Hooks/InitStream";
import { clientLogoStream } from "../../Epics/ClientLogos";
import {
  useModeChangeHandle,
  useProductResizeHandle,
  useProductWidthHandle,
} from "../../Hooks/productListAutoScrolling";

import {
  mouseDownSub,
  mouseUpSub,
  mouseMoveSub,
  touchEndSub,
  touchMoveSub,
  touchStartSub,
  scrollAllowSlidingHandle,
} from "../../Subscription/productListAutoScrolling";
import { userStream } from "../../Epics/User";

const dataList = [
  {
    src: "https://devicer.cmsmasters.net/wp-content/uploads/2015/04/1-2.png",
    width: 130,
  },
  {
    src: "https://devicer.cmsmasters.net/wp-content/uploads/2015/04/2-2.png",
    width: 120,
  },
  {
    src: "https://devicer.cmsmasters.net/wp-content/uploads/2015/04/3-2.png",
    width: 110,
  },
  {
    src: "https://devicer.cmsmasters.net/wp-content/uploads/2015/04/4-2.png",
    width: 160,
  },
  {
    src: "https://devicer.cmsmasters.net/wp-content/uploads/2015/04/6-2.png",
    width: 90,
  },
  {
    src: "https://devicer.cmsmasters.net/wp-content/uploads/2015/04/5-2.png",
    width: 60,
  },
];
const ClientLogos = () => {
  const clientLogosContainerRef = useRef();
  const clientLogosRef = useRef();
  const [clientLogosState, setClientLogosState] = useState(
    clientLogoStream.currentState()
  );
  const [userState, setUserState] = useState(userStream.currentState());
  useInitStream(setUserState, userStream);
  useEffect(() => {
    const subscription = scrollAllowSlidingHandle(false, clientLogoStream);
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { innerWidth } = userState;
  useEffect(() => {
    if (innerWidth > 505) {
      clientLogoStream.updateData({
        numberOfProductPerPage: 3,
      });
    } else {
      clientLogoStream.updateData({
        numberOfProductPerPage: 2,
      });
    }
  }, [innerWidth]);
  useEffect(() => {
    const subscription = mouseDownSub(false, clientLogosRef, clientLogoStream);
    const subscription2 = mouseMoveSub(false, clientLogosRef, clientLogoStream);
    const subscription3 = mouseUpSub(false, clientLogosRef, clientLogoStream);
    const subscription4 = touchEndSub(false, clientLogosRef, clientLogoStream);
    const subscription5 = touchMoveSub(false, clientLogosRef, clientLogoStream);
    const subscription6 = touchStartSub(
      false,
      clientLogosRef,
      clientLogoStream
    );
    return () => {
      subscription.unsubscribe();
      subscription2.unsubscribe();
      subscription3.unsubscribe();
      subscription4.unsubscribe();
      subscription5.unsubscribe();
      subscription6.unsubscribe();
    };
  }, []);

  useInitStream(setClientLogosState, clientLogoStream);
  useProductWidthHandle(clientLogoStream, clientLogosContainerRef, dataList);
  useProductResizeHandle(clientLogoStream, clientLogosContainerRef, dataList);
  useModeChangeHandle(clientLogoStream, clientLogosState);
  clientLogoStream.updateDataQuick({
    offsetLeft:
      (clientLogoStream.currentState().widthItem +
        clientLogoStream.currentState().margin) *
      clientLogoStream.currentState().currentPage,
  });
  return (
    <div className="client-logos-container" ref={clientLogosContainerRef}>
      <div
        ref={clientLogosRef}
        className="client-logos"
        style={{
          transform: `translateX(-${
            clientLogoStream.currentState().offsetLeft
          }px)`,
          transition: clientLogoStream.currentState().transition,
          touchAction: "pan-y",
        }}
      >
        {dataList.map(({ src, width }, key) => (
          <div
            className="image-container"
            key={key}
            style={{
              width: clientLogoStream.currentState().widthItem,
            }}
          >
            <img
              src={src}
              alt="Not found"
              style={{
                width,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
