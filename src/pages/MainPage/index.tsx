import React, { useEffect, useState } from 'react';

import partners from '../../shared/partners.json';
import PartnerTable from '../../components/PartnerTable';

import styles from './styles.module.scss';

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};
const earthRadius = 6317.009;

const MainPage = () => {
  const [selectedPartners, setSelectedPartners] = useState<Array<PartnerType>>([]);

  const pow = Math.pow;
  const sin = Math.sin;
  const companyLng = deg2rad(23.351723);
  const companyLat = deg2rad(42.6665921);

  const getDistance = (longitude: number, latitude: number) => {
    const deltaLng = companyLng - longitude;
    const deltaLat = companyLat - latitude;

    return (
      earthRadius *
      (2 *
        Math.asin(
          Math.sqrt(
            pow(sin(deltaLat / 2), 2) +
              (1 - pow(sin(deltaLat / 2), 2) - pow(sin((companyLat + latitude) / 2), 2)) * pow(sin(deltaLng / 2), 2)
          )
        ))
    );
  };

  const getPartners = () => {
    setSelectedPartners(
      partners
        .sort((a, b) => a.id - b.id)
        .filter(
          partner => getDistance(deg2rad(parseFloat(partner.longitude)), deg2rad(parseFloat(partner.latitude))) <= 100
        )
    );
  };

  useEffect(() => {
    getPartners();
  }, []);

  return (
    <div className={styles.wrapper}>
      <PartnerTable partners={selectedPartners} />
    </div>
  );
};

export default MainPage;
