type THighlightCardProps = {
  item: {
    icon: string;
    title: string;
    description?: string;
  };
};
const HighlightCard = ({ item }: THighlightCardProps) => {
  return (
    <div className="bg-neutral-15 border border-primary-5 rounded-xl p-6 flex flex-col items-center">
      <img src={item?.icon} alt="" className="size-12" />
      <h3 className="font-Satoshi font-semibold text-[28px] leading-9 text-neutral-5 text-center mt-6">
        {item?.title}
      </h3>
      {item?.description && (
        <p className="description mt-3">{item?.description}</p>
      )}
    </div>
  );
};

export default HighlightCard;
