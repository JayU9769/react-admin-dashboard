import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <>
      <Link to={"/admin"} className={`logo-default`}>
        <img src="/assets/logo/logo-default.svg" alt="logo" />
      </Link>
    </>
  );
};
export const LogoMini = () => {
  return (
    <>
      <Link to={"/admin"} className={`logo-mini`}>
        <img src="/assets/logo/logo-mini.svg" alt="logo" />
      </Link>
    </>
  );
};
