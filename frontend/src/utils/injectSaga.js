import { useEffect } from "react";
import { useStore } from "react-redux";
import getInjectors from "utils/sagaInjectors";

const useInjectSaga = ({ key, saga, mode }) => {
  const store = useStore();

  useEffect(() => {
    const injectors = getInjectors(store);
    injectors.injectSaga(key, { saga, mode });

    return () => {
      injectors.ejectSaga(key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useInjectSaga };
