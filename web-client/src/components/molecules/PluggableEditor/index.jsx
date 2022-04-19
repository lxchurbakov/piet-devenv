import React from 'react';
import styled from 'styled-components';

import boot from './boot';

const Wrap = styled.div`
  width: 100%;
`;

export default () => {
  const rootRef = React.useRef();

  React.useEffect(() => {
    const p = boot(rootRef.current);

    // console.log(p)

    return () => p.dispose();
  }, []);

  return (
    <Wrap>
      <div style={{ position: 'relative' }} ref={rootRef} />
    </Wrap>
  )
};
