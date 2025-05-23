import HeroSection from '@/components/home/HeroSection'
import CoursesSection from '@/components/home/CoursesSection'
import AreasSection from '@/components/home/AreasSection'
import InstructorsSection from '@/components/home/InstructorsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import FAQSection from '@/components/home/FAQSection'
import CallToAction from '@/components/home/CallToAction'
import Image from 'next/image'

// export default function Home() {
//   return (
//     <>
//       <HeroSection />
//       <CoursesSection />
//       <AreasSection />
//       <InstructorsSection />
//       <TestimonialsSection />
//       <FAQSection />
//       <CallToAction />
//     </>
//   )
// }

// src/components/LandingPage.tsx

export default function LandingPage() {
  return (
    <div className="bg-[#F7F9FB] w-full min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* Substitua pelo logo real */}
            <Image
              width={150}
              height={150}
              src="/images/brand/berkana_logo.svg"
              alt="logo"
            />
          </div>
          {/* Menu */}
          <nav className="flex items-center gap-8 text-[#1B2B4B] font-medium">
            <a href="#" className="hover:text-[#6C63FF]">Cursos</a>
            <a href="#" className="hover:text-[#6C63FF]">Sobre</a>
            <a href="#" className="hover:text-[#6C63FF]">Instrutores</a>
            <a href="#" className="hover:text-[#6C63FF]">Ajuda</a>
          </nav>
          {/* Ações */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 rounded-lg border border-[#1B2B4B] text-[#1B2B4B] font-semibold hover:bg-[#F0F4FF]">Entrar</button>
            <button className="px-4 py-2 rounded-lg bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Cadastrar-se</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 py-16 px-6">
        {/* Texto */}
        <div className="flex-1">
          <span className="text-[#6C63FF] font-semibold text-sm">#CrescimentoProfissional</span>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold text-[#1B2B4B] leading-tight">
            Desenvolva suas habilidades.<br />
            Cresça na sua carreira.
          </h1>
          <p className="mt-4 text-lg text-[#4B587C]">
            Capacite-se com os melhores instrutores do mercado e alcance novos patamares profissionais. Cursos reconhecidos e certificados pelas maiores instituições do país.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 rounded-lg bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Escolher curso</button>
            <button className="px-6 py-3 rounded-lg border border-[#1B2B4B] text-[#1B2B4B] font-semibold hover:bg-[#F0F4FF]">Conheça mais</button>
          </div>
          {/* Certificados */}
          <div className="mt-8 flex items-center gap-6">
            {/* Substitua pelos ícones reais */}
            <div className="flex items-center gap-2">
              <img src="/images/instituicao.svg" alt="Certificado" className="h-8" />
              <span className="text-[#1B2B4B] font-semibold">3600+ Alunos ativos</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/images/certificado.svg" alt="Certificado" className="h-8" />
              <span className="text-[#1B2B4B] font-semibold">200+ Cursos e treinamentos</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Substitua pelos logos reais */}
            <img src="/images/inst1.svg" alt="Instituição 1" className="w-15 h-15" />
            <img src="/images/inst2.svg" alt="Instituição 2" className="w-15 h-15" />
            <img src="/images/inst3.svg" alt="Instituição 3" className="w-15 h-15" />
            <img src="/images/inst4.svg" alt="Instituição 4" className="w-15 h-15" />
            <img src="/images/inst5.svg" alt="Instituição 5" className="w-15 h-15" />
            <img src="/images/inst6.svg" alt="Instituição 6" className="w-15 h-15" />
            <span className="text-[#4B587C] font-semibold text-xl">+50 grandes instituições</span>
          </div>
        </div>
        {/* Imagem principal */}
        <div className="flex-1 flex justify-center">
          <img src="/images/hero-woman.svg" alt="Profissional" className="rounded-full w-150 h-150 object-cover border-8 border-[#EAF2FF]" />
        </div>
      </section>

      {/* Instituições */}
      <section className="max-w-7xl py-6 px-6">

      </section>

      {/* Cursos em alta */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-[#1B2B4B] mb-2">Capacitações em alta:</h2>
        <p className="text-[#4B587C] mb-8">Escolha o seu próximo curso</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card de curso */}
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-3">
              <img src={`/images/curso.svg`} alt={`Curso ${i}`} className="rounded-lg h-36 w-full object-cover" />
              <h3 className="font-semibold text-[#1B2B4B]">Nome do Curso {i}</h3>
              <span className="text-[#6C63FF] text-xs font-medium">Categoria</span>
              <div className="flex items-center gap-2">
                {/* Estrelas */}
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-[#4B587C] text-xs">(4.9)</span>
              </div>
              <button className="mt-2 px-4 py-2 rounded bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Ver detalhes</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 rounded-lg bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Ver mais cursos</button>
        </div>
      </section>

      {/* Áreas de atuação */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-[#1B2B4B] mb-2">Aprimore suas habilidades na sua área de atuação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* Cards de área */}
          {[
            { icon: "📈", title: "Economia e Finanças", desc: "Cursos para turbinar sua gestão financeira pessoal e institucional." },
            { icon: "📝", title: "Linguagem e Comunicação", desc: "Desenvolva habilidades de comunicação e expressão." },
            { icon: "🔫", title: "Investigação Criminal", desc: "Aprofunde-se em técnicas de investigação e perícia." },
            { icon: "🔬", title: "Perícia", desc: "Capacite-se em perícia criminal e científica." },
            { icon: "🏛️", title: "Financiamento, Governança e LGPD", desc: "Gestão pública, compliance e proteção de dados." },
            { icon: "❤️", title: "Saúde e Bem-Estar", desc: "Cuide do seu bem-estar físico e mental." },
          ].map((area, i) => (
            <div key={i} className="bg-[#1B2B4B] rounded-2xl p-6 flex flex-col gap-2 text-white">
              <span className="text-3xl">{area.icon}</span>
              <h3 className="font-semibold">{area.title}</h3>
              <p className="text-[#B6E13B] text-sm">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Por que aprender com a Berkana */}
      <section className="max-w-7xl mx-auto py-12 px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 flex justify-center">
          <img src="/images/professor.svg" alt="Instrutor" className="rounded-full w-100 h-100 object-cover border-8 border-[#EAF2FF]" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#1B2B4B] mb-4">Uma plataforma feita para o seu crescimento</h2>
          <ul className="list-disc pl-6 text-[#4B587C] space-y-2">
            <li>Instrutores renomados e atuantes no mercado</li>
            <li>Certificação reconhecida nacionalmente</li>
            <li>Conteúdo atualizado e prático</li>
            <li>Comunidade ativa para networking</li>
            <li>Suporte dedicado ao aluno</li>
          </ul>
          <button className="mt-6 px-8 py-3 rounded-lg bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Conheça mais</button>
        </div>
      </section>

      {/* Instrutores */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-[#1B2B4B] mb-2">Conheça alguns dos nossos Instrutores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {[1,2,3,4,5,6,7,8,9].map((i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 items-center">
              <img src={`/images/instrutor.svg`} alt={`Instrutor ${i}`} className="rounded-full w-20 h-20 object-cover mb-2" />
              <span className="font-semibold text-[#1B2B4B]">Nome do Instrutor {i}</span>
              <span className="text-[#4B587C] text-sm">Especialidade</span>
              <button className="mt-2 px-4 py-2 rounded bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Conheça</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 rounded-lg bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Listar instrutores</button>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="bg-[#1B2B4B] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Quem já estudou com a gente recomenda!</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow text-[#1B2B4B]">
                <p className="mb-4">"Depoimento do aluno {i} sobre a plataforma. Lorem ipsum dolor sit amet, consectetur adipiscing elit."</p>
                <span className="font-semibold">Nome do Aluno {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold text-[#1B2B4B] mb-8">Perguntas frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Como posso realizar a matrícula?",
            "Quais métodos de pagamento são aceitos?",
            "O que acontece se faltar?",
            "Posso cancelar meu curso e reaver o valor pago?",
            "O que está incluso para alunos?",
            "Quanto tempo tenho para concluir meu curso?"
          ].map((q, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2">
              <span className="font-semibold text-[#1B2B4B]">{q}</span>
              <span className="text-[#4B587C] text-sm">Clique para ver a resposta</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action final */}
      <section className="max-w-7xl mx-auto py-12 px-6 flex flex-col items-center">
        <img src="/images/cta-woman.svg" alt="Mulher" className="rounded-full w-100 h-100 object-cover border-8 border-[#EAF2FF] mb-6" />
        <h2 className="text-2xl font-bold text-[#1B2B4B] mb-4">Comece a construir sua carreira!</h2>
        <p className="text-[#4B587C] text-center max-w-2xl mb-6">
          Dê o próximo passo na sua jornada profissional com a Berkana Academy. Inscreva-se agora e tenha acesso a cursos de alta qualidade, instrutores renomados e uma comunidade que apoia o seu crescimento.
        </p>
        <button className="px-8 py-3 rounded-lg bg-[#B6E13B] text-[#1B2B4B] font-semibold hover:bg-[#A0C92B]">Começar agora</button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              width={150}
              height={150}
              src="/images/brand/berkana_logo.svg"
              alt="logo"
            />
          </div>
          <div className="text-[#4B587C] text-sm">
            © {new Date().getFullYear()} Berkana Academy. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
