import React from 'react';
import App from '../App';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import renderer from 'react-test-renderer';
import expect from "expect";

test('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ ready: true }),
    })
);

beforeEach(() => {
    fetch.mockClear();
});

it('displays fetching message after button click', async () => {
    const { getByText } = render(<App />);

    // simulate button click
    fireEvent.press(getByText('Readiness Check'));

    // check that the fetching message is displayed
    await waitFor(() => {
        expect(getByText('Fetching data')).toBeDefined();
    });
});
