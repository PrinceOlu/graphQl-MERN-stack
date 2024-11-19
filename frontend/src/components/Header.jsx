import logo from "../assets/logo.png"; // Correct import

function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex align-items-center">
           <img src={logo} alt="logo" className="mr-2" style={{ height: '40px' }} />
            <span>Project Mgmt</span>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default Header;
