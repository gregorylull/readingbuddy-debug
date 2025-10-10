import { Link, useNavigate, useRouteError } from 'react-router-dom';

export function ErrorRoute() {
    const error = useRouteError();

    return (
        <>
            <h2> You have arrived here in error: {error?.statusText || error.mesasge}</h2>
            <Link to="/">Go home</Link>
        </>
    );
}
