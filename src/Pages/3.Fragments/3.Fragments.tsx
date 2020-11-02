import React from 'react';

const Fragments = () => {
  return (
    <React.Fragment>
      <h1>123</h1>
      <h2>1234</h2>
      <h3>1234</h3>
    </React.Fragment>
  );
};

export default React.memo(Fragments);