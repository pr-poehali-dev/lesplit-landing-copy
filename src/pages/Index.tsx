import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const IMG = 'https://cdn.poehali.dev/projects/01f5da2c-a125-442e-8291-c45f919a20a4/files/2acee1f4-2c52-44aa-ab6d-4a128a92f1f9.jpg';

const NAV = [
  { label: 'Услуги', href: '#services' },
  { label: 'Прайс', href: '#price' },
  { label: 'О нас', href: '#about' },
  { label: 'Работы', href: '#portfolio' },
  { label: 'Контакты', href: '#contacts' },
];

const TICKER_ITEMS = [
  'ОСБ 9мм', 'ОСБ 12мм', 'ОСБ 15мм', 'ОСБ 18мм', 'ОСБ 22мм',
  'Фанера FK 6мм', 'Фанера FK 9мм', 'Фанера ФСФ 12мм', 'Фанера ФСФ 18мм',
  'Доставка по Москве', 'Оптовые цены', 'Резка в размер',
];

const SERVICES = [
  { num: '01', icon: 'Package', title: 'ОСБ плиты', desc: 'Egger, Kronospan, Ориент-Стрэнд. Толщины 9–22мм. В наличии на складе.' },
  { num: '02', icon: 'Layers', title: 'Фанера', desc: 'Берёзовая FK и ФСФ 4–40мм. Для мебели, опалубки, строительства.' },
  { num: '03', icon: 'Truck', title: 'Доставка', desc: 'По Москве и МО. Собственный транспорт. Разгрузка на объекте.' },
  { num: '04', icon: 'Scissors', title: 'Резка', desc: 'Распил по вашим размерам. Точность до мм. Готовы к отгрузке в тот же день.' },
  { num: '05', icon: 'Building2', title: 'Опт', desc: 'Скидки от 10 листов. Договоры с отсрочкой до 30 дней. Документы.' },
  { num: '06', icon: 'MessageSquare', title: 'Консультация', desc: 'Поможем выбрать под задачу. Бесплатный расчёт по чертежу или смете.' },
];

const OSB = [
  { name: 'ОСБ-3 9мм (2500×1250)', price: 890, old: 960 },
  { name: 'ОСБ-3 12мм (2500×1250)', price: 1150, old: 1250 },
  { name: 'ОСБ-3 15мм (2500×1250)', price: 1390, old: 1490 },
  { name: 'ОСБ-3 18мм (2500×1250)', price: 1650, old: 1790 },
  { name: 'ОСБ-3 22мм (2500×1250)', price: 1990, old: 2150 },
];

const FANERA = [
  { name: 'Фанера 4мм FK (1525×1525)', price: 580, old: 650 },
  { name: 'Фанера 6мм FK (1525×1525)', price: 720, old: 820 },
  { name: 'Фанера 9мм FK (1525×1525)', price: 980, old: 1080 },
  { name: 'Фанера 12мм ФСФ (1525×1525)', price: 1250, old: 1380 },
  { name: 'Фанера 15мм ФСФ (1525×1525)', price: 1550, old: 1690 },
  { name: 'Фанера 18мм ФСФ (1525×1525)', price: 1840, old: 2000 },
  { name: 'Фанера 21мм ФСФ (1525×1525)', price: 2200, old: 2380 },
];

const PORTFOLIO = [
  { tag: 'ЖК', title: 'ЖК «Новые горизонты»', desc: '500 листов ФСФ 18мм для опалубки. Срок — 2 дня.' },
  { tag: 'Завод', title: 'Мебельная фабрика «Стиль»', desc: 'Ежемесячно 2000+ листов FK. Контракт 3 года.' },
  { tag: 'Склад', title: 'Склад 4000 м², МО', desc: 'ОСБ 12мм для стен и кровли. Поставка за 1 день.' },
  { tag: 'Дом', title: 'Каркасный дом 200 м²', desc: 'Полная комплектация ОСБ + фанера с доставкой.' },
  { tag: 'ТЦ', title: 'ТЦ, г. Химки', desc: 'ОСБ 18мм — 300 листов. Торговые павильоны.' },
  { tag: 'Школа', title: 'Школа и детский сад', desc: 'Фанера Е1 — сертифицированная. Соцобъект.' },
];

