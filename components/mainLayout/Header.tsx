import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { headerList } from "@/constants/headerList";

function Header() {
  const main_site_url = process.env.NEXT_PUBLIC_MAIN_SITE_URL;

  return (
    <section className="sec_header">
      <div className="head_top">
        <div className="header_inr flex justify-between items-center">
          <div className="logo">
            <Link href="https://restroomstallsandall.com" target="_blank">
              <Image
                src="/assets/images/logo.gif"
                alt="logo_img"
                width={400}
                height={136}
                priority
                unoptimized
              />
            </Link>
          </div>
          <div className="top_text">
            SOUTHEAST'S <span>LARGEST</span> AND <span>BEST</span> TOILET
            PARTITION DISTRIBUTOR
          </div>
          <div className="head_right_con flex flex-wrap items-center">
            <div className="call_us flex">
              <span className="flex items-center">
                <svg
                  width="28"
                  height="38"
                  viewBox="0 0 34 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.89992 2.25582L7.17968 1.29834C9.31337 0.402127 11.7611 1.33474 12.8971 3.47685L15.1589 7.74435C16.1449 9.60233 15.891 11.9126 14.5316 13.4544L10.7533 17.7451C11.2143 20.0742 12.2035 22.3194 13.7231 24.4807C15.1705 26.5739 17.0215 28.3547 19.1667 29.7178L23.9781 27.6222C25.8005 26.8303 27.9091 27.3743 29.2102 28.9712L32.2404 32.6913C33.7553 34.5491 33.7523 37.2932 32.2374 39.1129L30.6131 41.0633C28.9968 43.0041 26.5229 43.8751 24.115 43.3464C18.4333 42.1007 12.8993 37.4089 7.51078 29.2713C2.11457 21.1211 -0.160365 14.0008 0.68237 7.91958C1.03733 5.36044 2.64355 3.20463 4.90428 2.25544L4.89992 2.25582Z"
                    fill="white"
                  ></path>
                </svg>
              </span>
              <div className="call_us_text">
                CALL US NOW<Link href="tel:1-8448178255">1-844-81-STALL</Link>
              </div>
            </div>
            <div className="quote">
              <Button
                className="custom_btn y_btn pointer-events-none"
                type="button"
              >
                Get Your Quote
              </Button>
            </div>
            <div className="contactDetails">
              <h2>Questions? Contact Us</h2>
              <p className="phoneHolder">
                <Link href="tel:1-8448178255">1-844-81-STALL</Link>
              </p>
              <p className="emailHolder">
                <Link
                  href="mailto:cs@restroomstallsandall.com"
                  className="!text-[#3fab3b]"
                >
                  cs@restroomstallsandall.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="head_btm">
        <header className="header">
          <div className="row v-center">
            {/* <!-- menu start here --> */}
            <div className="header-item item-center">
              <div className="menu-overlay"></div>
              <nav className="menu">
                <div className="mobile-menu-head">
                  <div className="go-back">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-chevron-left"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </div>
                  <div className="current-menu-title"></div>
                  <div className="mobile-menu-close">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-x"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </div>
                </div>
                <ul className="menu-main">
                  {headerList?.map((list, idx) => (
                    <li className={list.className} key={idx}>
                      <Link
                        href={list.dirPath ? main_site_url + list.dirPath : "#"}
                        target={list.dirPath ? "_blank" : undefined}
                      >
                        {list.title}{" "}
                        {list.links.length > 0 && <ChevronDown size={20} />}
                      </Link>
                      {list.links.length > 0 && (
                        <div className="sub-menu mega-menu mega-menu-column-4">
                          {list.links.map((link, index) => (
                            <div className="list-item" key={index}>
                              <ul>
                                <li>
                                  <Link
                                    href={`${main_site_url}${link.path}`}
                                    target="_blank"
                                  >
                                    {link.title}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* <!-- menu end here --> */}
          </div>
        </header>
      </div>
    </section>
  );
}

export default Header;
