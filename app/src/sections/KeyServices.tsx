import { useRef, useState, useEffect } from 'react';
import { useReveal } from '../hooks/useReveal';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const keyServices = [
  {
    number: '01',
    title: 'SOAR и SIEM',
    shortDesc: 'Внедрение систем корреляции событий и автоматического реагирования на инциденты безопасности. Централизованный мониторинг всех источников данных в реальном времени.',
    fullDesc: 'Интегрируем платформы SIEM для сбора и анализа событий безопасности из всех источников вашей инфраструктуры. Настраиваем SOAR для автоматизации реагирования на инциденты, что сокращает время реакции с часов до минут. Включает настройку правил корреляции, дашбордов, оповещений и интеграцию с существующими системами защиты.',
  },
  {
    number: '02',
    title: 'Антивирусная защита',
    shortDesc: 'Развертывание и управление корпоративными антивирусными решениями. Защита рабочих станций, серверов и мобильных устройств от всех типов угроз.',
    fullDesc: 'Поставляем и настраиваем корпоративные антивирусные решения ведущих вендоров (Kaspersky, ESET, Trend Micro и др.). Обеспечиваем централизованное управление политиками защиты, регулярное обновление баз, мониторинг состояния защиты и оперативное реагирование на обнаруженные угрозы. Включает защиту рабочих станций, серверов, почтовых систем и мобильных устройств.',
  },
  {
    number: '03',
    title: 'Сетевое оборудование',
    shortDesc: 'Поставка, настройка и обслуживание сетевого оборудования ведущих производителей. Проектирование отказоустойчивых сетевых инфраструктур.',
    fullDesc: 'Подбираем, поставляем и настраиваем сетевое оборудование от ведущих производителей: коммутаторы, маршрутизаторы, точки доступа Wi-Fi, файрволы, системы IPS/IDS. Проектируем сетевую архитектуру с учётом требований к производительности, безопасности и отказоустойчивости. Предоставляем гарантийное и постгарантийное обслуживание.',
  },
];

export default function KeyServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  useReveal(sectionRef);

  const toggleCard = (index: number) => {
    const newOpen = openIndex === index ? null : index;
    setOpenIndex(newOpen);
  };

  useEffect(() => {
    descRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i === openIndex) {
        gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      }
    });
  }, [openIndex]);

  return (
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: '#0d2029' }}>
      <div className="content-container">
        <div className="reveal mb-10 md:mb-14">
          <span className="section-label block mb-3">КЛЮЧЕВЫЕ УСЛУГИ</span>
          <h2 className="section-title mb-4">Специализированные решения</h2>
          <p className="section-subtitle max-w-[560px]">Глубокая экспертиза в приоритетных направлениях IT-безопасности</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {keyServices.map((service, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`reveal reveal-d${index + 1} card-dark relative overflow-hidden cursor-pointer`}
                onClick={() => toggleCard(index)}
              >
                <span className="block font-extrabold leading-[0.85] mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'rgba(45, 212, 191, 0.12)' }}>{service.number}</span>
                <h3 className="font-semibold text-lg md:text-xl leading-snug mb-3" style={{ color: '#e0f7fa' }}>{service.title}</h3>
                <div ref={(el) => { descRefs.current[index] = el; }}>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgba(128, 222, 234, 0.7)' }}>
                    {isOpen ? service.fullDesc : service.shortDesc}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <ChevronDown
                    size={16}
                    className="transition-transform duration-200"
                    style={{ color: '#2dd4bf', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#2dd4bf' }}>
                    {isOpen ? 'Скрыть' : 'Подробнее'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
