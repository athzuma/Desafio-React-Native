import React from "react";
import renderer from 'react-test-renderer';
import {StatusIndicator} from '../../src/components/StatusIndicator';

jest.runAllTimers();

describe('<StatusIndicator />', () => {
  const component  = renderer.create(
    <StatusIndicator message="Some text" loading={false} />
  );

  it('should render', () => {
    expect(component).toMatchSnapshot();
  });

  it('should show message', () => {
    const caption = component.root.findByProps({ testID: 'caption'}).props;
    expect(caption.children).toEqual('Some text');
  });
});

describe('<StatusIndicator /> on loading mode', () => {
  const component  = renderer.create(
    <StatusIndicator message="Some text" loading={true} />
  );

  it('should render', () => {
    expect(component).toMatchSnapshot();
  });

  it('should show ActivityIndicator', () => {
    const activityIndicator = component.root.findByProps({ testID: 'activityIndicator'}).props;
    expect(activityIndicator).toBeTruthy();
  });
});