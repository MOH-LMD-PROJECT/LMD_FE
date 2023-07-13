import CustomCard from '../../components/CustomCard';

const FocalPerson = () => {
  const cardData = [
    {
      id: 1,
      title: 'Condoms Recieved',
      amount: 3213,
     
    },
    {
      id: 2,
      title: 'Condoms Distributed',
      amount: 200,
     
    },
    {
      id: 3,
      title: 'Condoms At Hand',
      amount: 3000,
     
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {cardData.map(({ title, amount,  id }) => (
          <CustomCard
            key={id}
            title={title}
            amount={amount}
          />
        ))}
      </div>
    </>
  );
};

export default FocalPerson;
