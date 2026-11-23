
'use client';

import InfiniteGalley from '@/components/infinitegallery';

const images = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
  '/images/7.png',
  '/images/8.png',
];

export default function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-content">
        <span className="hero-eyebrow">
          Σχεδιασμός που δίνει χαρακτήρα στον χώρο.
        </span>

        <h1>
          ΣΧΕΔΙΑΣΜΟΣ ΠΟΥ
          <br />
          <span>ΞΕΧΩΡΙΖΕΙ.</span>
        </h1>
      </div>

      <div className="hero-gallery">
        <InfiniteGalley
          images={images}
          className="gallery-canvas"
          speed={0.7}
          visibleCount={8}
        />
      </div>

      <div className="hero-bottom">
        <span>Αισθητική με ταυτότητα</span>
        <span>ΚΑΝΤΕ ΚΥΛΙΣΗ ΓΙΑ ΝΑ ΑΝΑΚΑΛΥΨΕΤΕ</span>
      </div>

      <style jsx>{`
        .hero {
          color: #28231e;
          background: #f7f4ed;
          min-height: 100vh;
          overflow: hidden;
        }

        .hero-content {
          font-family: Georgia, serif;
        }

        .hero-eyebrow {
          display: block;
          color: #a89576;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
        }

        .hero h1 {
          color: #28231e;
          font-family: Georgia, serif;
          font-weight: 500;
          letter-spacing: -0.055em;
        }

        .hero h1 span {
          color: #a89576;
        }

        .hero-bottom {
          color: #777168;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
        }
      `}</style>

    </section>
  );
}
