import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { useAuth } from "../../utils/AuthContext";
export default function LoginPage() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const navigate = useNavigate();
    // const { signIn } = useAuth();


    const handleLogin = async () => {
        navigate("/");
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            {/* Card */}
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

                <form >
                    {/* Email field */}
                    <div className="mb-4 text-left">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 ">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                // value={email}
                                // onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={` block w-full rounded-md border  bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2  sm:text-sm`}
                            />

                        </div>

                    </div>

                    {/* Password field */}
                    <div className="mb-6 text-left">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className={`block w-full rounded-md border  bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2  sm:text-sm`}
                            />

                        </div>

                    </div>

                    {/* Sign in button */}
                    <button
                        type="submit"

                        onClick={handleLogin}
                        className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}

