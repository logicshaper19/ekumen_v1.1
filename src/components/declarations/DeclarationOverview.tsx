import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography, Box, Paper, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const DeclarationOverview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleNavigateToDetails = () => {
    navigate(`/declarations/${id}/details`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Declaration Overview
      </Typography>

      <Section>
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography>
          [Declaration description will be populated here]
        </Typography>
      </Section>

      <Section>
        <Typography variant="h6" gutterBottom>
          Synthesis Notes
        </Typography>
        <Typography>
          [Synthesis notes will be populated here]
        </Typography>
      </Section>

      <Section>
        <Typography variant="h6" gutterBottom>
          Evolutions/Changes
        </Typography>
        <Typography>
          [Evolution and changes information will be populated here]
        </Typography>
      </Section>

      <Section>
        <Typography variant="h6" gutterBottom>
          Risks for My Farm
        </Typography>
        <Typography>
          [Farm-specific risks will be populated here]
        </Typography>
      </Section>

      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('Request advisor support')}
        >
          Get Support from an Advisor
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleNavigateToDetails}
        >
          Help with Form/Audit
        </Button>
      </Box>
    </Container>
  );
};

export default DeclarationOverview;
