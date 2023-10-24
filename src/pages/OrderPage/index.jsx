
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const apiUrl = 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province';
        const token = 'cfce17a8-6bfe-11ee-a59f-a260851ba65c';

        const response = await axios.get(apiUrl, {
          headers: {
            'Content-Type': 'application/json',
            'Token': token
          }
        });

        const provinceData = response.data.data

        setProvinces(provinceData);
      } catch (error) {
        console.error('Error fetching GHN provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <div>
      <h1>GHN Province List</h1>
      <ul>
        {provinces.map((province) => (
          <li key={province.ProvinceID}>{province.ProvinceName}</li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;