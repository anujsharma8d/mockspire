import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    const homePath = isLoggedIn ? '/dashboard' : '/';

    return (
        <>
            <SEO
                title="404 – Page Not Found | Mockspire"
                description="The page you are looking for does not exist."
            />

            <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#f8f9ff] px-6 font-[Inter] text-[#0b1c30]">

                {/* error */}
                <p className="text-8xl font-extrabold tracking-tight text-[#006c49] select-none">
                    404
                </p>

                {/* heading */}
                <h1 className="text-2xl font-bold sm:text-3xl">
                    Page not found
                </h1>

                {/* sub msg */}
                <p className="max-w-md text-center text-[#424846]">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                    Double-check the URL.
                </p>

                <Link
                    to={homePath}
                    className="mt-2 inline-block translate-x-1.5 rounded-sm bg-[#051916] px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#364b46] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#051916] active:scale-[0.98]"
                >
                    {isLoggedIn ? 'Go to Dashboard' : 'Go to Home'}
                </Link>

            </main>
        </>
    );
};

export default NotFound;