function useCounter(target: number, duration = 1500) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let start = 0;
      const step = target / (duration / 16);
      const tick = () => {
        start += step;
        if (start >= target) { setVal(target); return; }
        setVal(Math.floor(start));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { val, ref };
}

function Counter({ target, suffix = '', label }: { target: number; suffix?: string; label: string }) {
  const { val, ref } = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-6xl md:text-7xl text-[var(--y)] leading-none">
        {val.toLocaleString('ru')}{suffix}
      </div>
      <div className="text-xs tracking-widest uppercase text-[var(--muted)] mt-2 font-medium">{label}</div>
    </div>
  );
}

export default function Index() {
  const [tab, setTab] = useState<'osb' | 'fan'>('osb');
  const [form, setForm] = useState({ name: '', phone: '', mat: '', qty: '', note: '' });
  const [sent, setSent] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const submit = (e: React.FormEvent) => { e.preventDefault(); setSent(true); };
  const rows = tab === 'osb' ? OSB : FANERA;

  return (
    <div className="min-h-screen bg-[var(--b)] text-[var(--text)]" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[var(--g3)] bg-[var(--b)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          <a href="#home" className="font-display text-[var(--y)] text-3xl tracking-wider">ЛЕСПЛИТА</a>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map(n => (
              <a key={n.href} href={n.href}
                className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)] hover:text-[var(--y)] transition-colors">
                {n.label}
              </a>
            ))}
          </div>

          <a href="tel:+74957771565"
            className="hidden md:flex items-center gap-2 text-sm font-bold tracking-wider text-[var(--y)] hover:text-white transition-colors">
            <Icon name="Phone" size={15} />
            +7 (495) 777-15-65
          </a>

          <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 text-[var(--muted)]">
            <Icon name={mobileMenu ? 'X' : 'Menu'} size={22} />
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden border-t border-[var(--g3)] bg-[var(--g)] px-5 py-5 flex flex-col gap-4">
            {NAV.map(n => (
              <a key={n.href} href={n.href} onClick={() => setMobileMenu(false)}
                className="text-sm font-semibold tracking-widest uppercase text-[var(--muted)] hover:text-[var(--y)] transition-colors">
                {n.label}
              </a>
            ))}
            <a href="tel:+74957771565" className="btn-y mt-2 justify-center">
              <Icon name="Phone" size={14} /> +7 (495) 777-15-65
            </a>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section id="home" className="relative min-h-screen flex flex-col pt-14">
        {/* bg image */}
        <div className="absolute inset-0">
          <img src={IMG} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--b)] via-[var(--b)]/80 to-[var(--b)]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--b)] via-transparent to-transparent" />
        </div>

        {/* left yellow bar */}
        <div className="absolute left-0 top-14 bottom-0 w-1 bg-[var(--y)]" />

        <div className="relative flex-1 max-w-7xl mx-auto w-full px-8 flex items-center">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 w-full py-20">
            {/* Text */}
            <div>
              {/* eyebrow */}
              <div className="anim-r d1 flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-[var(--y)]" />
                <span className="text-[var(--y)] text-xs font-bold tracking-widest uppercase">Москва и МО · Оптом и в розницу</span>
              </div>

              <h1 className="font-display anim-up d2 leading-[0.92] mb-6">
                <span className="block text-[clamp(64px,10vw,140px)] text-white">ОСБ И</span>
                <span className="block text-[clamp(64px,10vw,140px)] text-[var(--y)]">ФАНЕРА</span>
                <span className="block text-[clamp(36px,5vw,72px)] text-[var(--muted)] font-display">по лучшим ценам</span>
              </h1>

              <p className="anim-up d3 text-[var(--muted)] text-sm leading-relaxed max-w-md mb-10 font-light">
                10 лет поставляем строительные материалы. Собственный склад,
                доставка от&nbsp;1&nbsp;дня, резка в&nbsp;размер.
              </p>

              <div className="anim-up d4 flex flex-wrap gap-4">
                <a href="#price" className="btn-y"><Icon name="ArrowDown" size={15} />Смотреть прайс</a>
                <a href="#contacts" className="btn-ghost">Заказать звонок</a>
              </div>

              {/* mini stats */}
              <div className="anim-up d5 flex gap-8 mt-14">
                {[
                  { n: '10+', l: 'лет' },
                  { n: '5К+', l: 'клиентов' },
                  { n: '1 д.', l: 'доставка' },
                ].map(s => (
                  <div key={s.l}>
                    <div className="font-display text-4xl text-[var(--y)]">{s.n}</div>
                    <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order form */}
            <div className="anim-up d3 self-center">
              <div className="card p-7">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-7 bg-[var(--y)]" />
                  <span className="font-display text-2xl tracking-wide">БЫСТРЫЙ ЗАКАЗ</span>
                </div>

                {!sent ? (
                  <form onSubmit={submit} className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Имя</div>
                        <input required className="inp" placeholder="Иван"
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Телефон</div>
                        <input required className="inp" placeholder="+7..."
                          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Материал</div>
                      <select className="inp" value={form.mat} onChange={e => setForm({ ...form, mat: e.target.value })}>
                        <option value="">Выберите...</option>
                        <option>ОСБ-3 9мм</option><option>ОСБ-3 12мм</option>
                        <option>ОСБ-3 15мм</option><option>ОСБ-3 18мм</option>
                        <option>ОСБ-3 22мм</option><option>Фанера FK 6мм</option>
                        <option>Фанера FK 9мм</option><option>Фанера ФСФ 12мм</option>
                        <option>Фанера ФСФ 15мм</option><option>Фанера ФСФ 18мм</option>
                        <option>Несколько позиций</option>
                      </select>
                    </div>

                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Количество (листов)</div>
                      <input className="inp" placeholder="50 листов"
                        value={form.qty} onChange={e => setForm({ ...form, qty: e.target.value })} />
                    </div>

                    <div>
                      <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Адрес / комментарий</div>
                      <textarea className="inp resize-none" rows={2} placeholder="Адрес доставки..."
                        value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
                    </div>

                    <button type="submit" className="btn-y justify-center mt-1">
                      <Icon name="Send" size={14} /> Отправить заявку
                    </button>
                    <p className="text-[10px] text-center text-[var(--muted)] tracking-wider">
                      Перезвоним за 15 минут в рабочее время
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-[var(--y)] flex items-center justify-center mx-auto mb-4">
                      <Icon name="Check" size={28} className="text-black" />
                    </div>
                    <div className="font-display text-2xl mb-2">ЗАЯВКА ПРИНЯТА</div>
                    <p className="text-sm text-[var(--muted)]">Перезвоним в ближайшее время</p>
                    <button onClick={() => setSent(false)} className="btn-ghost mt-6 text-xs">
                      Новая заявка
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* bottom gradient overlap */}
        <div className="relative h-16 bg-gradient-to-t from-[var(--b)] to-transparent" />
      </section>

      {/* ─── TICKER ─── */}
      <div className="border-y border-[var(--g3)] py-3 bg-[var(--g)] overflow-hidden select-none">
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-4 px-6">
                <span className="w-1 h-1 bg-[var(--y)] rounded-full flex-shrink-0" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[var(--muted)]">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 bg-[var(--b)]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[var(--y)]" />
                <span className="text-[var(--y)] text-[10px] font-bold tracking-widest uppercase">Что мы делаем</span>
              </div>
              <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-none">УСЛУГИ</h2>
            </div>
            <a href="#contacts" className="btn-ghost hidden md:inline-flex">Получить консультацию</a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--g3)]">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[var(--b)] p-8 hover:bg-[var(--g)] transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 border border-[var(--g3)] flex items-center justify-center group-hover:border-[var(--y)] group-hover:bg-[var(--y)] transition-all">
                    <Icon name={s.icon} fallback="Package" size={20}
                      className="text-[var(--muted)] group-hover:text-black transition-colors" />
                  </div>
                  <span className="font-display text-5xl text-[var(--g3)] group-hover:text-[var(--g2)] transition-colors leading-none">{s.num}</span>
                </div>
                <div className="font-semibold text-base tracking-wide mb-2">{s.title}</div>
                <div className="text-sm text-[var(--muted)] leading-relaxed font-light">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICE ─── */}
      <section id="price" className="py-24 bg-[var(--g)]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-[var(--y)]" />
                <span className="text-[var(--y)] text-[10px] font-bold tracking-widest uppercase">Актуальные цены</span>
              </div>
              <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-none">ПРАЙС-ЛИСТ</h2>
            </div>
            <p className="hidden md:block text-xs text-[var(--muted)] max-w-xs text-right font-light leading-relaxed">
              Оптовые цены — уточняйте у менеджера. Скидка от 10 листов.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-1">
            {[
              { id: 'osb', label: 'ОСБ плиты' },
              { id: 'fan', label: 'Фанера' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id as 'osb' | 'fan')}
                className={`px-6 py-3 text-xs font-bold tracking-widest uppercase border-b-2 transition-all ${
                  tab === t.id
                    ? 'border-[var(--y)] text-[var(--y)]'
                    : 'border-transparent text-[var(--muted)] hover:text-white'
                }`}>
                {t.label}
              </button>
            ))}
          </div>

          <div className="border border-[var(--g3)]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_auto_auto] bg-[var(--g2)] px-6 py-3 border-b border-[var(--g3)]">
              <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] font-bold">Наименование</div>
              <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] font-bold w-20 text-center">Ед.</div>
              <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] font-bold w-32 text-right">Цена ₽</div>
            </div>

            {rows.map((r, i) => (
              <div key={i} className="price-row grid grid-cols-[1fr_auto_auto] px-6 py-4 border-b border-[var(--g3)] last:border-0 items-center">
                <div className="text-sm font-medium">{r.name}</div>
                <div className="text-xs text-[var(--muted)] w-20 text-center">лист</div>
                <div className="w-32 text-right">
                  <span className="font-display text-xl text-[var(--y)]">{r.price.toLocaleString('ru')}</span>
                  <span className="text-[10px] text-[var(--muted)] line-through ml-2">{r.old}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA bar */}
          <div className="mt-6 border border-[var(--y)]/20 bg-[var(--b)] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
            <div>
              <div className="font-semibold text-sm mb-1">Нужен расчёт под проект?</div>
              <div className="text-xs text-[var(--muted)] font-light">Пришлите чертёж — рассчитаем бесплатно и подберём оптимальный вариант</div>
            </div>
            <a href="#contacts" className="btn-y flex-shrink-0 text-xs">
              <Icon name="Calculator" size={14} /> Получить расчёт
            </a>
          </div>
        </div>
      </section>

      {/* ─── COUNTERS ─── */}
      <section className="py-20 bg-[var(--b)] border-y border-[var(--g3)]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <Counter target={10} suffix="+" label="лет на рынке" />
            <Counter target={5000} suffix="+" label="клиентов" />
            <Counter target={100000} suffix="+" label="листов в месяц" />
            <Counter target={1} suffix=" день" label="доставка" />
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 bg-[var(--g)]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-[var(--y)]" />
                <span className="text-[var(--y)] text-[10px] font-bold tracking-widest uppercase">О компании</span>
              </div>
              <h2 className="font-display text-[clamp(40px,5vw,72px)] leading-none mb-8">
                ЛЕСПЛИТА — <br />
                <span className="text-[var(--y)]">НАШ СКЛАД,</span><br />
                ВАШИ СТРОЙКИ
              </h2>
              <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed font-light">
                <p>
                  Работаем с 2014 года. Специализируемся на поставках ОСБ-3 плит и берёзовой фанеры
                  для строительных компаний, производств и частных заказчиков.
                </p>
                <p>
                  На складе постоянно в наличии весь ассортимент от ведущих производителей.
                  Документы, сертификаты, безналичный расчёт — всё по-человечески.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-[var(--g3)]">
              {[
                { icon: 'Shield', label: 'Сертификаты на все партии' },
                { icon: 'Clock', label: 'Пн–Вс 8:00–20:00' },
                { icon: 'MapPin', label: 'Склад в Москве и МО' },
                { icon: 'CreditCard', label: 'Нал, безнал, карта' },
                { icon: 'FileText', label: 'Договоры с отсрочкой' },
                { icon: 'Headphones', label: 'Личный менеджер' },
              ].map((item, i) => (
                <div key={i} className="bg-[var(--b)] p-6 flex items-center gap-4 hover:bg-[var(--g2)] transition-colors group">
                  <Icon name={item.icon} fallback="Check" size={18} className="text-[var(--y)] flex-shrink-0" />
                  <span className="text-xs font-medium leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ─── */}
      <section id="portfolio" className="py-24 bg-[var(--b)]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[var(--y)]" />
              <span className="text-[var(--y)] text-[10px] font-bold tracking-widest uppercase">Реализованные поставки</span>
            </div>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-none">НАШИ РАБОТЫ</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--g3)]">
            {PORTFOLIO.map((p, i) => (
              <div key={i} className="bg-[var(--b)] p-7 hover:bg-[var(--g)] transition-colors group">
                <div className="inline-block bg-[var(--y)] text-black text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4">
                  {p.tag}
                </div>
                <h3 className="font-semibold text-sm mb-2 group-hover:text-[var(--y)] transition-colors">{p.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACTS ─── */}
      <section id="contacts" className="py-24 bg-[var(--g)]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-[var(--y)]" />
              <span className="text-[var(--y)] text-[10px] font-bold tracking-widest uppercase">Свяжитесь с нами</span>
            </div>
            <h2 className="font-display text-[clamp(40px,6vw,80px)] leading-none">КОНТАКТЫ</h2>
          </div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-10">
            {/* Info */}
            <div className="flex flex-col gap-px bg-[var(--g3)]">
              {[
                { icon: 'Phone', label: 'Телефон', val: '+7 (495) 777-15-65', href: 'tel:+74957771565' },
                { icon: 'Mail', label: 'Email', val: 'info@lesplita.ru', href: 'mailto:info@lesplita.ru' },
                { icon: 'MapPin', label: 'Адрес', val: 'Москва, ул. Складская, 15', href: '#' },
                { icon: 'Clock', label: 'Часы', val: 'Пн–Вс: 8:00–20:00', href: '#' },
              ].map((c, i) => (
                <a key={i} href={c.href}
                  className="bg-[var(--b)] p-5 flex items-start gap-4 hover:bg-[var(--g2)] transition-colors group">
                  <Icon name={c.icon} fallback="Phone" size={16} className="text-[var(--y)] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-0.5">{c.label}</div>
                    <div className="text-sm font-medium group-hover:text-[var(--y)] transition-colors">{c.val}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Callback form */}
            <div className="bg-[var(--b)] border border-[var(--g3)] p-8">
              <div className="font-display text-2xl tracking-wide mb-6">ЗАКАЗАТЬ ЗВОНОК</div>
              <form className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Имя</div>
                  <input className="inp" placeholder="Ваше имя" />
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Телефон</div>
                  <input className="inp" placeholder="+7 (___) ___-__-__" />
                </div>
                <div className="md:col-span-2">
                  <div className="text-[10px] tracking-widest uppercase text-[var(--muted)] mb-1">Комментарий</div>
                  <textarea className="inp resize-none" rows={4} placeholder="Что вас интересует?" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="btn-y">
                    <Icon name="Send" size={14} /> Отправить
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[var(--b)] border-t border-[var(--g3)] py-10">
        <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-display text-[var(--y)] text-2xl tracking-widest">ЛЕСПЛИТА</div>

          <div className="flex flex-wrap justify-center gap-6">
            {NAV.map(n => (
              <a key={n.href} href={n.href}
                className="text-[10px] tracking-widest uppercase text-[var(--muted)] hover:text-[var(--y)] transition-colors">
                {n.label}
              </a>
            ))}
          </div>

          <div className="text-[10px] text-[var(--muted)] tracking-wider">
            © 2024 Лесплита
          </div>
        </div>
      </footer>

      {/* ─── Mobile CTA ─── */}
      <a href="tel:+74957771565"
        className="fixed bottom-5 right-5 w-14 h-14 bg-[var(--y)] flex items-center justify-center md:hidden z-50 shadow-2xl"
        style={{ animation: 'pulseRing 2.5s infinite' }}>
        <Icon name="Phone" size={22} className="text-black" />
      </a>
    </div>
  );
}
