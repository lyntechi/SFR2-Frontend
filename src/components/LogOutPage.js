import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { setLoggedOut } from "../actions/accountActions";

const LogOutPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem("token");
    props.setLoggedOut();
    history.push("/login");
  }, []);

  return null;
};

export default connect(null, { setLoggedOut })(LogOutPage);
