import { Link, Outlet } from 'react-router-dom';

export function Components() {
    return (
        <>
            <div>
                <Link to="star">Star Rating</Link>
            </div>
            <Outlet></Outlet>
        </>
    );
}
