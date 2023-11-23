import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        React Blog
      </Link>
      <div>
        <div className="input-group ps-5">
          <div id="navbar-search-autocomplete" className="form-outline">
            <input
              type="search"
              id="form1"
              className="form-control custom-input"
              placeholder="Search"
            />
          </div>
          <button type="button" className="btn btn-primary btn-sms ">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>
        <Link to="/profile">프로필</Link>
      </div>
    </header>
  );
}
