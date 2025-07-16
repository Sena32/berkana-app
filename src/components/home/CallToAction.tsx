import React from 'react';
import Image from 'next/image';
import Link from '../common/Link';

const CTA_IMAGE = '/images/cta-woman.svg';

const CallToAction: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6 flex flex-col items-center">
      <Image
        src={CTA_IMAGE}
        alt="Mulher"
        width={200}
        height={200}
        className="rounded-full w-40 h-40 sm:w-60 sm:h-60 md:w-72 md:h-72 object-cover mb-6"
      />
      <h2 className="text-2xl md:text-5xl font-bold text-[#34364A] mb-8 text-center">Comece a construir sua carreira!</h2>
      <p className="text-[#4B587C] text-center max-w-2xl mb-6">
        Dê o próximo passo na sua jornada profissional com a Berkana Academy. Inscreva-se agora e tenha acesso a cursos de alta qualidade, instrutores renomados e uma comunidade que apoia o seu crescimento.
      </p>
      <Link
        type="link"
        variant="button-primary"
        size="md"
        className="px-8 py-3 rounded-lg"
        href="/cadastro"
      >
        Começar agora
      </Link>
    </section>
  );
};

export default CallToAction; 