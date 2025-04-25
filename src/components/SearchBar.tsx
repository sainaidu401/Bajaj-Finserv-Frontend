import { useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Doctor } from '../types/Doctor';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  doctors: Doctor[];
}

const SearchBar = ({ value, onChange, doctors }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<Doctor[]>([]);

  const handleInputChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    onChange(newValue);
    if (newValue.length >= 2) {
      const filtered = doctors
        .filter(doctor => doctor.name.toLowerCase().includes(newValue.toLowerCase()))
        .slice(0, 3);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={suggestions}
      getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
      value={value}
      onChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for doctors"
          variant="outlined"
          fullWidth
          data-testid="autocomplete-input"
        />
      )}
      renderOption={(props, option) => (
        <li {...props} data-testid="suggestion-item">
          {typeof option === 'string' ? option : option.name}
        </li>
      )}
    />
  );
};

export default SearchBar; 