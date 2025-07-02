import { useEffect } from "react";
import axios from "axios";
import { domain } from "../../store";
import Swal from "sweetalert2";

export default function SettingsPage() {
  const deleteAccount = async () => {
    const documentId = JSON.parse(sessionStorage.getItem("userInfo")).user_id;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your account has been deleted.", "success");
        axios
          .delete(domain + `/api/pos-users/${documentId}`)
          .then((res) => {
            console.log(res);
            sessionStorage.removeItem("userInfo");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              "Error!",
              "There was an error deleting your account.",
              "error"
            );
          });
      }
    });
  };

  useEffect(() => {}, []);
  return (
    <div className="d-flex justify-content-center align-items-center w-100">
      <button onClick={deleteAccount} className="btn btn-danger">
        Delete Account{" "}
      </button>
    </div>
  );
}
