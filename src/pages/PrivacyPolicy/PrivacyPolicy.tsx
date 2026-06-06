import Container from "../../components/Reusable/Container/Container";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "1. Platform Overview",
      content:
        "AstroTitan connects users with independent astrologers for consultations and related services. We do not guarantee outcomes, predictions, or results from any consultation.",
    },
    {
      title: "2. User Responsibility",
      content: [
        "You must provide accurate information during signup and consultations.",
        "You agree to use the platform respectfully and not misuse any services.",
        "You are responsible for your decisions based on consultations.",
      ],
    },
    {
      title: "3. Astrologer Responsibility",
      content: [
        "Astrologers must provide honest and ethical guidance.",
        "Misleading claims (e.g., guaranteed results) are strictly prohibited.",
        "AstroTitan reserves the right to suspend or remove profiles that violate guidelines.",
      ],
    },
    {
      title: "4. Payments & Refunds",
      content: [
        "All payments are processed securely through the platform.",
        "Consultation fees are non-refundable once the session has started.",
        "Refunds (if applicable) are subject to platform policies.",
      ],
    },
    {
      title: "5. No Guarantees",
      content:
        "AstroTitan does not guarantee the accuracy of predictions or outcomes. Consultations are for guidance purposes only.",
    },
    {
      title: "6. Privacy & Data",
      content:
        "Your personal information is handled in accordance with our Privacy Policy. We do not share your data without consent, except where required by law.",
    },
    {
      title: "7. Account & Access",
      content: [
        "You are responsible for maintaining the confidentiality of your account.",
        "Do not share login credentials with others.",
        "AstroTitan may suspend accounts in case of misuse or suspicious activity.",
      ],
    },
    {
      title: "8. Platform Rights",
      content:
        "AstroTitan may update features, policies, or terms at any time to improve the platform and ensure compliance.",
    },
    {
      title: "9. Limitation of Liability",
      content:
        "AstroTitan is not liable for any decisions, losses, or actions taken based on consultations.",
    },
    {
      title: "10. Contact",
      content: (
        <p>
          For any questions or concerns, please contact our support team at:{" "}
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
            Privacy Policy
          </h1>
          <p className="font-GeneralSans text-base md:text-lg max-w-2xl mx-auto mt-3 text-neutral-60">
            Your privacy matters to us. This policy explains how AstroTitan
            collects, uses, and protects your information.
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
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-primary-5">•</span>
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

export default PrivacyPolicy;
