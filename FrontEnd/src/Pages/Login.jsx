import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer,Bounce,Slide,Flip,Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    if(localStorage.getItem('token')){

        const token=localStorage.getItem('token');
        useEffect(() => {

        axios.get('https://recipe-finder-usfp.onrender.com/protected', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if(res.success){
            navigate('/home')
          }
      
      
        }
      )}
      , []);

    }
      const notifySuccess = () => toast.success('Logging you in!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
    });

    const notifyError = () => toast.error('Invalid credentials. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,

       
    });

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://recipe-finder-usfp.onrender.com/login', { email, password });
            
            // Check for successful login message
            if (res.data.message === 'Success') {
                console.log('Login Successful');
                notifySuccess(); // Show success toast
    
                // Use setTimeout to delay navigation, allowing the toast to display
                setTimeout(() => {
                    localStorage.setItem('token', res.data.token);
                    navigate('/home');
                }, 1000); // 1 second delay to allow toast display
            } else {
                console.log(res.message);
                notifyError(); // Show error toast for invalid credentials
            }
        } catch (error) {
            console.error(error.response.data);
            notifyError(); // Show error toast for request failures
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-10 shadow-2xl shadow-black rounded-3xl bg-[#88baa6] border-2 border-gray-500 font-sans max-w-sm w-96">
                <h1 className="text-4xl text-center mb-6 font-bold text-black">Login</h1>

                <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
                    <div className="relative my-6">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder=" Your Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="relative my-6">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
                            placeholder="Your Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className="w-full py-2 mb-4 text-xl text-white bg-black rounded-full hover:bg-[#4C7766] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#38ad7f]"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Login
                    </button>

                    <div className="text-center">
                        <span className="text-md text-gray-800">
                            New Here? <Link to="/register" className="text-black hover:underline">Create an account</Link>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer /> {/* Ensure the ToastContainer is included here */}
        </div>
    );
};

export default Login;
