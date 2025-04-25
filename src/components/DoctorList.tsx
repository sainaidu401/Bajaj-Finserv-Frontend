import { Box, Card, CardContent, Typography, Chip, CircularProgress, Grid } from '@mui/material';
import { Doctor } from '../types/Doctor';

interface DoctorListProps {
  doctors: Doctor[];
  loading: boolean;
}

const DoctorList = ({ doctors, loading }: DoctorListProps) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (doctors.length === 0) {
    return (
      <Box p={3}>
        <Typography>No doctors found matching your criteria.</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {doctors.map((doctor) => (
        <Grid item xs={12} sm={6} md={4} key={doctor.id}>
          <Card 
            data-testid="doctor-card"
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ 
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                mb: 2
              }}>
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <Typography 
                variant="h6" 
                data-testid="doctor-name"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  minHeight: '3em',
                  mb: 1
                }}
              >
                {doctor.name}
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  data-testid="doctor-specialty"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '2.5em'
                  }}
                >
                  {Array.isArray(doctor.specialities) 
                    ? doctor.specialities.map(s => s.name).join(', ')
                    : ''}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  data-testid="doctor-languages"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    minHeight: '2.5em'
                  }}
                >
                  Languages: {Array.isArray(doctor.languages) ? doctor.languages.join(', ') : ''}
                </Typography>
              </Box>
              <Box display="flex" gap={1} mb={1} flexWrap="wrap">
                {doctor.video_consult && (
                  <Chip
                    label="Video Consult"
                    size="small"
                    color="primary"
                  />
                )}
                {doctor.in_clinic && (
                  <Chip
                    label="In Clinic"
                    size="small"
                    color="default"
                  />
                )}
              </Box>
              <Box display="flex" justifyContent="space-between" mt="auto">
                <Typography variant="body2" data-testid="doctor-experience">
                  Experience: {doctor.experience}
                </Typography>
                <Typography variant="body2" data-testid="doctor-fee">
                  Fee: {doctor.fees}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DoctorList; 