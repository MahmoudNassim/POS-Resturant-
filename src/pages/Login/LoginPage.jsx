import styles from "./LoginPage.module.css";
import axios from "axios";
import { useRef } from "react";
import { domain } from "../../store";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const phoneInput = useRef();
  const passwordInput = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    let url = domain + "/api/pos-users";
    console.log("Domain:", domain);

    axios
      .get(url, {
        params: {
          filters: {
            $and: [
              {
                user_phone: {
                  $eq: phoneInput.current.value,
                },
              },
              {
                user_password: {
                  $eq: passwordInput.current.value,
                },
              },
            ],
          },
        },
      })
      .then((res) => {
        if (res.data.data.length == 1) {
          let userInfo = res.data.data[0];
          let userData = {
            user_name: userInfo.user_name,
            user_role: userInfo.user_role,
            user_id: userInfo.documentId,
          };
          sessionStorage.setItem("userInfo", JSON.stringify(userData));
          Swal.fire({
            icon: "success",
            text: "Login Success",
            timer: 1500,
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: "Wrong phone number or password",
          });
        }
      });
  };

  return (
    <div
      className={`d-flex align-items-center justify-content-center vh-100 w-100 ${styles.loginWrapper}`}
    >
      <form
        onSubmit={handleLogin}
        className={`col-10 col-md-6 col-lg-4 bg-white shadow p-4 rounded-4 `}
      >
        <h3 className="mb-4 text-center fw-bold">Welcome to POS</h3>
        <input
          ref={phoneInput}
          className="form-control mb-3"
          type="text"
          placeholder="Phone Number"
          required
        />
        <input
          ref={passwordInput}
          className="form-control mb-4"
          type="password"
          placeholder="Password"
          required
        />
        <button className="btn btn-warning col-12 fw-bold py-2">Login</button>
      </form>
    </div>
  );
}
