// apiService.js
export const fetchJobRoles = async () => {
    try {
      const response = await fetch('https://erp.triz.co.in/lms_data?table=s_jobrole');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching job roles:', error);
      return [];
    }
  };