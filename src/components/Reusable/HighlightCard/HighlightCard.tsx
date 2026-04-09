type THighlightCardProps = {
  item: {
    icon: string;
    title: string;
  };
};
const HighlightCard = ({ item }: THighlightCardProps) => {
  return (
    <div className="bg-neutral-15 border border-primary-5 rounded-xl p-6 flex flex-col items-center gap-6">
      <img src={item?.icon} alt="" className="size-12" />
      <h3 className="font-Satoshi font-semibold text-[28px] leading-9 text-neutral-5 text-center">
        {item?.title}
      </h3>{" "}
    </div>
  );
};

export default HighlightCard;
