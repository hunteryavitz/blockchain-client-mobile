import React from 'react';
import App from '../App';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import renderer, {act} from 'react-test-renderer';
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

afterEach(() => {
    jest.restoreAllMocks();
});

it('displays readiness message after button click', async () => {
    const { getByText } = render(<App />);

    // simulate button click
    await act(() => {
        fireEvent.press(getByText('Readiness Check'));
    });

    // check that the fetching message is displayed
    await waitFor(() => {
        expect(getByText('Checking Readiness...')).toBeDefined();
    });
});

it('displays liveness message after button click', async () => {
    const { getByText } = render(<App />);

    // simulate button click
    await act(() => {
        fireEvent.press(getByText('Liveness Check'));
    });

    // check that the fetching message is displayed
    await waitFor(() => {
        expect(getByText('Checking Liveness...')).toBeDefined();
    });
});

it('displays version message after button click', async () => {
    const { getByText } = render(<App />);

    // simulate button click
    await act(() => {
        fireEvent.press(getByText('Version Check'));
    });

    // check that the fetching message is displayed
    await waitFor(() => {
        expect(getByText('Checking Version...')).toBeDefined();
    });
});

it('displays verification message after button click', async () => {
    const { getByText } = render(<App />);

    // simulate button click
    await act(() => {
        fireEvent.press(getByText('Validate Blockchain'));
    });

    // check that the fetching message is displayed
    await waitFor(() => {
        expect(getByText('Checking Blockchain...')).toBeDefined();
    });
});

it('displays block message after button click', async () => {
    const { getByText } = render(<App />);

    // simulate button click
    await act(() => {
        fireEvent.press(getByText('Add Block'));
    });

    // check that the fetching message is displayed
    await waitFor(() => {
        expect(getByText('Adding Block...')).toBeDefined();
    });
});
