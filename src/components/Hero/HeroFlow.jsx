import React, { useState, useEffect } from 'react';
import { FiArrowUpRight, FiZap } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './HeroFlow.css';

/* ─── SVG Donut helper ─────────────────────────────────────── */
function DonutSegment({ cx, cy, r, pct, color, offset, total = 339.29 }) {
  const dash = (pct / 100) * total;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill="none"
      stroke={color}
      strokeWidth="18"
      strokeDasharray={`${dash} ${total}`}
      strokeDashoffset={-offset}
      strokeLinecap="butt"
    />
  );
}

const DONUT_SEGMENTS = [
  { pct: 30, color: '#7B68EE', label: 'Novos Usuários' },
  { pct: 22, color: '#26A5E4', label: 'Aumento Vendas' },
  { pct: 28, color: '#9B59B6', label: 'Usuários Ativos' },
  { pct: 20, color: '#FF6B48', label: 'Receita Mensal' },
];

const BAR_DATA = [
  { h: 35, cls: 'fc-bar-1' },
  { h: 55, cls: 'fc-bar-2' },
  { h: 72, cls: 'fc-bar-3' },
  { h: 45, cls: 'fc-bar-4' },
  { h: 80, cls: 'fc-bar-5' },
  { h: 60, cls: 'fc-bar-6' },
  { h: 40, cls: 'fc-bar-7' },
  { h: 65, cls: 'fc-bar-8' },
];

const AVATARS = [
  { bg: '#1C403B', letter: 'M' },
  { bg: '#2d5a53', letter: 'A' },
  { bg: '#3a7066', letter: 'R' },
];

function HeroFlow() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Compute donut offsets
  const CIRC = 339.29;
  let runningOffset = 0;
  const segments = DONUT_SEGMENTS.map((s) => {
    const seg = { ...s, offset: runningOffset };
    runningOffset += (s.pct / 100) * CIRC;
    return seg;
  });

  return (
    <section className="hero-section">
      {/* Background */}
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="hero-glow-2" />

      {/* Decorative floating elements */}
      <div className="hero-deco hero-deco--plane">✈️</div>
      <div className="hero-deco hero-deco--bell">🔔</div>

      {/* ── Content ── */}
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-icon">
            <FaWhatsapp size={14} />
          </span>
          Atendimento com IA para o seu negócio
        </div>

        {/* Headline */}
        <h1 className="hero-headline">
          Atenda mais, trabalhe<br />menos com o Lemify
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Centralize WhatsApp, Instagram e outros canais em um só lugar. O Lemi, seu agente de IA, atende clientes, organiza seu funil de vendas e agenda serviços automaticamente.
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <a
            href="https://app.lemify.com.br/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn-primary"
          >
            Começar grátis
            <span className="hero-btn-primary-arrow">
              <FiArrowUpRight size={15} />
            </span>
          </a>
          <a
            href="#showcase"
            className="hero-btn-outline"
          >
            Ver demonstração
            <span className="hero-btn-outline-arrow">
              <FiArrowUpRight size={14} />
            </span>
          </a>
        </div>

        {/* Social proof */}
        <div className="hero-social-proof">
          <div className="hero-avatars">
            {AVATARS.map((av, i) => (
              <div className="hero-avatar" key={i} style={{ background: av.bg }}>
                {av.letter}
              </div>
            ))}
          </div>
          <div className="hero-social-text">
            <strong>+500 empresas</strong>
            já automatizaram seu atendimento
          </div>
        </div>
      </div>

      {/* ── Visual row: card esq + preview + card dir ── */}
      <div className="hero-visual-row">
        {/* Card Esquerdo — Gráfico de Barras */}
        <div className="hero-side-card hero-side-card--left">
          <div className="fc-left-header">
            <div className="fc-left-status-row">
              <div className="fc-left-icon">
                <FiZap size={14} color="#d8fe6a" />
              </div>
              <span className="fc-left-label">Status</span>
            </div>
            <span className="fc-left-stats-label">
              Estatísticas ▾
            </span>
          </div>

          <div className="fc-left-big">1.847</div>
          <div className="fc-left-sub">conversas este mês</div>

          <div className="fc-bars-area">
            {BAR_DATA.map((b, i) => (
              <div
                key={i}
                className={`fc-bar ${b.cls}`}
                style={{ height: `${b.h}%`, animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
          <div className="fc-bar-axis">
            <span>0</span>
            <span>500</span>
            <span>1000</span>
          </div>
          <div className="fc-left-badge">🟢 Alto</div>
        </div>

        {/* Preview central */}
        <div className="hero-center-preview">
          <img
            src="/tela-chat.svg"
            alt="Plataforma Lemify de atendimento"
            className="hero-preview-img"
          />
        </div>

        {/* Card Direito — Donut */}
        <div className="hero-side-card hero-side-card--right">
          <div className="fc-right-title">Visão Geral</div>

          <div className="fc-donut-wrapper">
            <svg className="fc-donut-svg" viewBox="0 0 120 120">
              {segments.map((s, i) => (
                <DonutSegment
                  key={i}
                  cx={60}
                  cy={60}
                  r={54}
                  pct={s.pct}
                  color={s.color}
                  offset={s.offset}
                />
              ))}
            </svg>
            <div className="fc-donut-center">
              <span className="fc-donut-number">6.530</span>
              <span className="fc-donut-sub">/ 10K meta</span>
            </div>
          </div>

          <div className="fc-donut-legend">
            {segments.map((s, i) => (
              <div className="fc-legend-item" key={i}>
                <span className="fc-legend-dot" style={{ background: s.color }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroFlow;
