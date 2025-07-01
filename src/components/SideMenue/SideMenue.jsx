import { useEffect, useState } from "react";
import styles from "./SideMenue.module.css";
import { PiCashRegisterDuotone } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { FaBurger } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { domain } from "../../store";
import axios from "axios";

export default function SideMenue() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  const [userInfo, setUserInfo] = useState({});

  const [links] = useState([
    { id: 1, name: "Dashboard", icon: <MdDashboard />, path: "/" },
    {
      id: 2,
      name: "Food and Drinks",
      icon: <FaBurger />,
      path: "/orders",
    },
    {
      id: 3,
      name: "Invoices",
      icon: <HiDocumentCurrencyDollar />,
      path: "/invoices",
    },
    { id: 4, name: "Settings", icon: <VscSettings />, path: "/settings" },
  ]);

  let handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (userInfo) {
      let user_id = userInfo.user_id;
      let url = domain + `/api/pos-users/${user_id}`;
      axios
        .get(url)
        .then(() => {
          setUserInfo(userInfo);
        })
        .catch(() => {
          sessionStorage.clear();
          navigate("/login");
        });
    } else {
      sessionStorage.clear();
      navigate("/login");
    }
  }, []);

  return (
    <div
      className=" d-flex flex-column px-3 border-end justify-content-between pb-5  "
      id={styles.SideMenue}
    >
      <div className="col-12 d-flex flex-column gap-3">
        <div className="col-12 d-flex align-items-center py-3 gap-2">
          <PiCashRegisterDuotone className={styles.icon} />
          <p className="m-0 fs-4">
            Smart<span id={styles.logo}>POS</span>
          </p>
        </div>
        {links.map((el, index) => (
          <Link
            to={el.path}
            key={el.id}
            onClick={() => setActiveTab(index)}
            className={
              "col-12 d-flex align-items-center gap-2 nav-link " +
              styles.link +
              " " +
              (activeTab == index && styles.activeLink)
            }
          >
            {el.icon}
            <p className="m-0">{el.name}</p>
          </Link>
        ))}
      </div>

      <div className="col-12 d-flex flex-column align-items-center gap-2 ">
        <FaCircleUser className="fs-3" />
        {/* <img src="" alt="" /> */}
        <h4>{userInfo.user_name}</h4>
        <p>{userInfo.user_role}</p>
        <button onClick={handleLogout} className="btn btn-primary">
          LogOut
        </button>
      </div>
    </div>
  );
}
//
