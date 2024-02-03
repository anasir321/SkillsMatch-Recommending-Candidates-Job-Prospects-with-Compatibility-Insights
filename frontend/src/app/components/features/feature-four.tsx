import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
// internal
import screen_1 from '@/assets/images/assets/screen_07.png';
import screen_2 from '@/assets/images/assets/screen_08.png';
import shape from '@/assets/images/shape/shape_25.svg';
import AccordionItem from '../accordion/accordion-item';

export function FeatureImgBox() {
	return (
		<div className="img-box position-relative d-flex align-items-center justify-content-center wow fadeInLeft">
			<Image src={screen_1} alt="screen" className="lazy-img" />
			<Image src={screen_2} alt="screen" className="lazy-img shapes screen_01" />
			<Image src={shape} alt="shape" className="lazy-img shapes shape_01" />
		</div>
	)
}
const FeatureFour = () => {
	return (
		<section className="text-feature-three position-relative pt-225 lg-pt-150 md-pt-100">
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-5 order-lg-last ms-auto">
						<div className="wow fadeInRight ms-xxl-5">
							<div className="title-one">
								<div className="sub-title">FIND FREELANCER</div>
								<h2 className="fw-600">Hire top talents</h2>
							</div>
							<div className="accordion accordion-style-one mt-40" id="accordionOne">
								<AccordionItem id='one' isShow={true} title='Seamless Search' desc='It only takes 5 minutes. Set-up is smooth and simple, with fully customisable page design to reflect your brand. It only takes 5 minutes.' parent='accordionOne' />
								<AccordionItem id='two' title='Hire top talents' desc='Practice what you learned on realistic lorem quis test questions testing.' parent='accordionOne' />
							</div>
							<Link href="/candidates-v2" className="btn-five border6 mt-70 lg-mt-40">Explorer All</Link>
						</div>
					</div>
					<div className="col-lg-6 order-lg-first">
						<FeatureImgBox />
					</div>
				</div>
			</div>
		</section>
	);
};

export default FeatureFour;