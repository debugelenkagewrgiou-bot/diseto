
'use client';

const services = [
  {
    title: 'Έπιπλα κουζίνας',
    description:
      'Σχεδιάζουμε κουζίνες στα μέτρα σας, συνδυάζοντας αισθητική, εργονομία και λειτουργικότητα. Κάθε δημιουργία προσαρμόζεται στον χώρο και στις καθημερινές σας ανάγκες.',
  },
  {
    title: 'Ντουλάπες',
    description:
      'Δημιουργούμε εξατομικευμένες λύσεις αποθήκευσης με καθαρές γραμμές, προσεγμένα υλικά και έξυπνη αξιοποίηση του χώρου.',
  },
  {
    title: 'Interior design',
    description:
      'Διαμορφώνουμε χώρους με χαρακτήρα, ισορροπία και διαχρονική αισθητική. Κάθε λεπτομέρεια σχεδιάζεται με βάση τη δική σας προσωπικότητα.',
  },
  {
    title: 'Σχεδιασμός & παραγωγή',
    description:
      'Από την πρώτη ιδέα μέχρι την τελική κατασκευή, συνδυάζουμε τεχνογνωσία, επιλεγμένα υλικά και προσοχή σε κάθε λεπτομέρεια.',
  },
];

export default function WhatWeDo() {
  return (
    <section className="what-we-do" id="what-we-do">
      <div className="what-container">

        <div className="what-heading">
          <span className="what-eyebrow">
            WHAT WE DO — DISETO
          </span>

          <h2>
            WE CREATE
            <br />
            <span>YOUR SPACE.</span>
          </h2>

          <p className="what-intro">
            Από το 1982, δημιουργούμε χώρους που συνδυάζουν
            διαχρονική αισθητική, ποιότητα και λειτουργικότητα.
            Σχεδιάζουμε με βάση τις ανάγκες σας και δίνουμε
            μορφή σε όσα κάνουν έναν χώρο πραγματικά δικό σας.
          </p>
        </div>

        <div className="services-list">
          {services.map((service) => (
            <article className="service-item" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>

        <div className="what-footer">
          <div>
            <span className="what-eyebrow">
              OUR PHILOSOPHY
            </span>

            <h2>
              BEAUTY IN
              <br />
              <span>EVERY DETAIL.</span>
            </h2>
          </div>

          <p>
            Πιστεύουμε πως ένας όμορφος χώρος δεν είναι πολυτέλεια.
            Είναι η ισορροπία ανάμεσα στην αισθητική, την ποιότητα
            και τη λειτουργικότητα. Δημιουργούμε για να κάνουμε
            την καθημερινότητά σας πιο όμορφη.
          </p>
        </div>

        <div className="what-bottom-line">
          <span>DISETO — SINCE 1982</span>
          <span>DESIGN · QUALITY · TIMELESSNESS</span>
        </div>

      </div>

      <style jsx>{`
        .what-we-do {
          background: #f7f4ed;
          color: #28231e;
          padding: 140px 7%;
        }

        .what-container {
          max-width: 1500px;
          margin: 0 auto;
        }

        .what-eyebrow {
          color: #a89576;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
        }

        .what-heading {
          display: grid;
          grid-template-columns: 1fr 1fr;
          column-gap: 8%;
          align-items: end;
          margin-bottom: 130px;
        }

        .what-heading .what-eyebrow {
          grid-column: 1 / -1;
          margin-bottom: 28px;
        }

        .what-heading h2,
        .what-footer h2 {
          margin: 0;
          color: #28231e;
          font-family: Georgia, serif;
          font-size: clamp(52px, 7vw, 105px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .what-heading h2 span,
        .what-footer h2 span {
          color: #a89576;
        }

        .what-intro {
          max-width: 440px;
          margin: 0 0 8px auto;
          color: #777168;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 15px;
          line-height: 1.9;
        }

        .services-list {
          border-top: 1px solid #d9d2c6;
        }

        .service-item {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          align-items: center;
          padding: 38px 0;
          border-bottom: 1px solid #d9d2c6;
          transition: padding 0.35s ease;
        }

        .service-item:hover {
          padding-left: 12px;
          padding-right: 12px;
        }

        .service-item h3 {
          margin: 0;
          color: #28231e;
          font-family: Georgia, serif;
          font-size: clamp(23px, 2.5vw, 34px);
          font-weight: 400;
          letter-spacing: -0.04em;
        }

        .service-item p {
          max-width: 420px;
          margin: 0;
          color: #777168;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 13px;
          line-height: 1.9;
        }

        .what-footer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8%;
          align-items: end;
          margin-top: 160px;
          padding-bottom: 100px;
        }

        .what-footer h2 {
          margin-top: 25px;
          font-size: clamp(45px, 5.5vw, 78px);
        }

        .what-footer > p {
          max-width: 450px;
          margin: 0 0 8px auto;
          color: #777168;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 2;
        }

        .what-bottom-line {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid #d9d2c6;
          color: #a89576;
          font-family: Arial, Helvetica, sans-serif;
          font-size: 9px;
          letter-spacing: 0.15em;
        }

        @media (max-width: 768px) {
          .what-we-do {
            padding: 95px 6%;
          }

          .what-heading {
            grid-template-columns: 1fr;
            margin-bottom: 85px;
          }

          .what-heading h2 {
            font-size: clamp(52px, 13vw, 78px);
          }

          .what-intro {
            margin: 35px 0 0;
            font-size: 14px;
          }

          .service-item {
            grid-template-columns: 1fr;
            gap: 12px;
            padding: 27px 0;
          }

          .service-item h3 {
            font-size: 23px;
          }

          .service-item p {
            font-size: 12px;
          }

          .what-footer {
            grid-template-columns: 1fr;
            gap: 35px;
            margin-top: 100px;
            padding-bottom: 65px;
          }

          .what-footer h2 {
            font-size: 54px;
          }

          .what-footer > p {
            margin: 0;
            font-size: 13px;
          }

          .what-bottom-line {
            font-size: 8px;
          }
        }

        @media (max-width: 380px) {
          .what-bottom-line {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
