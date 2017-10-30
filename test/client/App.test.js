import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import App from '../../app/components/App';

configure({ adapter: new Adapter() });

describe('App component tests', () => {
  const resolvePromise = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });

  it('should render', () => {
    const state = {wins: 0, losses: 0};
    const wrapper = mount(<App />);

    expect(wrapper.find('.main').length).toEqual(1);
    expect(wrapper.find('.title').length).toEqual(1);
    expect(wrapper.find('Input').length).toEqual(1);
    expect(wrapper.find('.output').length).toEqual(2);
    expect(wrapper.find('Chart').length).toEqual(1);
  })
})