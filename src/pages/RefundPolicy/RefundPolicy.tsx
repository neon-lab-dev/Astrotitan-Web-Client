import Container from "../../components/Reusable/Container/Container";

const RefundPolicy = () => {
  const sections = [
    {
      title: "1. Consultation Fees",
      content:
        "All consultation fees are clearly displayed before booking. By scheduling a consultation, you agree to pay the stated fee for the selected service.",
    },
    {
      title: "2. No Refund After Session Starts",
      content: [
        "Once an astrological consultation session has started, fees become non-refundable.",
        "This applies regardless of whether the full session duration was utilized.",
        "No partial refunds will be issued for unused time within a session.",
      ],
    },
    {
      title: "3. Cancellation by User",
      content: [
        "Full refund available if cancelled 24 hours before scheduled session.",
        "50% refund available if cancelled within 12-24 hours of scheduled session.",
        "No refund for cancellations within 12 hours of scheduled session.",
        "Cancellations must be made through your account dashboard.",
      ],
    },
    {
      title: "4. Cancellation by Astrologer",
      content: [
        "If an astrologer cancels a session, you will receive a full refund automatically.",
        "You will be notified via email and can reschedule with another astrologer.",
        "Refunds typically process within 3-5 business days.",
      ],
    },
    {
      title: "5. Technical Issues",
      content: [
        "If technical issues on our platform prevent your session from occurring, you will receive a full refund.",
        "Please ensure you have a stable internet connection before starting.",
        "Issues on the user's end (internet, device, etc.) do not qualify for refunds.",
      ],
    },
    {
      title: "6. Dissatisfaction with Service",
      content:
        "Due to the subjective nature of astrological guidance, dissatisfaction with predictions or outcomes does not qualify for a refund. Our astrologers provide guidance in good faith based on their expertise.",
    },
    {
      title: "7. Duplicate Payments",
      content:
        "If you are accidentally charged twice for the same service, please contact support immediately. Duplicate payments will be refunded in full within 5-7 business days.",
    },
    {
      title: "8. Subscription Services",
      content: [
        "Monthly subscriptions can be cancelled at any time from your account settings.",
        "No refunds for partial months will be provided.",
        "Subscription fees are charged in advance and are non-refundable.",
        "Cancellation takes effect at the end of the current billing cycle.",
      ],
    },
    {
      title: "9. Processing Time",
      content: [
        "Approved refunds are processed within 3-7 business days.",
        "Credit card refunds depend on your bank's processing time.",
        "You will receive email confirmation once your refund is processed.",
      ],
    },
    {
      title: "10. How to Request a Refund",
      content: [
        "Submit refund requests through your account dashboard.",
        "Contact support at support@astrotitan.com for assistance.",
        "Include your booking ID and reason for the refund request.",
        "Please allow 2-3 business days for a response.",
      ],
    },
    {
      title: "11. Disputes & Chargebacks",
      content:
        "If you initiate a chargeback without first requesting a refund through our platform, your account may be suspended pending resolution. We encourage you to contact us first to resolve any issues.",
    },
    {
      title: "12. Policy Updates",
      content:
        "AstroTitan reserves the right to modify this refund policy at any time. Changes will be posted on this page and take effect immediately.",
    },
    {
      title: "13. Contact Us",
      content: (
        <div className="space-y-2">
          <p>
            For refund-related questions or to request a refund, please contact
            our support team:
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:support@astrotitan.com"
              className="text-neutral-5 font-medium underline"
            >
              support@astrotitan.com
            </a>
          </p>
          <p>
            Support Hours: Monday to Friday, 9:00 AM - 6:00 PM (IST)
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="text-center">
          <h1 className="text-[34px] md:text-[49px] xl:text-[55px] 2xl:text-[65px] font-Satoshi font-semibold leading-11.5 md:leading-14 2xl:leading-17.75 max-w-282 mx-auto">
            Refund Policy
          </h1>
          <p className="font-GeneralSans text-base md:text-lg max-w-2xl mx-auto mt-3 text-neutral-60">
            Understanding our refund process for astrological consultations and
            services.
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

export default RefundPolicy;