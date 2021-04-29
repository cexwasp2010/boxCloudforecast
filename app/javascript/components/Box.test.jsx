import React from 'react';
import { shallow } from 'enzyme';
import Box from './Box';

const label = 'Test Label';
const size ='medium'

let wrapped = shallow(<Box label={label} size={size} />);

describe('Box', () => {
  it('should render the Box Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('renders the Label', () => { 
    expect(wrapped.find('.label').text()).toEqual(`Label: ${label}`);
  });

  // TODO: Add more tests for this component
});