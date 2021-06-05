import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { useStore, ReactReduxContext } from 'react-redux';
import getInjectors from 'utils/sagaInjectors';

const injectSaga = ({ key, saga, mode }) => (WrappedComponent) => {
  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent;

    // eslint-disable-next-line react/static-property-placement
    static contextType = ReactReduxContext;

    // eslint-disable-next-line react/static-property-placement
    static displayName = `withSaga(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`;

    constructor(props, context) {
      super(props, context);

      this.injectors = getInjectors(context.store);

      this.injectors.injectSaga(key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent);
};

const useInjectSaga = ({ key, saga, mode }) => {
  const store = useStore();

  React.useEffect(() => {
    const injectors = getInjectors(store);
    injectors.injectSaga(key, { saga, mode });

    return () => {
      injectors.ejectSaga(key);
    };
  }, []);
};

export { useInjectSaga, injectSaga };
