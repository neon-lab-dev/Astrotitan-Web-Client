import Container from "../../components/Reusable/Container/Container";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing or using AstroTitan, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the platform.",
    },
    {
      title: "2. Eligibility",
      content: [
        "You must be at least 18 years of age to use our services.",
        "You must provide accurate and complete information during registration.",
        "You are responsible for maintaining the confidentiality of your account.",
      ],
    },
    {
      title: "3. Services Provided",
      content: [
        "AstroTitan offers astrological consultations and related services.",
        "All consultations are for entertainment and guidance purposes only.",
        "We reserve the right to modify or discontinue services at any time.",
      ],
    },
    {
      title: "4. User Conduct",
      content: [
        "You agree not to misuse the platform or harass astrologers.",
        "You will not share inappropriate or offensive content.",
        "You will not attempt to gain unauthorized access to our systems.",
      ],
    },
    {
      title: "5. Intellectual Property",
      content:
        "All content on AstroTitan, including logos, text, graphics, and software, is the property of AstroTitan and protected by copyright laws.",
    },
    {
      title: "6. Third-Party Links",
      content:
        "Our platform may contain links to third-party websites. We are not responsible for the content or practices of these sites.",
    },
    {
      title: "7. Disclaimer of Warranties",
      content:
        "AstroTitan provides services 'as is' without any warranties. We do not guarantee the accuracy, reliability, or completeness of any astrological predictions.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "To the fullest extent permitted by law, AstroTitan shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services.",
    },
    {
      title: "9. Indemnification",
      content:
        "You agree to indemnify and hold AstroTitan harmless from any claims, damages, or expenses arising from your violation of these terms.",
    },
    {
      title: "10. Termination",
      content: [
        "We may terminate or suspend your account immediately for violations of these terms.",
        "You may delete your account at any time through your profile settings.",
        "Upon termination, your right to use the platform will cease immediately.",
      ],
    },
    {
      title: "11. Governing Law",
      content:
        "These terms shall be governed by and construed in accordance with the laws of the jurisdiction where AstroTitan operates, without regard to conflict of law provisions.",
    },
    {
      title: "12. Changes to Terms",
      content:
        "AstroTitan reserves the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.",
    },
    {
      title: "13. Contact Information",
      content: (
        <p>
          For questions about these Terms and Conditions, please contact us at:{" "}
          <a
            href="mailto:support@astrotitan.com"
            className="text-neutral-5 font-medium underline"
          >
            support@astrotitan.com
          </a>
        </p>
      ),
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 max-w-282 mx-auto">
            Terms & Conditions
          </h1>
          <p className="font-GeneralSans text-base md:text-lg max-w-2xl mx-auto mt-3 text-neutral-60">
            Please read these terms carefully before using AstroTitan's
            services. By using our platform, you agree to these conditions.
          </p>
        </div>

        {/* Contents */}
        <div className="mt-12 md:mt-16 lg:mt-25">
          {sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl md:text-2xl font-Satoshi font-semibold text-neutral-5">
                {section.title}
              </h2>
              {Array.isArray(section.content) ? (
                <ul className="font-GeneralSans mt-3 space-y-2 text-neutral-60">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary-5 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-GeneralSans mt-3 text-neutral-60">
                  {section.content}
                </p>
              )}
              {index < sections.length - 1 && (
                <hr className="border border-neutral-35/50 h-px w-full my-6 xl:my-8" />
              )}
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-10 pt-6 text-center border-t border-neutral-35/50">
          <p className="text-sm text-neutral-50 font-GeneralSans">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default TermsAndConditions;
