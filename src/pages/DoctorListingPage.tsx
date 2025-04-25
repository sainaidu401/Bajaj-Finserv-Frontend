import { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Doctor, FilterState } from '../types/Doctor';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DoctorList from '../components/DoctorList';

const DoctorListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    consultationType: searchParams.get('consultationType') as FilterState['consultationType'] || '',
    specialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    feesSort: searchParams.get('feesSort') as FilterState['feesSort'] || '',
    experienceSort: searchParams.get('experienceSort') as FilterState['experienceSort'] || '',
    searchQuery: searchParams.get('search') || '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    // Update URL params
    const params = new URLSearchParams();
    if (filters.consultationType) params.set('consultationType', filters.consultationType);
    if (filters.specialties.length) params.set('specialties', filters.specialties.join(','));
    if (filters.feesSort) params.set('feesSort', filters.feesSort);
    if (filters.experienceSort) params.set('experienceSort', filters.experienceSort);
    if (filters.searchQuery) params.set('search', filters.searchQuery);
    setSearchParams(params);

    // Apply filters
    let result = [...doctors];

    // Filter by search query
    if (filters.searchQuery) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Filter by consultation type
    if (filters.consultationType) {
      result = result.filter(doctor => {
        if (filters.consultationType === 'Video Consult') {
          return doctor.video_consult;
        } else if (filters.consultationType === 'In Clinic') {
          return doctor.in_clinic;
        }
        return true;
      });
    }

    // Filter by specialties
    if (filters.specialties.length > 0) {
      result = result.filter(doctor =>
        doctor.specialities.some(specialty => 
          filters.specialties.includes(specialty.name)
        )
      );
    }

    // Apply sorting
    if (filters.feesSort || filters.experienceSort) {
      result.sort((a, b) => {
        let comparison = 0;

        // First sort by fees if specified
        if (filters.feesSort) {
          const feesA = parseInt(a.fees.replace(/[^0-9]/g, ''));
          const feesB = parseInt(b.fees.replace(/[^0-9]/g, ''));
          comparison = filters.feesSort === 'asc' ? feesA - feesB : feesB - feesA;
        }

        // Then sort by experience if specified and fees are equal
        if (filters.experienceSort && comparison === 0) {
          const expA = parseInt(a.experience.replace(/[^0-9]/g, ''));
          const expB = parseInt(b.experience.replace(/[^0-9]/g, ''));
          comparison = filters.experienceSort === 'asc' ? expA - expB : expB - expA;
        }

        return comparison;
      });
    }

    setFilteredDoctors(result);
  }, [filters, doctors]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <SearchBar
          value={filters.searchQuery}
          onChange={(value) => setFilters(prev => ({ ...prev, searchQuery: value }))}
          doctors={doctors}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box sx={{ width: '25%', position: 'sticky', top: 20, height: 'fit-content' }}>
          <Paper sx={{ p: 2 }}>
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              doctors={doctors}
            />
          </Paper>
        </Box>
        <Box sx={{ width: '75%' }}>
          <DoctorList doctors={filteredDoctors} loading={loading} />
        </Box>
      </Box>
    </Container>
  );
};

export default DoctorListingPage; 