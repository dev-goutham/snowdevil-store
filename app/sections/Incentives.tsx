import DeliveryIcon from '~/components/svg/DeliveryIcon';
import ExchangeIcon from '~/components/svg/ExchangeIcon';
import WarrantyIcon from '~/components/svg/WarrantyIcon';

const incentives = [
  {
    Icon: <DeliveryIcon />,
    heading: 'Free Shipping',
    paragraph:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    Icon: <WarrantyIcon />,
    heading: '5-year warranty',
    paragraph:
      "If it breaks in the first 5 years we'll replace it. After that you're on your own though.",
  },
  {
    Icon: <ExchangeIcon />,
    heading: 'Exchanges',
    paragraph:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
];

const IncentivesSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between app-container">
      {incentives.map(({Icon, heading, paragraph}) => (
        <div className="flex flex-col items-center max-w-sm " key={heading}>
          {Icon}
          <h3 className="mt-2 font-semibold text-gray-600">{heading}</h3>
          <p className="mt-1 text-center">{paragraph}</p>
        </div>
      ))}
    </section>
  );
};

export default IncentivesSection;
