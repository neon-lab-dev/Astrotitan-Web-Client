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
      <div className="size-9 rounded-full bg-primary-25 flex items-center justify-center">
        <img src={item?.icon} alt="" className="size-6" />
      </div>
      <h3 className="font-Satoshi text-xl leading-8 text-neutral-5 text-center mt-6 xl:max-w-[86%] mx-auto">
        {item?.title}
      </h3>
      {item?.description && (
        <p className="description mt-3">{item?.description}</p>
      )}
    </div>
  );
};

export default HighlightCard;
