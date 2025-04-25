export interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  photo: string;
  doctor_introduction: string;
  specialities: Array<{
    name: string;
  }>;
  fees: string;
  experience: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
  video_consult: boolean;
  in_clinic: boolean;
}

export interface FilterState {
  consultationType: 'Video Consult' | 'In Clinic' | '';
  specialties: string[];
  feesSort: 'asc' | 'desc' | '';
  experienceSort: 'asc' | 'desc' | '';
  searchQuery: string;
} 