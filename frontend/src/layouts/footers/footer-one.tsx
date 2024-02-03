import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import logo from "@/assets/images/logo/logo_03.png";
import logo_2 from "@/assets/images/logo/logo_04.png";
import logo_w from "@/assets/images/logo/logo_06.png";
import shape from "@/assets/images/shape/shape_28.svg";
import { WidgetOne, WidgetThree, WidgetTwo } from "./component/footer-widgets";
import SocialLinks from "./component/social-links";

const FooterOne = ({
	bottom_bg,
	style_2 = false,
	style_3 = false,
}: {
	bottom_bg?: string;
	style_2?: boolean;
	style_3?: boolean;
}) => {
	return (
		<div className={`footer-one ${style_2 ? "bg-two white-version" : ""}`}>
			<div className="container">
				<div className="inner-wrapper">
					<div className="row">
						<div className="col-lg-2 col-md-3 footer-intro mb-15">
							<div className="logo mb-15">
								<Link href="/" className="d-flex align-items-center">
									<Image src={style_2 ? logo_w : style_3 ? logo_2 : logo} alt="logo" priority />
								</Link>
							</div>
							<Image
								src={shape}
								alt="shape"
								className="lazy-img mt-80 sm-mt-30 sm-mb-20"
							/>
						</div>
						{/* widget one */}
						<WidgetOne style_2={style_2} cls="col-lg-2 col-md-3 col-sm-4" />
						{/* widget two */}
						<WidgetTwo style_2={style_2} cls="col-lg-2 col-md-3 col-sm-4" />
						{/* widget three */}
						<WidgetThree style_2={style_2} cls="col-lg-2 col-md-3 col-sm-4" />
						{/* widget end */}
						<div className="col-lg-4 mb-20 footer-newsletter">
							<h5 className={`footer-title ${style_2 ? "text-white" : ""}`}>
								Newsletter
							</h5>
							<p className={`${style_2 ? "text-white" : ""}`}>
								Join & get important new regularly
							</p>
							<form action="#" className={`d-flex ${style_3 ? 'border-style' : ''}`}>
								<input type="email" placeholder="Enter your email*" />
								<button>Send</button>
							</form>
							<p className="note">
								We only send interesting and relevant emails.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`bottom-footer ${bottom_bg} ${style_2 ? "mt-50 lg-mt-20" : ""}`}
			>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-4 order-lg-3 mb-15">
							<ul className="style-none d-flex order-lg-last justify-content-center justify-content-lg-end social-icon">
								<SocialLinks />
							</ul>
						</div>
						<div className="col-lg-4 order-lg-1 mb-15">
							<ul className="d-flex style-none bottom-nav justify-content-center justify-content-lg-start">
								<li>
									<Link href='/contact'>Privacy & Terms.</Link>
								</li>
								<li>
									<Link href='/contact'> Contact Us</Link>
								</li>
							</ul>
						</div>
						<div className="col-lg-4 order-lg-2">
							<p className={`text-center mb-15 ${style_2 ? "text-white" : ""}`}>
								Copyright @{new Date().getFullYear()} jobi inc.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FooterOne;
