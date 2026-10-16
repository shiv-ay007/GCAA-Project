import logoApollo from '@/assets/sponsor logo/01_apl-apollo.svg';
import logoManilam from '@/assets/sponsor logo/02_mani-lam.svg';
import logoKohler from '@/assets/sponsor logo/03_kohler.svg';
import logoJohnson from '@/assets/sponsor logo/04_johnson.svg';
import logoArchitect from '@/assets/sponsor logo/05_architect-logo.svg';
import logoEuronics from '@/assets/sponsor logo/06_euronics.svg';
import logoAdharshila from '@/assets/sponsor logo/07_adharshila-power-corporation.svg';
import logoKitchenWorld from '@/assets/sponsor logo/08_kitchen-world.svg';
import logoGreenply from '@/assets/sponsor logo/09_greenply.svg';
import logoCelestia from '@/assets/sponsor logo/10_celestia.svg';
import logoJaquar from '@/assets/sponsor logo/11_jaquar.svg';

import logoDaikin from '@/assets/sponsor logo/12_daikin.svg';
import logoProtostar from '@/assets/sponsor logo/13_protostar.svg';
import logoHindware from '@/assets/sponsor logo/14_hindware.svg';
import logoVijayElectricals from '@/assets/sponsor logo/15_vijay-electricals.svg';
import logoTataSteel from '@/assets/sponsor logo/16_tata-steel.svg';
import logoWindowMagic from '@/assets/sponsor logo/17_window-magic.svg';
import logoInfraMarket from '@/assets/sponsor logo/18_infra-market.svg';
import logoRakCeramics from '@/assets/sponsor logo/19_rak-ceramics.svg';
import logoImpacLift from '@/assets/sponsor logo/20_inpac-lift.svg';
import logoNewVicky from '@/assets/sponsor logo/21_new-vicky-enterprises.svg';

export const PastSponsorsSection = () => {
  // First Half (11 sponsors) - moves Left to Right
  const sponsorsRow1 = [
    { name: 'APL Apollo Steel Pipes', logo: logoApollo },
    { name: 'Manilam Decorative Panel', logo: logoManilam },
    { name: 'Kohler', logo: logoKohler },
    { name: 'Johnson Tiles', logo: logoJohnson },
    { name: 'Architect Association Partner', logo: logoArchitect },
    { name: 'Euronics', logo: logoEuronics },
    { name: 'Adharshila Power Corporation', logo: logoAdharshila },
    { name: 'Kitchen World', logo: logoKitchenWorld },
    { name: 'Greenply', logo: logoGreenply },
    { name: 'Celestia Luxury Residences', logo: logoCelestia },
    { name: 'Jaquar', logo: logoJaquar },
  ];

  // Second Half (10 sponsors) - moves Right to Left
  const sponsorsRow2 = [
    { name: 'Daikin', logo: logoDaikin },
    { name: 'Protostar', logo: logoProtostar },
    { name: 'Hindware', logo: logoHindware },
    { name: 'Vijay Electricals', logo: logoVijayElectricals },
    { name: 'Tata Steel', logo: logoTataSteel },
    { name: 'Window Magic', logo: logoWindowMagic },
    { name: 'Infra.Market', logo: logoInfraMarket },
    { name: 'RAK Ceramics', logo: logoRakCeramics },
    { name: 'Impac Lift', logo: logoImpacLift },
    { name: 'New Vicky Enterprises', logo: logoNewVicky },
  ];

  return (
    <section className="relative w-full bg-white text-neutral-900 pt-14 sm:pt-20 pb-0 border-t border-neutral-200 overflow-hidden">
      {/* Subtle Decorative Flowing Wave Lines in Background */}
      <svg
        className="absolute inset-0 w-full h-full text-red-500/[0.06] pointer-events-none"
        viewBox="0 0 1200 700"
        fill="none"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 18 }).map((_, idx) => (
          <path
            key={idx}
            d={`M ${250 + idx * 18} -40 C ${650 + idx * 14} 180, ${180 - idx * 12} 420, ${520 + idx * 16} 740`}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      {/* Section Header */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 mb-10 sm:mb-14">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 text-center sm:text-left">
          {/* Golden Seal Circle */}
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md shrink-0 border border-amber-600/40"
            style={{
              background:
                'radial-gradient(circle at 35% 30%, #e5b85c 0%, #c48b2c 55%, #8c5a14 100%)',
            }}
          />
          <div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#E31E24] tracking-tight uppercase leading-none">
              PAST SPONSORS
            </h2>
            <p className="text-xs sm:text-base font-extrabold text-[#E31E24] tracking-wider uppercase mt-1">
              OUR PARTNERS IN SUCCESS
            </p>
          </div>
        </div>
      </div>

      {/* Dual Direction Infinite Marquee Sliders */}
      <div className="relative w-full overflow-hidden space-y-4 sm:space-y-6">
        {/* Soft Side Fade Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Row 1: Left to Right Marquee */}
        <div className="overflow-hidden py-1 sm:py-2">
          <div
            className="animate-marquee-reverse flex items-center"
            style={{ animationDuration: '58s' }}
          >
            {[...sponsorsRow1, ...sponsorsRow1, ...sponsorsRow1, ...sponsorsRow1].map((sponsor, index) => (
              <div key={index} className="px-2 sm:px-2.5 shrink-0">
                <div
                  title={sponsor.name}
                  className="group bg-white border border-neutral-200/90 rounded-xl px-5 py-3 w-48 sm:w-56 md:w-60 h-24 sm:h-26 flex items-center justify-center shadow-2xs hover:shadow-md hover:border-[#B70D2B]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    loading="lazy"
                    className="max-h-14 sm:max-h-16 max-w-[90%] w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="overflow-hidden py-1 sm:py-2">
          <div
            className="animate-marquee flex items-center"
            style={{ animationDuration: '58s' }}
          >
            {[...sponsorsRow2, ...sponsorsRow2, ...sponsorsRow2, ...sponsorsRow2].map((sponsor, index) => (
              <div key={index} className="px-2 sm:px-2.5 shrink-0">
                <div
                  title={sponsor.name}
                  className="group bg-white border border-neutral-200/90 rounded-xl px-5 py-3 w-48 sm:w-56 md:w-60 h-24 sm:h-26 flex items-center justify-center shadow-2xs hover:shadow-md hover:border-[#B70D2B]/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    loading="lazy"
                    className="max-h-14 sm:max-h-16 max-w-[90%] w-auto h-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Crimson Accent Bar */}
      <div className="mt-10 sm:mt-12 h-1.5 w-full bg-gradient-to-r from-[#8B0000] via-[#E31E24] to-[#8B0000]" />
    </section>
  );
};
