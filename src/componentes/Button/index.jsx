import React from 'react';
import { Button } from 'antd';
import './index.scss';

function XYButton(props) {
  return (
    <Button type="primary" className="xy-dating" {...props}>
      {props.children}
    </Button>
  );
}

export { XYButton };
