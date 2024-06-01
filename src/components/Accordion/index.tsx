import { useState, ReactNode } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface CustomAccordionProps {
  title: string;
  children: ReactNode;
}

function CustomAccordion({ title, children }: CustomAccordionProps) {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleAccordionChange}
      sx={{
        borderBottom: '1px solid #e5e5e5',
        borderTop: '1px solid #e5e5e5',
        boxShadow: 'none',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{ color: 'black' }} />}
        aria-controls="panel-content"
        id="panel-header"
      >
        <Typography
          sx={{
            color: expanded ? '#0071E3' : 'inherit',
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: '0px 16px 16px',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

CustomAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomAccordion;
