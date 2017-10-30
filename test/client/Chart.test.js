import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, mount } from 'enzyme';
import { Chart } from '../../app/components/Chart';

configure({ adapter: new Adapter() });

describe('Chart component tests', () => {
  it('should render div with class no-props', () => {
    const state = {wins: 0, losses: 0};
    const wrapper = mount(<Chart state={state}/>);

    expect(wrapper.find('.no-props').length).toEqual(1);
  })

  it('should render div with class with-props', () => {
    const state = {wins: 1, losses: 1};
    const wrapper = mount(<Chart state={state}/>);

    expect(wrapper.find('.with-props').length).toEqual(1);
  })

  it('should render chart ', () => {
    const state = {wins: 1, losses: 1};
    const wrapper = mount(<Chart state={state}/>);

    expect(wrapper.find('VictoryChart').length).toEqual(1);
  })

  it('should not render chart ', () => {
    const state = {wins: 0, losses: 0};
    const wrapper = mount(<Chart state={state}/>);

    expect(wrapper.find('VictoryChart').length).toEqual(0);
  })

  // it('should update username state value', () => {
  //   const mock = jest.fn();
  //   const wrapper = mount(<Chart fetchWins={() => mock} fetchLosses={() => mock}/>);
  //   const input = wrapper.find('.text-box');
  //   const button = wrapper.find('.submit-btn');

  //   input.simulate('change', {target: {value: 'keji'}});
  //   expect(wrapper.state('username')).toEqual('keji');
  //   button.simulate('click');
  //   expect(wrapper.state('username')).toEqual('');
  // })
})