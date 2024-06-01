import { ReactNode } from 'react';
import PropTypes from 'prop-types';

interface CustomCardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CustomCardProps) {
  return (
    <div className={`flex justify-center rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

export default Card;
