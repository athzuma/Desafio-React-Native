import React from "react";
import renderer from 'react-test-renderer';
import {Load} from '../../src/components/Load';

jest.runAllTimers();

describe('<Load />', () => {
  it('should render', () => {
    const mockCallBack = jest.fn();
    const component  = renderer.create(
      <Load hasError={false} tryAgainClick={mockCallBack}/>
    );
    expect(component).toMatchSnapshot();
  });
});