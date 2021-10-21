import react from "react";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <h1>BOILERMAKER</h1>
        <nav>
          <div>
            <Link to="/">Home</Link>
          </div>
        </nav>
        <hr />
      </div>
    );
  }
}
