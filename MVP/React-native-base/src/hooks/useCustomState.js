import {useState} from 'react';

export default function (initState = {}) {
  const [state, _setState] = useState(initState);

  const setState = (payload = {}) => {
    _setState(prev => ({
      ...prev,
      ...payload,
    }));
  };

  return [state, setState];
}
