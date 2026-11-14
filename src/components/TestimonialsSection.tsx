import React from 'react';
import Image from 'next/image';

export default function TestimonialsSection() {
  return (
    <section className="proof-wall-section">
      <div className="proof-wall-inner">
        <h2 className="proof-wall-heading">Et voilà ce qu&apos;ils en disent.</h2>

        <div className="proof-columns-layout">
          {/* COLONNE 1 : 2 captures empilées */}
          <div className="proof-col-stack">
            <div className="proof-shot-box">
              <Image
                src="/img/chat-2.jpg"
                alt="Retour client 1"
                width={400}
                height={350}
                className="proof-shot-media"
                priority
              />
            </div>

            <div className="proof-shot-box">
              <Image
                src="/img/chat-4.jpeg"
                alt="Retour client 2"
                width={400}
                height={380}
                className="proof-shot-media"
              />
            </div>
          </div>

          {/* COLONNE 2 : 1 capture courte + 1 capture longue avec légende */}
          <div className="proof-col-stack">
            {/* <div className="proof-shot-box">
              <Image
                src="/img/chat-3.jpeg"
                alt="Retour client 3"
                width={400}
                height={260}
                className="proof-shot-media"
              />
            </div> */}

            <div className="proof-shot-group">
              <div className="proof-shot-box">
                <Image
                  src="/img/chat-3.jpeg"
                  alt="Retour client 4 - Partie 1"
                  width={400}
                  height={480}
                  className="proof-shot-media"
                />
              </div>
              
            </div>
          </div>

          {/* COLONNE 3 : 1 très grande capture avec légende */}
          <div className="proof-col-stack">
            <div className="proof-shot-group">
              <div className="proof-shot-box">
                <Image
                  src="/img/chat-1.jpeg"
                  alt="Retour client 4 - Partie 2"
                  width={400}
                  height={650}
                  className="proof-shot-media"
                />
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}