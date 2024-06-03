import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/UseAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useState } from 'react';
import img from '../../../assets/loginimg.png';
import { Helmet } from 'react-helmet-async';


const Login = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state || '/';
    const { signInWithGoogle, signIn, loading, setLoading, resetPassword } = useAuth();
    const [email, setEmail] = useState('');
   

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            setLoading(true);
            // 1. Sign in user
            await signIn(email, password);
            navigate(from);
            toast.success('Login Successful');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) return toast.error('Please write your email first!');
        try {
            setLoading(true);
            await resetPassword(email);
            toast.success('Request Success! Check your email for further process...');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Handle Google sign-in
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle();
            const user = result.user;
            const name = user.displayName;
            const email = user.email;
            const image_url = user.photoURL;
            const role = 'Worker';
    
            // Send user info including role to your backend
            await axiosPublic.post('/users', { name, email, role, image_url });
    
            navigate('/');
            toast.success('Signup Successful');
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };
    return (
        <>
            <Helmet>
                <title> MTEPF || Login</title>
            </Helmet>

            <div className="flex flex-col md:flex-row justify-between items-center w-full py-8">

                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                    <img src={img} alt="Login Visual" className="" />
                </div>
                <div className="flex flex-col w-full md:w-1/3 p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Log In</h1>
                        <p className="text-sm text-gray-400">
                            Sign in to access your account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6 ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onBlur={e => setEmail(e.target.value)}
                                    id="email"
                                    required
                                    placeholder="Enter Your Email Here"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                                    data-temp-mail-org="0"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="text-sm mb-2">
                                        Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    id="password"
                                    required
                                    placeholder="*******"
                                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-rose-500 w-full rounded-md py-3 text-white"
                            >
                                {loading ? (
                                    <TbFidgetSpinner className="animate-spin m-auto" />
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>
                    <div className="space-y-1">
                        <button
                            onClick={handleResetPassword}
                            className="text-xs hover:underline hover:text-rose-500 text-gray-400"
                        >
                            Forgot password?
                        </button>
                    </div>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                        <p className="px-3 text-sm text-gray-400">
                            Login with social accounts
                        </p>
                        <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
                    </div>

                    <button
                        disabled={loading}
                        onClick={handleGoogleSignIn}
                        className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded cursor-pointer"
                    >
                        <FcGoogle size={32} />
                        <p>Continue with Google</p>
                    </button>

                    <p className="px-6 text-sm text-center text-gray-400">
                        Don&apos;t have an account yet?{' '}
                        <Link to="/register" className="hover:underline hover:text-rose-500 text-gray-600">
                            Sign up
                        </Link>.
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
