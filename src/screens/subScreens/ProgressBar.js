import * as React from 'react';
import { ProgressBar } from 'react-native-paper';

const MyComponent = (props) => (
  <ProgressBar progress={props.progress} {...props} color='black' />
);

export default MyComponent;