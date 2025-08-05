import React from 'react';
import Image from 'next/image';
import Link from '../common/Link';
import { mockInstructors } from '@/mocks/instructor-mock';

const fallbackAvatar = '/images/user/user-default.svg';

const InstructorList: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      <span className="text-[#2447F9] font-normal text-sm">Aprenda com os melhores</span>
      <h2 className="text-2xl md:text-4xl font-bold text-[#34364A] mb-8">Conheça alguns dos nossos Instrutores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {mockInstructors.map((inst, i) => {
          const avatarSrc = inst.avatar || fallbackAvatar;
          return (
            <div key={inst.id} className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4 items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={avatarSrc}
                    alt={`Instrutor ${inst.name}`}
                    width={40}
                    height={40}
                    className="rounded-full w-10 h-10 object-cover mb-2"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#1B2B4B]">{inst.name}</span>
                    <span className="text-[#9C9CA4] text-sm">{inst.role}</span>
                  </div>
                </div>
                <Link
                  type="link"
                  variant="link-primary"
                  className="mt-2 px-4 py-2 rounded text-[#04A4F4] hover:text-[#1B2B4B]"
                  href={`/instrutores/${inst.id}`}
                >
                  Conheça
                </Link>
              </div>
              <div className="flex items-center gap-2 justify-between w-full">
                <div className="flex items-center gap-1">
                  <span className="text-[#141522]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                  </span>
                  <span className="text-[#4B587C] text-xs">100 Módulos</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-[#4B587C] text-xs">4,5 (1.200 Review)</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          type="link"
          variant="button-primary"
          size="md"
          className="px-8 py-3 rounded-lg"
          href="/instrutores"
        >
          Listar instrutores
        </Link>
      </div>
    </section>
  );
};

export default InstructorList; 