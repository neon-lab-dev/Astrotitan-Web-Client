/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from "../../../assets";
import { Link } from "react-router-dom";
import Container from "../../Reusable/Container/Container";
import Button from "../../Reusable/Button/Button";

const Footer = () => {
  const quickLinks: any = [
    {
      heading: "Product",
      links: [
        {
          label: "Personalized Insights",
          path: "/",
        },
        {
          label: "Daily Guidance",
          path: "/",
        },
        {
          label: "Kundli & Reports",
          path: "/",
        },
        {
          label: "Consult Astrologers",
          path: "/",
        },
        {
          label: "Remedies & Stores",
          path: "/",
        },
      ],
    },
    {
      heading: "Company",
      links: [
        {
          label: "About Astrotitan",
          path: "/about-us",
        },
        {
          label: "Contact Us",
          path: "/contact-us",
        },
      ],
    },
    {
      heading: "Resources",
      links: [
        {
          label: "FAQs",
          path: "/",
        },
      ],
    },
    {
      heading: "Legal",
      links: [
        {
          label: "Privacy Policy",
          path: "/",
        },
        {
          label: "Terms of Service",
          path: "/",
        },
        {
          label: "Refund Policy",
          path: "/",
        },
      ],
    },
    // {
    //   heading: "Contact Details",
    //   links: [
    //     {
    //       label:
    //         "Sampoorna Foods Pvt. Ltd. Plot No. 24, Industrial Area Phase II Hinjewadi, Pune, Maharashtra 411057 India",
    //       path: "",
    //       icon: ICONS.location,
    //     },
    //     {
    //       label: "+91 98765 43210",
    //       path: "tel:+91 98765 43210",
    //       icon: ICONS.call,
    //     },
    //     {
    //       label: "support@sampoornafoods.com",
    //       path: "mailto:support@sampoornafoods.com",
    //       icon: ICONS.email,
    //     },
    //   ],
    // },
  ];

  const socialMediaLinks = [
    {
      icon: ICONS.facebook,
      path: "https://www.facebook.com/",
    },
    {
      icon: ICONS.instagram,
      path: "https://www.instagram.com/",
    },
    {
      icon: ICONS.twitter,
      path: "https://twitter.com/",
    },
  ];

  return (
    <div className="py-14 font-Poppins text-neutral-5 bg-neutral-20">
      <Container>
        {/* mt-[151px] */}
        <div className="flex flex-col gap-6 font-Inter py-10 text-neutral-130">
          {/* Company info and social links */}
          <div className="flex flex-col gap-9">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <img src={ICONS.astrotitanLogo} alt="" className="size-9" />
                <p className="text-primary-5 text-[28px] font-bold">
                  Astrotitan
                </p>
              </Link>
              <p className="mt-4 font-GeneralSans max-w-282">
                AstroTitan helps you make better decisions with personalized
                astrology insights — designed around your life, your intentions,
                and your timing.
              </p>

              <div className="flex items-center gap-6 mt-6">
                {socialMediaLinks?.map((item) => (
                  <a href={item.path}>
                    <img src={item.icon} alt="" className="size-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-10 xl:gap-14 justify-between w-full mt-12">
            {quickLinks?.map((item: any) => (
              <div key={item?.heading} className="">
                <h1 className="font-Satoshi font-semibold text-xl leading-3">
                  {item?.heading}
                </h1>

                <div className="mt-5 flex flex-col gap-3 font-OpenSans leading-6">
                  {item?.links?.map((link: any) =>
                    link?.path ? (
                      <a
                        key={link?.label}
                        href={link?.path}
                        className="hover:underline flex gap-3 w-fit font-GeneralSans leading-6 md:leading-7.75"
                      >
                        {link?.icon && (
                          <img
                            src={link?.icon}
                            alt=""
                            className="size-5 mt-1"
                          />
                        )}
                        {link.label}
                      </a>
                    ) : (
                      <div
                        key={link?.label}
                        className="flex gap-3 font-GeneralSans leading-6 md:leading-7.75"
                      >
                        {link?.icon && (
                          <img
                            src={link?.icon}
                            alt=""
                            className="size-5 mt-1"
                          />
                        )}
                        <p>{link.label}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <Button label="Download From Play Store" />
            <Button label="Download From App Store" />
          </div>

          <hr className="border border-neutral-10/50 mt-12 mb-6" />
          <p className="text-center font-GeneralSans leading-6 md:leading-7.75">
            © All Rights Reserved by 2026 Astrotitan
          </p>

          {/* Contact Us Modal */}
        </div>
      </Container>
    </div>
  );
};

export default Footer;
