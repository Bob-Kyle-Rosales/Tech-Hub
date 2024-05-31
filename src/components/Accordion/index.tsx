import { ReactNode, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CustomAccordion({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
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
          padding: '00px 16px 16px',
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export default CustomAccordion;
