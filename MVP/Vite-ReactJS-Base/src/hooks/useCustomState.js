import { useState } from "react";

const useCustomState = (data = {}) => {
  const [state, _setState] = useState(data);
  const setState = (data = {}, reset = false) => {
    if (reset) {
      _setState({});
    } else {
      _setState((prev) => ({
        ...prev,
        ...data,
      }));
    }
  };

  return [state, setState];
};

export default useCustomState;
