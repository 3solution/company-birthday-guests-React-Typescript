import React, { useEffect, useState } from 'react';

import partners from '../../shared/partners.json';
import PartnerTable from '../../components/PartnerTable';

import styles from './styles.module.scss';

const MainPage = () => {
  const [selectedPartners, setSelectedPartners] = useState<Array<PartnerType>>([]);

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const getDistance = (longitude: number, latitude: number) => {
    const pow = Math.pow;
    const sin = Math.sin;
    const cLongitude = deg2rad(23.351723);
    const cLatitude = deg2rad(42.6665921);
    const dLongitude = cLongitude - longitude;
    const dLatitude = cLatitude - latitude;

    return (
      6317.009 *
      (2 *
        Math.asin(
          Math.sqrt(
            pow(sin(dLatitude / 2), 2) +
              (1 - pow(sin(dLatitude / 2), 2) - pow(sin((cLatitude + latitude) / 2), 2)) * pow(sin(dLongitude / 2), 2)
          )
        ))
    );
  };

  const getPartners = () => {
    const temp: Array<PartnerType> = [];
    partners
      .sort((a, b) => a.partner_id - b.partner_id)
      .map(partner => {
        const distance = getDistance(deg2rad(parseFloat(partner.longitude)), deg2rad(parseFloat(partner.latitude)));
        {
          distance <= 100 &&
            temp.push({
              id: partner.partner_id,
              name: partner.name,
              longitude: partner.longitude,
              latitude: partner.latitude,
              distance: distance,
            });
        }
      });
    setSelectedPartners(temp);
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
