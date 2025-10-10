import { renderWithProviders } from '@tests/renderWithProviders';
import { screen } from '@testing-library/react';

import App from './App';

describe.skip('App', () => {
    it('should render a header', () => {
        renderWithProviders(<App />);

        const header = screen.getByText('Typeface.ai Frontend Takehome: Chat App');
        expect(header).toBeVisible();
    });
});
