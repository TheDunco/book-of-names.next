// import cn from 'classnames';
import { useState } from 'react';

export const Sandbox: React.FC = () => {
  const [hide, setHide] = useState(0);
  setTimeout(() => {
    if (hide === 1) {
      setHide(0);
    } else {
      setHide(1);
    }
  }, 1000);
  return <></>;
};

export default Sandbox;
