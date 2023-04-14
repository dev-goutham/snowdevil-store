import {GrFacebook, GrInstagram, GrTwitter, GrYoutube} from 'react-icons/gr';

const navigation = [
  {
    name: 'Facebook',
    href: '#',
    icon: <GrFacebook />,
  },
  {
    name: 'Instagram',
    href: '#',
    icon: <GrInstagram />,
  },
  {
    name: 'Twitter',
    href: '#',
    icon: <GrTwitter />,
  },

  {
    name: 'YouTube',
    href: '#',
    icon: <GrYoutube />,
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="px-6 py-12 mx-auto max-w-7xl md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              {item.icon}
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-xs leading-5 text-center text-gray-500">
            &copy; 2023 Snow Devil, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
