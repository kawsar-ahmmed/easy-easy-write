import { yupResolver } from "@hookform/resolvers/yup";
import firebase from "firebase/app";
import "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import bannerImg from "../images/login-img.png";
import logo from "../images/logo.png";
import { firebaseConfig } from "../src/components/firebaseConfig/firebase.config";
import GoogleLogin from "../src/components/googleLogin/googleLogin";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Signup = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data, e) => {
    const email = data.email;
    const config = {
      url: 'https://www.easyessaywriting.com/signupComplete',
      handleCodeInApp: true,
    };

    firebase
      .auth()
      .sendSignInLinkToEmail(email, config)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", JSON.stringify(email));
        toast.success(`Please check your email for complete your Registration`);
        e.target.reset();
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Head>
        <title>Easy Essay Writing | Signup</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="overflow-hidden position-relative">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div
          className="position-absolute top-0 left-0 m-5 d-none d-md-block"
          style={{ zIndex: "999999" }}
        >
          <Link href="/">
            <a>
              <Image src={logo} alt="logo" height="50px" width="130px" />
            </a>
          </Link>
        </div>

        <div className="row d-flex align-items-center vh-100">
          <div className="col-md-6 d-none d-md-block vh-100 position-relative">
            <Image src={bannerImg} alt="banner-img" />
          </div>

          <div className="col-md-6 mb-2">
            <div className="container ">
              <GoogleLogin />

              <form onSubmit={handleSubmit(onSubmit)} className="px-md-5">
                <div className="mb-2">
                  <label className="form-label fs-14" htmlFor="email">
                    Email
                  </label>
                  <input
                    autoComplete="off"
                    className="form-control input-background py-2"
                    type="email"
                    id="email"
                    defaultValue=""
                    placeholder="example@email.com"
                    {...register("email")}
                  />
                  <span role="alert" className="text-danger">
                    {errors.email?.message}
                  </span>
                </div>

                <button className="btn btn-primary w-100 mt-2" type="submit">
                  Submit
                </button>
              </form>

              <small className="text-center d-block mt-1">
                <strong>
                  Already have an account?
                  <Link href="/signin">
                    <a className="text-primary">Sign In</a>
                  </Link>{" "}
                </strong>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
