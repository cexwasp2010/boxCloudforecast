import React from 'react';
import { shallow } from 'enzyme';
import Box from './Box';

const label = 'Test Label';
const size ='medium'
/*Set boxOwners to construct select attach Box Owner*/
const boxOwners = [{value: 1, label: 'email1@test.com'},{value: 2, label: 'email2@test.com'}]

let wrapped = shallow(<Box label={label} size={size} box_owners={boxOwners} />);

describe('Box', () => {
  it('should render the Box Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  /*Fixed function to new Box.jsx*/
  it('renders the Label', () => { 
    expect(wrapped.find('h6').at(0).text()).toEqual(`Label: ${label}`);
  });

  /*Added new test to check Size Box*/
  it('renders the Size', () => { 
    expect(wrapped.find('h6').at(1).text()).toEqual(`Size: ${size}`);
  });

  /*Added new test to check Attach Box Owner field in Box*/
  it('renders the Attach Box Owner', () => { 
    expect(wrapped.find('h6').at(2).text()).toEqual(`Attach Box Owner:`);
  });

  /*Added new test to check change select attach Bow Owner into Box*/
  it('should select correct value on change', () => { 
		wrapped.find('select').simulate('change', {target: {value: 2}})
		expect(wrapped.find('select').props().value).toBe(2)
  });
});