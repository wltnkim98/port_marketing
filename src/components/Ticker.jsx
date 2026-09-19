import React from 'react';

// 포트폴리오 브랜드별 맞춤 디자인 벡터 로고 import
import monobasicLogo from '../assets/img/logos/monobasic.svg';
import arcticpeakLogo from '../assets/img/logos/arcticpeak.svg';
import vitarootLogo from '../assets/img/logos/vitaroot.svg';
import lumielleLogo from '../assets/img/logos/lumielle.svg';
import maisonAtelierLogo from '../assets/img/logos/maison-atelier.svg';
import scentNouvelleLogo from '../assets/img/logos/scent-nouvelle.svg';
import benefitFashionLogo from '../assets/img/logos/benefit-fashion.svg';
import espressotecaLogo from '../assets/img/logos/espressoteca.svg';
import novaOpticsLogo from '../assets/img/logos/nova-optics.svg';
import silentMoodLogo from '../assets/img/logos/silent-mood.svg';
import modeEssentialLogo from '../assets/img/logos/mode-essential.svg';
import curateNineLogo from '../assets/img/logos/curate-nine.svg';
import urbanStandardLogo from '../assets/img/logos/urban-standard.svg';
import prismDesignLogo from '../assets/img/logos/prism-design.svg';
import aerotechLogo from '../assets/img/logos/aerotech.svg';
import genovaLogo from '../assets/img/logos/genova-biomed.svg';
import botanicHourLogo from '../assets/img/logos/botanic-hour.svg';
import ecovertLogo from '../assets/img/logos/ecovert.svg';
import kicksArchiveLogo from '../assets/img/logos/kicks-archive.svg';
import paletteStudioLogo from '../assets/img/logos/palette-studio.svg';
import nordicLivingLogo from '../assets/img/logos/nordic-living.svg';
import hyperCloudLogo from '../assets/img/logos/hyper-cloud.svg';
import medicareLogo from '../assets/img/logos/medicare.svg';
import skylineAssetLogo from '../assets/img/logos/skyline-asset.svg';
import dataGrowthLogo from '../assets/img/logos/data-growth.svg';
import fintechPayLogo from '../assets/img/logos/fintech-pay.svg';
import pureOrganicLogo from '../assets/img/logos/pure-organic.svg';

export const BRAND_LOGOS = [
    { id: 'monobasic', src: monobasicLogo, alt: 'MONOBASIC' },
    { id: 'arcticpeak', src: arcticpeakLogo, alt: 'ARCTIC PEAK' },
    { id: 'lumielle', src: lumielleLogo, alt: 'LUMIELLE' },
    { id: 'maison-atelier', src: maisonAtelierLogo, alt: "MAISON D'ATELIER" },
    { id: 'vitaroot', src: vitarootLogo, alt: 'VITA ROOT' },
    { id: 'espressoteca', src: espressotecaLogo, alt: 'ESPRESSOTECA' },
    { id: 'nova-optics', src: novaOpticsLogo, alt: 'NOVA OPTICS' },
    { id: 'scent-nouvelle', src: scentNouvelleLogo, alt: 'SCENT OF NOUVELLE' },
    { id: 'prism-design', src: prismDesignLogo, alt: 'PRISM DESIGN' },
    { id: 'aerotech-mobility', src: aerotechLogo, alt: 'AEROTECH' },
    { id: 'silent-mood', src: silentMoodLogo, alt: 'SILENT MOOD' },
    { id: 'benefit-fashion', src: benefitFashionLogo, alt: 'BENEFIT FASHION' },
    { id: 'kicks-archive', src: kicksArchiveLogo, alt: 'KICKS ARCHIVE' },
    { id: 'botanic-hour', src: botanicHourLogo, alt: 'BOTANIC HOUR' },
    { id: 'hyper-cloud', src: hyperCloudLogo, alt: 'HYPER CLOUD' },
    { id: 'mode-essential', src: modeEssentialLogo, alt: 'MODE ESSENTIAL' },
    { id: 'curate-nine', src: curateNineLogo, alt: 'CURATE 9' },
    { id: 'urban-standard', src: urbanStandardLogo, alt: 'URBAN STANDARD' },
    { id: 'genova-biomed', src: genovaLogo, alt: 'GENOVA' },
    { id: 'ecovert-wellness', src: ecovertLogo, alt: 'ECOVERT' },
    { id: 'nordic-living', src: nordicLivingLogo, alt: 'NORDIC LIVING' },
    { id: 'palette-studio', src: paletteStudioLogo, alt: 'PALETTE STUDIO' },
    { id: 'skyline-asset', src: skylineAssetLogo, alt: 'SKYLINE ASSET' },
    { id: 'fintech-pay', src: fintechPayLogo, alt: 'FINTECH PAY' },
    { id: 'data-growth', src: dataGrowthLogo, alt: 'DATA GROWTH' },
    { id: 'medicare-solution', src: medicareLogo, alt: 'MEDICARE' },
    { id: 'pure-organic', src: pureOrganicLogo, alt: 'PURE ORGANIC' },
];

const Ticker = () => {
    return (
        <div className="ticker-wrap" aria-label="파트너 브랜드 롤링 배너">
            <div className="ticker">
                {/* 무한 루프를 위해 2벌 렌더링 */}
                {[...BRAND_LOGOS, ...BRAND_LOGOS].map((logo, i) => (
                    <div className="ticker-item" key={`${logo.id}-${i}`}>
                        <img src={logo.src} alt={logo.alt} loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ticker;
