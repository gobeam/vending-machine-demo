import { useEffect } from "react";
import { useStore } from "react-redux";
import getInjectors from "utils/reducerInjectors";

const useInjectReducer = ({ key, reducer }) => {
  const store = useStore();

  useEffect(() => {
    getInjectors(store).injectReducer(key, reducer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useInjectReducer };
