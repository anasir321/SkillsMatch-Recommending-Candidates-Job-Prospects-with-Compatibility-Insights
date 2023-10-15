import React from "react";
import Link from "next/link";

const NavCategoryMenu = () => {
  return (
    <nav className="category-menu d-none d-lg-block">
      <ul className="style-none nav-item d-flex align-items-center justify-content-between">
        <li>
          <Link href="/job-grid-v3">Design & Creative</Link>
        </li>
        <li>
          <Link href="/job-grid-v3">It & Development</Link>
        </li>
        <li>
          <Link href="/job-grid-v3">Trending</Link>
        </li>
        <li>
          <Link href="/job-grid-v3">Web & Mobile Dev</Link>
        </li>
        <li>
          <Link href="/job-grid-v3">Writing</Link>
        </li>
        <li>
          <Link href="/job-grid-v3">Sales & Marketing</Link>
        </li>
        <li>
          <Link href="/job-grid-v3">Music & Audio</Link>
        </li>
        <li>
          <Link href="/job-grid-v3">Video & Animation</Link>
        </li>
        <li className="dropdown">
          <a
            href="#"
            className="dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            More
          </a>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <Link className="dropdown-item" href="/job-grid-v3">
                AI Services
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/job-grid-v3">
                Photography
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/job-grid-v3">
                Programming & Tech
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavCategoryMenu;
