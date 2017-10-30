import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, mount } from 'enzyme';
import Input from '../../app/components/Input';

configure({ adapter: new Adapter() });

describe('Input component tests', () => {
  it('should render input component', () => {
    const mock = jest.fn();
    const wrapper = mount(<Input fetchWins={() => mock} fetchLosses={() => mock}/>);

    expect(wrapper.find('section').length).toEqual(1);
    expect(wrapper.find('.text-box').length).toEqual(1);
    expect(wrapper.find('.submit-btn').length).toEqual(1);
  })

  it('should update username state value', () => {
    const mock = jest.fn();
    const wrapper = mount(<Input fetchWins={() => mock} fetchLosses={() => mock}/>);
    const input = wrapper.find('.text-box');
    const button = wrapper.find('.submit-btn');

    input.simulate('change', {target: {value: 'keji'}});
    expect(wrapper.state('username')).toEqual('keji');
    button.simulate('click');
    expect(wrapper.state('username')).toEqual('');
  })
})