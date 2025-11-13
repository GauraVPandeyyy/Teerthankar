import React, { useEffect } from 'react';
import { api } from '../services/api';

const TestAPI: React.FC = () => {
  useEffect(() => {
    const testEndpoints = async () => {
      try {
        console.log('🧪 Testing API endpoints...');
        
        const categories = await api.getCategories();
        console.log('✅ Categories test:', categories);
        
        const products = await api.getProducts();
        console.log('✅ Products test:', products);
        
      } catch (error) {
        console.error('❌ API test failed:', error);
      }
    };

    testEndpoints();
  }, []);

  return null; // This component doesn't render anything
};

export default TestAPI;