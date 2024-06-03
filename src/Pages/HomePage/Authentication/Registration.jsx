import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../../../hooks/UseAuth';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { imageUpload } from '../../../api/utlis';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Registration = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
    setUser, // Import setUser from useAuth
  } = useAuth();

  const [role, setRole] = useState('Worker');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];

    try {
      setLoading(true);
      const photoURL = await imageUpload(image);
      const result = await createUser(email, password);
      await updateUserProfile(name, photoURL);
      await axiosPublic.post('/users', { name, email, role, photoURL });

      // Manually update the user state
      setUser({
        ...result.user,
        displayName: name,
        photoURL: photoURL,
      });

      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const role = 'Worker';

      await axiosPublic.post('/users', { name, email, role, photoURL });

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
        <title>MTEP | Sign Up</title>
      </Helmet>
      <div className='flex justify-center items-center min-h-screen'>
        <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
          <div className='mb-8 text-center'>
            <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
            <p className='text-sm text-gray-400'>Welcome to Micro Task Earning Platform</p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label htmlFor='name' className='block mb-2 text-sm'>
                  Name
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Enter Your Name Here'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                  data-temp-mail-org='0'
                />
              </div>
              <div>
                <label htmlFor='image' className='block mb-2 text-sm'>
                  Select Image:
                </label>
                <input
                  required
                  type='file'
                  id='image'
                  name='image'
                  accept='image/*'
                />
              </div>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm'>
                  Email address
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  placeholder='Enter Your Email Here'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                  data-temp-mail-org='0'
                />
              </div>
              <div>
                <label htmlFor='role' className='block mb-2 text-sm'>
                  Select Role:
                </label>
                <select
                  id='role'
                  name='role'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value='Worker'>Worker</option>
                  <option value='TaskCreator'>TaskCreator</option>
                </select>
              </div>
              <div>
                <label htmlFor='password' className='block mb-2 text-sm'>
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  autoComplete='new-password'
                  id='password'
                  required
                  placeholder='*******'
                  className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                />
              </div>
            </div>

            <div>
              <button
                disabled={loading}
                type='submit'
                className='bg-rose-500 w-full rounded-md py-3 text-white'
              >
                {loading ? (
                  <TbFidgetSpinner className='animate-spin m-auto' />
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
          <div className='flex items-center pt-4 space-x-1'>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
            <p className='px-3 text-sm dark:text-gray-400'>
              Signup with social accounts
            </p>
            <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          </div>
          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
          >
            <FcGoogle size={32} />
            <p>Continue with Google</p>
          </button>
          <p className='px-6 text-sm text-center text-gray-400'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='hover:underline hover:text-rose-500 text-gray-600'
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Registration;
