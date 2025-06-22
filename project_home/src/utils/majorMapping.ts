import { getMajorById } from '../data/academicData';

// Map student filiere names to major IDs
export const getMajorIdFromFiliereName = (filiereName: string): string | null => {
  const normalizedFiliereName = filiereName.toLowerCase().trim();
  
  // Map common filiere names to major IDs
  const filiereToMajorMap: Record<string, string> = {
    'computer science engineering': 'major-cs',
    'computer science': 'major-cs',
    'cs': 'major-cs',
    'software engineering': 'major-cs',
    'applied physics': 'major-physics',
    'physics': 'major-physics',
    'ph': 'major-physics',
    'mathematics': 'major-math',
    'math': 'major-math',
    'ma': 'major-math',
    'pure mathematics': 'major-math',
    'applied mathematics': 'major-math'
  };
  
  const majorId = filiereToMajorMap[normalizedFiliereName];
  if (majorId) {
    // Verify the major exists
    const major = getMajorById(majorId);
    return major ? majorId : null;
  }
  
  return null;
};

// Get major object from filiere name
export const getMajorFromFiliereName = (filiereName: string) => {
  const majorId = getMajorIdFromFiliereName(filiereName);
  return majorId ? getMajorById(majorId) : null;
}; 