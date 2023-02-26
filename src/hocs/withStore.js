import { useMemo } from "react";
import { useSelector } from "react-redux";

function withStore(Component, storeKeys) {
  return (props) => {
    const state = useSelector((state) => {
      return storeKeys.reduce((acc, key) => {
        acc[key] = state[key];
        return acc;
      }, {});
    });
    const MemoComponent = useMemo(() => {
      return <Component state={state} {...props} />;
    }, [...Object.values(state), ...Object.values(props)]);

    return MemoComponent;
  };
}

export default withStore;
