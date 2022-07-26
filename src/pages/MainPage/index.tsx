import React, { useEffect, useState } from 'react';

import partners from '../../shared/partners.json';
import PartnerTable from '../../components/PartnerTable';

import styles from './styles.module.scss';

const MainPage = () => {
  const [selectedPartners, setSelectedPartners] = useState<Array<PartnerType>>([]);

  useEffect(() => {
    const temp: Array<PartnerType> = [];
    partners.map(partner =>
      temp.push({
        id: partner.partner_id,
        name: partner.name,
        longitude: partner.longitude,
        latitude: partner.latitude,
        distance: 'distance',
      })
    );
    setSelectedPartners(temp);
  }, []);

  console.log('selectedPartners: ', selectedPartners);

  return (
    <div className={styles.wrapper}>
      <PartnerTable partners={selectedPartners} />
    </div>
  );
};

export default MainPage;
