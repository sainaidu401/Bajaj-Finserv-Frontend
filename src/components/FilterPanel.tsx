import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
  FormGroup,
} from '@mui/material';
import { Doctor, FilterState } from '../types/Doctor';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  doctors: Doctor[];
}

const FilterPanel = ({ filters, onFilterChange, doctors }: FilterPanelProps) => {
  // Get unique specialties from doctors
  const specialties = Array.from(
    new Set(
      doctors.flatMap(doctor => 
        doctor.specialities.map(s => s.name)
      )
    )
  ).sort();

  const handleConsultationTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      consultationType: event.target.value as FilterState['consultationType'],
    });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];

    onFilterChange({
      ...filters,
      specialties: newSpecialties,
    });
  };

  const handleFeesSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      feesSort: event.target.value as 'asc' | 'desc' | '',
    });
  };

  const handleExperienceSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filters,
      experienceSort: event.target.value as 'asc' | 'desc' | '',
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Consultation Mode Filter */}
      <FormControl component="fieldset">
        <FormLabel component="legend" data-testid="filter-header-moc">
          Consultation Mode
        </FormLabel>
        <RadioGroup
          value={filters.consultationType}
          onChange={handleConsultationTypeChange}
        >
          <FormControlLabel
            value="Video Consult"
            control={<Radio data-testid="filter-video-consult" />}
            label="Video Consult"
          />
          <FormControlLabel
            value="In Clinic"
            control={<Radio data-testid="filter-in-clinic" />}
            label="In Clinic"
          />
        </RadioGroup>
      </FormControl>

      {/* Specialties Filter */}
      <FormControl component="fieldset">
        <FormLabel component="legend" data-testid="filter-header-speciality">
          Specialties
        </FormLabel>
        <FormGroup>
          {specialties.map((specialty) => (
            <FormControlLabel
              key={specialty}
              control={
                <Checkbox
                  checked={filters.specialties.includes(specialty)}
                  onChange={() => handleSpecialtyChange(specialty)}
                  data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-')}`}
                />
              }
              label={specialty}
            />
          ))}
        </FormGroup>
      </FormControl>

      {/* Sort Filter */}
      <FormControl component="fieldset">
        <FormLabel component="legend" data-testid="filter-header-sort">
          Sort by Fees
        </FormLabel>
        <RadioGroup
          value={filters.feesSort}
          onChange={handleFeesSortChange}
        >
          <FormControlLabel
            value="asc"
            control={<Radio data-testid="sort-fees" />}
            label="Low to High"
          />
          <FormControlLabel
            value="desc"
            control={<Radio />}
            label="High to Low"
          />
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset">
        <FormLabel component="legend">
          Sort by Experience
        </FormLabel>
        <RadioGroup
          value={filters.experienceSort}
          onChange={handleExperienceSortChange}
        >
          <FormControlLabel
            value="asc"
            control={<Radio />}
            label="Low to High"
          />
          <FormControlLabel
            value="desc"
            control={<Radio data-testid="sort-experience" />}
            label="High to Low"
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default FilterPanel; 