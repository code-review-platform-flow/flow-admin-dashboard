import GradientBg from "@/components/page/login/gradient-bg";
import LoginForm from "@/components/page/login/login-form";
import { Verified } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-white items-centerw-full">
      <div className={`relative hidden w-1/2 lg:block`}>
        <GradientBg className="absolute top-0 left-0 w-full h-full" />
        <Verified width={18} height={18} />
      </div>

      <div className="w-full lg:w-1/2">
        <div className="relative flex items-center justify-center h-full">
          <section className="w-full px-5 pb-10 text-gray-800 sm:w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6 sm:px-0">
            <div className="flex flex-col items-center justify-center px-2 mt-8 sm:mt-0">
              <h2 className="mt-2 text-5xl font-bold leading-tight inter">FLOW</h2>
              <div className="mt-1 text-lg text-gray-400">Admin System</div>
            </div>

            <div className="w-full px-2 mt-12 sm:px-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
